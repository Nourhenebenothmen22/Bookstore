const Book = require('../models/Book');
const Category = require('../models/Category');

module.exports = {
  /**
   * Publish (create) a new book
   */
  publishBook: async (req, res) => {
    try {
      const { title, author, description, price, stock, isFeatured, isOnSale, discountPercent, coverImage, category } = req.body;

      if (!title || !author || !price || !stock) {
        return res.status(400).json({ message: "Title, author, price, and stock are required." });
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
        coverImage,
        category
      });

      const savedBook = await newBook.save();

      // 🔥 Push the book into the category's books array
      if (category) {
        await Category.findByIdAndUpdate(category, {
          $push: {books: savedBook._id }
        });
      }

      return res.status(201).json({ message: "Book published successfully", data: savedBook });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  /**
   * Fetch all books
   */
  fetchBooks: async (req, res) => {
    try {
      const books = await Book.find().populate("category", "name description");
      return res.status(200).json({ success: true, data: books });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  /**
   * Fetch book details by ID
   */
  fetchBookDetails: async (req, res) => {
    const id = req.params.id;
    try {
      const book = await Book.findById(id).populate("category", "name description");
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).json({ success: true, data: book });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  /**
   * Edit (update) book by ID
   */
  editBook: async (req, res) => {
    const id = req.params.id;
    try {
      const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!updatedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).json({ message: "Book updated successfully", data: updatedBook });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  /**
   * Remove book by ID
   */
  removeBook: async (req, res) => {
    const id = req.params.id;
    try {
      const existBook = await Book.findById(id);
      if (!existBook) {
        return res.status(404).json({ message: "Book not found" });
      }

      await Book.findByIdAndDelete(id);

      // 🔥 Pull the book from the category's books array
      if (existBook.category) {
        await Category.findByIdAndUpdate(existBook.category, {
          $pull: { books: existBook._id }
        });
      }

      return res.status(200).json({ message: "Book removed successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  }
};
