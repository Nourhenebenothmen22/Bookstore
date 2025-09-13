const User = require("../models/User");
const bcrypt = require("bcrypt"); // For password hashing

module.exports = {
  createUserAccount: async (req, res) => {
    const { email, password,name,role} = req.body;

    // Check if email and password are provided
    if (!email || !password || !name || !role) {
  return res.status(400).json({
    message: "Name, email, password and role are required."
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
  role
});


    // Save user to database
    await newUser.save();

    // Return success response
    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        role:newUser.role
      },
    });
  },

  loginUser: async (req, res) => {},
};
