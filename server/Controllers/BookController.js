const Book=require('../models/Book')
module.exports={
    publishBook:async(req,res)=>{
        try {
            
            
        } catch (error) {
            
        }

    },
    fetchBooks:async(req,res)=>{

    },
    editBook:async(req,res)=>{

    },
    fetchBookDetails:async(req,res)=>{

    },
  removeBook: async (req, res) => {
    const id = req.params.id;

    try {
      // Check if the book exists
      const existBook = await Book.findById(id);
      if (!existBook) {
        return res.status(404).json({ message: "Book not found" });
      }

      // Delete the book from the database
      await Book.findByIdAndDelete(id);

      // Return success response
      return res.status(200).json({ message: "Book removed successfully" });
    } catch (error) {
      // Handle unexpected errors
      console.error(error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  }
};