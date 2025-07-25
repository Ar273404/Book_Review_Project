import express from "express";
import { body } from "express-validator";
import {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  getGenres,
} from "../controllers/bookController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Validation rules
const bookValidation = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage("Title is required and must be less than 200 characters"),
  body("author")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Author is required and must be less than 100 characters"),
  body("genre")
    .isIn([
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
    ])
    .withMessage("Please select a valid genre"),
  body("description")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Description must be less than 1000 characters"),
  body("publishedYear")
    .optional()
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage("Please provide a valid published year"),
];

// Routes
router.get("/genres", getGenres);
router.get("/", getBooks);
router.get("/:id", getBook);
router.post("/", protect, bookValidation, createBook);
router.put("/:id", protect, updateBook);
router.delete("/:id", protect, deleteBook);

export default router;
