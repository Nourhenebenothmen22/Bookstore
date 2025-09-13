const User = require("../models/User");
const bcrypt = require("bcrypt"); // For password hashing
const jwt = require("jsonwebtoken"); // For JWT generation

module.exports = {
  createUserAccount: async (req, res) => {
    try {
      const { email, password, name, role } = req.body;

      // Check if all required fields are provided
      if (!email || !password || !name || !role) {
        return res.status(400).json({
          message: "Name, email, password and role are required.",
        });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          message: "User with this email already exists.",
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user instance
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
      });

      // Save user to database
      await newUser.save();

      // Generate JWT token
      const token = jwt.sign(
        { email: newUser.email, id: newUser._id, role: newUser.role },
        process.env.SECRET_KEY,
        { expiresIn: "7d" } // Token expires in 1 week
      );

      // Return success response with token
      return res.status(201).json({
        message: "User created successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
        token, // Return JWT token
      });

    } catch (error) {
      // Handle unexpected errors
      console.error(error);
      return res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  },


 loginUser: async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate that both email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // Find the user in the database by email
    const existingUser = await User.findOne({ email });

    // If no user is found, return 404 Not Found
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, existingUser.password);

    // If the password does not match, return 401 Unauthorized
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email, role: existingUser.role },
      process.env.SECRET_KEY,
      { expiresIn: "7d" } // Token expires in 7 days
    );

    // If authentication is successful, return 200 OK with token
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
      token, // Include JWT token in response
    });

  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
},
fetchUserDetails: async (req, res) => {
  const id = req.params.id; // Get user ID from route parameters

  try {
    // Find user by ID
    const user = await User.findById(id);

    // If user not found, return 404
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user details (excluding password)
    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}
}