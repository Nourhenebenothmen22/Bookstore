const Book = require('../models/Book');
const Category = require('../models/Category');


module.exports = {
  /**
   * Publish (create) a new book
   */
  publishBook: async (req, res) => {
    try {
      if (req.file){
    req.body.coverImage=req.file.filename
   }
      const { title, author, description, price, stock, isFeatured, isOnSale, discountPercent, category } = req.body;

      if (!title || !author || !price || !stock || !category) {
        return res.status(400).json({ 
          success: false,
          message: "Title, author, price, stock, and category are required." 
        });
      }

      // Check if category exists
      const existingCategory = await Category.findById(category);
      if (!existingCategory) {
        return res.status(400).json({ 
          success: false,
          message: "Specified category does not exist." 
        });
      }

      const newBook = new Book({
        title,
        author,
        description,
        price,
        stock,
        isFeatured,
        isOnSale,
        discountPercent,
        coverImage: req.file ? req.file.filename : null,
        category
      });

      const savedBook = await newBook.save();

      // Push the book to the category's books array
      await Category.findByIdAndUpdate(category, { $push: { books: savedBook._id } });

      return res.status(201).json({ 
        success: true,
        message: "Book published successfully", 
        data: savedBook 
      });
    } catch (error) {
      console.error("Error publishing book:", error);
      return res.status(500).json({ 
        success: false,
        message: "Server error", 
        error: error.message 
      });
    }
  },

  /**
   * Fetch all books
   */
  fetchBooks: async (req, res) => {
    try {
      const books = await Book.find().populate("category", "name");
      return res.status(200).json({ success: true, data: books });
    } catch (error) {
      console.error("Error fetching books:", error);
      return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  },

  /**
   * Fetch book details by ID
   */
  fetchBookDetails: async (req, res) => {
    const id = req.params.id;
    try {
      const book = await Book.findById(id).populate("category", "name");
      if (!book) return res.status(404).json({ success: false, message: "Book not found" });
      return res.status(200).json({ success: true, data: book });
    } catch (error) {
      console.error("Error fetching book details:", error);
      return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  },

  /**
   * Edit (update) book by ID
   */
  editBook: async (req, res) => {
   
    try {
       if(req.file)
            {req.body.coverImage=req.file.filename};
    const id = req.params.id;
      const existingBook = await Book.findById(id);
      if (!existingBook) return res.status(404).json({ success: false, message: "Book not found" });

      const updateData = { ...req.body };

      // Handle category change
      if (req.body.category && req.body.category !== existingBook.category.toString()) {
        await Category.findByIdAndUpdate(existingBook.category, { $pull: { books: existingBook._id } });
        await Category.findByIdAndUpdate(req.body.category, { $push: { books: existingBook._id } });
      }

      const updatedBook = await Book.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).populate("category", "name");

      return res.status(200).json({ success: true, message: "Book updated successfully", data: updatedBook });
    } catch (error) {
      console.error("Error updating book:", error);
      return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  },

  /**
   * Remove book by ID
   */
  removeBook: async (req, res) => {
    const id = req.params.id;
    try {
      const existBook = await Book.findById(id);
      if (!existBook) return res.status(404).json({ success: false, message: "Book not found" });

      await Book.findByIdAndDelete(id);

      // Remove book from category's books array
      if (existBook.category) {
        await Category.findByIdAndUpdate(existBook.category, { $pull: { books: existBook._id } });
      }

      return res.status(200).json({ success: true, message: "Book removed successfully" });
    } catch (error) {
      console.error("Error removing book:", error);
      return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  },

  /**
   * Get books on sale
   */
  getBooksOnSale: async (req, res) => {
    try {
      const books = await Book.find({ isOnSale: true }).populate("category", "name");
      return res.status(200).json({ success: true, data: books });
    } catch (error) {
      console.error("Error fetching books on sale:", error);
      return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  }
};
