const Category = require('../models/Category');

module.exports = {
  /**
   * @desc    Add a new category
   * @route   POST /categories
   * @access  Public/Admin
   * @body    { name: String }
   */
  addNewCategory: async (req, res) => {
    try {
      const { name } = req.body;
      
      // Check if the category already exists
      const existingCategory = await Category.findOne({ name: name.trim() });
      if (existingCategory) {
        return res.status(400).json({ 
          success: false, 
          message: "This category already exists" 
        });
      }
      
      // Create the new category
      const newCategory = new Category({ name });
      await newCategory.save();
      
      res.status(201).json({ 
        success: true, 
        message: "Category created successfully", 
        data: newCategory 
      });
    } catch (error) {
      console.error("Error adding category:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error", 
        error: error.message 
      });
    }
  },

  /**
   * @desc    Fetch all categories
   * @route   GET /categories
   * @access  Public
   */
  fetchCategories: async (req, res) => {
    try {
      // Retrieve all categories and populate books
      const categories = await Category.find().populate('books');
      res.status(200).json({ 
        success: true, 
        data: categories 
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error", 
        error: error.message 
      });
    }
  },

  /**
   * @desc    Get category details by ID
   * @route   GET /categories/:id
   * @access  Public
   */
  getCategoryDetails: async (req, res) => {
    const id = req.params.id;
    try {
      // Find category by ID and populate books
      const existCategory = await Category.findById(id).populate('books');
      if (!existCategory) {
        return res.status(404).json({ 
          success: false,
          message: "Category not found" 
        });
      }
      res.status(200).json({ 
        success: true,
        message: "Category retrieved successfully", 
        data: existCategory 
      });
    } catch (error) {
      console.error("Error fetching category details:", error);
      res.status(500).json({ 
        success: false,
        message: "Internal server error", 
        error: error.message 
      });
    }
  },
   
   /**
   * @desc    Edit an existing category
   * @route   PUT /categories/:id
   * @access  Admin
   * @body    { name: String }
   */
  
  // Edit an existing category
  editCategory: async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    
    try {
      // Check if the category exists
      const existingCategory = await Category.findById(id);
      if (!existingCategory) {
        return res.status(404).json({ 
          success: false,
          message: "Category not found" 
        });
      }
      
      
      // Update the category
      const updatedCategory = await Category.findByIdAndUpdate(
        id, 
        { name }, 
        { new: true, runValidators: true }
      );
      
      res.status(200).json({ 
        success: true,
        message: "Category updated successfully", 
        data: updatedCategory 
      });
    } catch (error) {
      console.error("Error updating category:", error);
      res.status(500).json({ 
        success: false,
        message: "Internal server error", 
        error: error.message 
      });
    }
  },

  /**
   * @desc    Delete a category
   * @route   DELETE /categories/:id
   * @access  Admin
   */
  deleteCategory: async (req, res) => {
    const id = req.params.id;
    
    try {
      // Check if the category exists
      const existingCategory = await Category.findById(id);
      if (!existingCategory) {
        return res.status(404).json({ 
          success: false,
          message: "Category not found" 
        });
      }
      
      // Delete the category
      await Category.findByIdAndDelete(id);
      
      res.status(200).json({ 
        success: true,
        message: "Category deleted successfully" 
      });
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ 
        success: false,
        message: "Internal server error", 
        error: error.message 
      });
    }
  }
};
