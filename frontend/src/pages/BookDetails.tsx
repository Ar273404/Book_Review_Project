// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ArrowLeft,
//   Calendar,
//   User,
//   BookOpen,
//   MessageCircle,
//   Edit,
//   Trash2,
//   Plus,
//   Send,
// } from "lucide-react";
// import { bookService, Book } from "../services/bookService";
// import { reviewService, Review } from "../services/reviewService";
// import { useAuth } from "../contexts/AuthContext";
// import StarRating from "../components/StarRating";
// import LoadingSpinner from "../components/LoadingSpinner";
// import toast from "react-hot-toast";

// const BookDetail: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const [book, setBook] = useState<Book | null>(null);
//   const [reviews, setReviews] = useState<Review[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [reviewsLoading, setReviewsLoading] = useState(false);
//   const [showReviewForm, setShowReviewForm] = useState(false);
//   const [reviewForm, setReviewForm] = useState({
//     rating: 5,
//     reviewText: "",
//   });
//   const [reviewErrors, setReviewErrors] = useState<{ [key: string]: string }>(
//     {}
//   );
//   const [submittingReview, setSubmittingReview] = useState(false);

//   useEffect(() => {
//     if (id) {
//       fetchBook();
//       fetchReviews();
//     }
//   }, [id]);

//   const fetchBook = async () => {
//     try {
//       const response = await bookService.getBook(id!);
//       setBook(response.data);
//       console.log(book);
//       console.log(book);
//       console.log(book);
//     } catch (error) {
//       console.error("Error fetching book:", error);
//       toast.error("Book not found");
//       navigate("/books");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchReviews = async () => {
//     setReviewsLoading(true);
//     try {
//       const response = await reviewService.getBookReviews(id!);
//       setReviews(response.data);
//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//     } finally {
//       setReviewsLoading(false);
//     }
//   };

//   const validateReviewForm = () => {
//     const errors: { [key: string]: string } = {};

//     if (!reviewForm.reviewText.trim()) {
//       errors.reviewText = "Review text is required";
//     } else if (reviewForm.reviewText.length < 10) {
//       errors.reviewText = "Review must be at least 10 characters";
//     } else if (reviewForm.reviewText.length > 1000) {
//       errors.reviewText = "Review must be less than 1000 characters";
//     }

//     if (reviewForm.rating < 1 || reviewForm.rating > 5) {
//       errors.rating = "Rating must be between 1 and 5";
//     }

//     setReviewErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmitReview = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateReviewForm()) return;

//     setSubmittingReview(true);
//     try {
//       await reviewService.createReview({
//         book: id!,
//         rating: reviewForm.rating,
//         reviewText: reviewForm.reviewText,
//       });

//       toast.success("Review added successfully!");
//       setShowReviewForm(false);
//       setReviewForm({ rating: 5, reviewText: "" });
//       fetchBook(); // Refresh book data to update average rating
//       fetchReviews(); // Refresh reviews
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "Failed to add review");
//     } finally {
//       setSubmittingReview(false);
//     }
//   };

//   const handleDeleteBook = async () => {
//     if (!window.confirm("Are you sure you want to delete this book?")) return;

//     try {
//       await bookService.deleteBook(id!);
//       toast.success("Book deleted successfully");
//       navigate("/books");
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "Failed to delete book");
//     }
//   };
                   

//   const canEditBook = user && book && (user.id === book.addedBy._id || user.role === "admin");
//   // console.log(canEditBook);
//   const hasUserReviewed =
//     user && reviews.some((review) => review.reviewer._id === user.id);

//   if (loading) {
//     return <LoadingSpinner text="Loading book details..." />;
//   }

//   if (!book) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">
//             Book not found
//           </h2>
//           <button
//             onClick={() => navigate("/books")}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//             Back to Books
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Back Button */}
//         <motion.button
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           onClick={() => navigate("/books")}
//           className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors mb-6">
//           <ArrowLeft className="h-4 w-4" />
//           <span>Back to Books</span>
//         </motion.button>

//         {/* Book Details */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
//           <div className="md:flex">
//             {/* Book Cover */}
//             <div className="md:w-1/3 lg:w-1/4">
//               <img
//                 src={book.coverImage}
//                 alt={book.title}
//                 className="w-full h-64 md:h-full object-cover"
//               />
//             </div>
//             {/* Book Info */}
//             <div className="md:w-2/3 lg:w-3/4 p-8">
//               <div className="flex justify-between items-start mb-4">
//                 <div className="flex-1">
//                   <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
//                     {book.title}
//                   </h1>
//                   <div className="flex items-center space-x-2 text-lg text-gray-600 mb-4">
//                     <User className="h-5 w-5" />
//                     <span className="font-medium">{book.author}</span>
//                   </div>
//                 </div>
//                 {canEditBook && (
//                   <div className="flex items-center space-x-2 ml-4">
//                     <button
//                       onClick={() => navigate(`/books/${book._id}/edit`)}
//                       className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                       title="Edit Book">
//                       <Edit className="h-4 w-4" />
//                     </button>
//                     <button
//                       onClick={handleDeleteBook}
//                       className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                       title="Delete Book">
//                       <Trash2 className="h-4 w-4" />
//                     </button>
//                   </div>
//                 )}
//               </div>
//               {/* Rating */}
//               {book.averageRating > 0 && (
//                 <div className="flex items-center space-x-3 mb-4">
//                   <StarRating rating={book.averageRating} size="lg" showValue />
//                   <span className="text-gray-600">
//                     ({book.totalReviews}{" "}
//                     {book.totalReviews === 1 ? "review" : "reviews"})
//                   </span>
//                 </div>
//               )}
//               {/* Genre and Details */}
//               <div className="flex flex-wrap gap-4 mb-6">
//                 <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
//                   {book.genre}
//                 </span>
//                 {book.publishedYear && (
//                   <div className="flex items-center space-x-1 text-sm text-gray-600">
//                     <Calendar className="h-4 w-4" />
//                     <span>{book.publishedYear}</span>
//                   </div>
//                 )}
//                 {book.isbn && (
//                   <div className="flex items-center space-x-1 text-sm text-gray-600">
//                     <BookOpen className="h-4 w-4" />
//                     <span>ISBN: {book.isbn}</span>
//                   </div>
//                 )}
//               </div>

//               {/* Description */}
//               {book.description && (
//                 <div className="mb-6">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                     Description
//                   </h3>
//                   <p className="text-gray-700 leading-relaxed">
//                     {book.description}
//                   </p>
//                 </div>
//               )}

//               {/* Added By */}
//               <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
//                 <img
//                   src={book.addedBy.avatar}
//                   alt={book.addedBy.name}
//                   className="h-8 w-8 rounded-full object-cover"
//                 />
//                 <div>
//                   <p className="text-sm text-gray-600">Added by</p>
//                   <p className="font-medium text-gray-900">
//                     {book.addedBy.name}
//                   </p>
//                 </div>
//                 <div className="ml-auto text-sm text-gray-500">
//                   {new Date(book.createdAt).toLocaleDateString()}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Reviews Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="bg-white rounded-xl shadow-lg p-8">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
//               <MessageCircle className="h-6 w-6" />
//               <span>Reviews ({reviews.length})</span>
//             </h2>

//             {user && !hasUserReviewed && (
//               <button
//                 onClick={() => setShowReviewForm(!showReviewForm)}
//                 className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//                 <Plus className="h-4 w-4" />
//                 <span>Write Review</span>
//               </button>
//             )}
//           </div>

//           {/* Review Form */}
//           <AnimatePresence>
//             {showReviewForm && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="mb-8 p-6 bg-gray-50 rounded-lg">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                   Write Your Review
//                 </h3>
//                 <form onSubmit={handleSubmitReview} className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Rating
//                     </label>
//                     <StarRating
//                       rating={reviewForm.rating}
//                       interactive
//                       onRatingChange={(rating) =>
//                         setReviewForm((prev) => ({ ...prev, rating }))
//                       }
//                       size="lg"
//                     />
//                     {reviewErrors.rating && (
//                       <p className="mt-1 text-sm text-red-600">
//                         {reviewErrors.rating}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="reviewText"
//                       className="block text-sm font-medium text-gray-700 mb-2">
//                       Your Review
//                     </label>
//                     <textarea
//                       id="reviewText"
//                       rows={4}
//                       value={reviewForm.reviewText}
//                       onChange={(e) => {
//                         setReviewForm((prev) => ({
//                           ...prev,
//                           reviewText: e.target.value,
//                         }));
//                         if (reviewErrors.reviewText) {
//                           setReviewErrors((prev) => ({
//                             ...prev,
//                             reviewText: "",
//                           }));
//                         }
//                       }}
//                       className={`block w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
//                         reviewErrors.reviewText
//                           ? "border-red-300 bg-red-50"
//                           : "border-gray-300 hover:border-gray-400"
//                       }`}
//                       placeholder="Share your thoughts about this book..."
//                     />
//                     {reviewErrors.reviewText && (
//                       <p className="mt-1 text-sm text-red-600">
//                         {reviewErrors.reviewText}
//                       </p>
//                     )}
//                     <p className="mt-1 text-sm text-gray-500">
//                       {reviewForm.reviewText.length}/1000 characters
//                     </p>
//                   </div>

//                   <div className="flex items-center space-x-3">
//                     <button
//                       type="submit"
//                       disabled={submittingReview}
//                       className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
//                       {submittingReview ? (
//                         <>
//                           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                           <span>Submitting...</span>
//                         </>
//                       ) : (
//                         <>
//                           <Send className="h-4 w-4" />
//                           <span>Submit Review</span>
//                         </>
//                       )}
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setShowReviewForm(false)}
//                       className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Reviews List */}
//           {reviewsLoading ? (
//             <LoadingSpinner text="Loading reviews..." />
//           ) : reviews.length === 0 ? (
//             <div className="text-center py-8">
//               <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">
//                 No reviews yet
//               </h3>
//               <p className="text-gray-600">
//                 {user
//                   ? "Be the first to write a review!"
//                   : "Sign in to write the first review!"}
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {reviews.map((review, index) => (
//                 <motion.div
//                   key={review._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   className="border-b border-gray-200 pb-6 last:border-b-0">
//                   <div className="flex items-start space-x-4">
//                     <img
//                       src={review.reviewer.avatar}
//                       alt={review.reviewer.name}
//                       className="h-10 w-10 rounded-full object-cover"
//                     />
//                     <div className="flex-1">
//                       <div className="flex items-center justify-between mb-2">
//                         <div>
//                           <h4 className="font-medium text-gray-900">
//                             {review.reviewer.name}
//                           </h4>
//                           <div className="flex items-center space-x-2 mt-1">
//                             <StarRating rating={review.rating} size="sm" />
//                             <span className="text-sm text-gray-500">
//                               {new Date(review.createdAt).toLocaleDateString()}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                       <p className="text-gray-700 leading-relaxed">
//                         {review.reviewText}
//                       </p>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default BookDetail;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  User,
  BookOpen,
  MessageCircle,
  Edit,
  Trash2,
  Plus,
  Send,
} from "lucide-react";
import { bookService, Book } from "../services/bookService";
import { reviewService, Review } from "../services/reviewService";
import { useAuth } from "../contexts/AuthContext";
import StarRating from "../components/StarRating";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    reviewText: "",
  });
  const [reviewErrors, setReviewErrors] = useState<{ [key: string]: string }>(
    {}
  );
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    if (id) {
      fetchBook();
      fetchReviews();
    }
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await bookService.getBook(id!);
      setBook(response.data);
    } catch (error) {
      console.error("Error fetching book:", error);
      toast.error("Book not found");
      navigate("/books");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    setReviewsLoading(true);
    try {
      const response = await reviewService.getBookReviews(id!);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setReviewsLoading(false);
    }
  };

  const validateReviewForm = () => {
    const errors: { [key: string]: string } = {};

    if (!reviewForm.reviewText.trim()) {
      errors.reviewText = "Review text is required";
    } else if (reviewForm.reviewText.length < 10) {
      errors.reviewText = "Review must be at least 10 characters";
    } else if (reviewForm.reviewText.length > 1000) {
      errors.reviewText = "Review must be less than 1000 characters";
    }

    if (reviewForm.rating < 1 || reviewForm.rating > 5) {
      errors.rating = "Rating must be between 1 and 5";
    }

    setReviewErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateReviewForm()) return;

    setSubmittingReview(true);
    try {
      await reviewService.createReview({
        book: id!,
        rating: reviewForm.rating,
        reviewText: reviewForm.reviewText,
      });

      toast.success("Review added successfully!");
      setShowReviewForm(false);
      setReviewForm({ rating: 5, reviewText: "" });
      fetchBook(); // Refresh book data to update average rating
      fetchReviews(); // Refresh reviews
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add review");
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleDeleteBook = async () => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await bookService.deleteBook(id!);
      toast.success("Book deleted successfully");
      navigate("/books");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete book");
    }
  };

  const canEditBook =
    user && book && (user.id === book.addedBy._id || user.role === "admin");
  const hasUserReviewed =
    user && reviews.some((review) => review.reviewer._id === user.id);

  if (loading) {
    return <LoadingSpinner text="Loading book details..." />;
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Book not found
          </h2>
          <button
            onClick={() => navigate("/books")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Back to Books
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/books")}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Books</span>
        </motion.button>

        {/* Book Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            {/* Book Cover */}
            <div className="md:w-1/3 lg:w-1/4">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-64 md:h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop";
                }}
              />
            </div>

            {/* Book Info */}
            <div className="md:w-2/3 lg:w-3/4 p-8">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {book.title}
                  </h1>
                  <div className="flex items-center space-x-2 text-lg text-gray-600 mb-4">
                    <User className="h-5 w-5" />
                    <span className="font-medium">{book.author}</span>
                  </div>
                </div>

                {canEditBook && (
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => navigate(`/books/${book._id}/edit`)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Book">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleDeleteBook}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Book">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Rating */}
              {book.averageRating > 0 && (
                <div className="flex items-center space-x-3 mb-4">
                  <StarRating rating={book.averageRating} size="lg" showValue />
                  <span className="text-gray-600">
                    ({book.totalReviews}{" "}
                    {book.totalReviews === 1 ? "review" : "reviews"})
                  </span>
                </div>
              )}

              {/* Genre and Details */}
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {book.genre}
                </span>
                {book.publishedYear && (
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{book.publishedYear}</span>
                  </div>
                )}
                {book.isbn && (
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <BookOpen className="h-4 w-4" />
                    <span>ISBN: {book.isbn}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              {book.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {book.description}
                  </p>
                </div>
              )}

              {/* Added By */}
              <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                <img
                  src={book.addedBy.avatar}
                  alt={book.addedBy.name}
                  className="h-8 w-8 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face";
                  }}
                />
                <div>
                  <p className="text-sm text-gray-600">Added by</p>
                  <p className="font-medium text-gray-900">
                    {book.addedBy.name}
                  </p>
                  {/* {book.addedBy.role === "admin" && (
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                      Admin
                    </span>
                  )} */}
                </div>
                <div className="ml-auto text-sm text-gray-500">
                  {new Date(book.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <MessageCircle className="h-6 w-6" />
              <span>Reviews ({reviews.length})</span>
            </h2>

            {user && !hasUserReviewed && (
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="h-4 w-4" />
                <span>Write Review</span>
              </button>
            )}
          </div>

          {/* Review Form */}
          <AnimatePresence>
            {showReviewForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Write Your Review
                </h3>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating
                    </label>
                    <StarRating
                      rating={reviewForm.rating}
                      interactive
                      onRatingChange={(rating) =>
                        setReviewForm((prev) => ({ ...prev, rating }))
                      }
                      size="lg"
                    />
                    {reviewErrors.rating && (
                      <p className="mt-1 text-sm text-red-600">
                        {reviewErrors.rating}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="reviewText"
                      className="block text-sm font-medium text-gray-700 mb-2">
                      Your Review
                    </label>
                    <textarea
                      id="reviewText"
                      rows={4}
                      value={reviewForm.reviewText}
                      onChange={(e) => {
                        setReviewForm((prev) => ({
                          ...prev,
                          reviewText: e.target.value,
                        }));
                        if (reviewErrors.reviewText) {
                          setReviewErrors((prev) => ({
                            ...prev,
                            reviewText: "",
                          }));
                        }
                      }}
                      className={`block w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                        reviewErrors.reviewText
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      placeholder="Share your thoughts about this book..."
                    />
                    {reviewErrors.reviewText && (
                      <p className="mt-1 text-sm text-red-600">
                        {reviewErrors.reviewText}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-gray-500">
                      {reviewForm.reviewText.length}/1000 characters
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      type="submit"
                      disabled={submittingReview}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                      {submittingReview ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Submit Review</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reviews List */}
          {reviewsLoading ? (
            <LoadingSpinner text="Loading reviews..." />
          ) : reviews.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No reviews yet
              </h3>
              <p className="text-gray-600">
                {user
                  ? "Be the first to write a review!"
                  : "Sign in to write the first review!"}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start space-x-4">
                    <img
                      src={review.reviewer.avatar}
                      alt={review.reviewer.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {review.reviewer.name}
                          </h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <StarRating rating={review.rating} size="sm" />
                            <span className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {review.reviewText}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BookDetail;