import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
      maxlength: [100, "Author name cannot exceed 100 characters"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      trim: true,
      enum: [
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
      ],
    },
    description: {
      type: String,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    isbn: {
      type: String,
      unique: true,
      sparse: true,
      match: [/^(?:\d{9}[\dX]|\d{13})$/, "Please enter a valid ISBN"],
    },
    publishedYear: {
      type: Number,
      min: [1000, "Published year must be valid"],
      max: [new Date().getFullYear(), "Published year cannot be in the future"],
    },
    coverImage: {
      type: String,
      default:
        "https://thumbs.dreamstime.com/b/ai-generated-illustration-book-neon-brain-ai-generated-illustration-book-neon-brain-268373298.jpg",
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search functionality
bookSchema.index({ title: "text", author: "text", genre: "text" });
bookSchema.index({ genre: 1 });
bookSchema.index({ author: 1 });
bookSchema.index({ averageRating: -1 });
bookSchema.index({ createdAt: -1 });

export default mongoose.model("Book", bookSchema);
