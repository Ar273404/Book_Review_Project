import { validationResult } from "express-validator";
import Book from "../models/Book.js";
import Review from "../models/Review.js";

// @desc    Get all books with filters and pagination
// @route   GET /api/books
// @access  Public
export const getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Build filter object
    let filter = { isActive: true };

    if (req.query.genre && req.query.genre !== "all") {
      filter.genre = req.query.genre;
    }

    if (req.query.author) {
      filter.author = { $regex: req.query.author, $options: "i" };
    }

    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: "i" } },
        { author: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
      ];
    }

    // Build sort object
    let sort = {};
    switch (req.query.sortBy) {
      case "rating":
        sort = { averageRating: -1 };
        break;
      case "newest":
        sort = { createdAt: -1 };
        break;
      case "oldest":
        sort = { createdAt: 1 };
        break;
      case "title":
        sort = { title: 1 };
        break;
      default:
        sort = { createdAt: -1 };
    }

    // Execute query
    const books = await Book.find(filter)
      .populate("addedBy", "name avatar")
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Book.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: books,
      pagination: {
        currentPage: page,
        totalPages,
        totalBooks: total,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Get books error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching books",
    });
  }
};

// @desc    Get single book
// @route   GET /api/books/:id
// @access  Public
export const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      "addedBy",
      "name avatar"
    );

    if (!book || !book.isActive) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.error("Get book error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching book",
    });
  }
};

// @desc    Create new book
// @route   POST /api/books
// @access  Private
export const createBook = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const bookData = {
      ...req.body,
      addedBy: req.user.id,
    };

    const book = await Book.create(bookData);
    await book.populate("addedBy", "name avatar");

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    console.error("Create book error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating book",
    });
  }
};

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check if user owns the book or is admin
    if (book.addedBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this book",
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("addedBy", "name avatar");

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    console.error("Update book error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating book",
    });
  }
};

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Private
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check if user owns the book or is admin
    if (book.addedBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this book",
      });
    }

    // Soft delete - set isActive to false
    await Book.findByIdAndUpdate(req.params.id, { isActive: false });

    // Also deactivate all reviews for this book
    await Review.updateMany({ book: req.params.id }, { isActive: false });

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("Delete book error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting book",
    });
  }
};

// @desc    Get book genres
// @route   GET /api/books/genres
// @access  Public
export const getGenres = async (req, res) => {
  try {
    const genres = [
      "Fiction",
      "Non-Fiction",
      "Mystery",
      "Romance",
      "Science Fiction",
      "Fantasy",
      "Biography",
      "History",
      "Self-Help",
      "Business",
      "Technology",
      "Health",
      "Travel",
      "Cooking",
      "Art",
      "Other",
    ];

    res.status(200).json({
      success: true,
      data: genres,
    });
  } catch (error) {
    console.error("Get genres error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching genres",
    });
  }
};
