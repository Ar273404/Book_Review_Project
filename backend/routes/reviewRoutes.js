import express from "express";
import { body } from "express-validator";
import {
  getBookReviews,
  createReview,
  updateReview,
  deleteReview,
  getMyReviews,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Validation rules
const reviewValidation = [
  body("book").isMongoId().withMessage("Please provide a valid book ID"),
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
  body("reviewText")
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Review text must be between 10 and 1000 characters"),
];

const updateReviewValidation = [
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
  body("reviewText")
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Review text must be between 10 and 1000 characters"),
];

// Routes
router.get("/book/:bookId", getBookReviews);
router.get("/my-reviews", protect, getMyReviews);
router.post("/", protect, reviewValidation, createReview);
router.put("/:id", protect, updateReviewValidation, updateReview);
router.delete("/:id", protect, deleteReview);

export default router;
