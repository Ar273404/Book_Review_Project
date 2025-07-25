// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Calendar, User, MessageCircle } from "lucide-react";
// import { Book } from "../services/bookService";
// import StarRating from "./StarRating";

// interface BookCardProps {
//   book: Book;
//   index?: number;
// }

// const BookCard: React.FC<BookCardProps> = ({ book, index = 0 }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: index * 0.1 }}
//       whileHover={{ y: -5 }}
//       className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
//       <Link to={`/books/${book._id}`} className="block">
//         <div className="relative overflow-hidden">
//           {/* <img
//             src={book.coverImage}
//             alt={book.title}
//             className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
//           /> */}
//           {/* {book.coverImage}
//           {book.coverImage}
//           {book.coverImage} */}

//           <img
//             src={
//               book.coverImage ||
//               "https://via.placeholder.com/300x400.png?text=No+Image"
//             }
//             alt={book.title}
//             className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
//             onError={(e) => {
//               const target = e.target as HTMLImageElement;
//               target.src =
//                 "https://via.placeholder.com/300x400.png?text=No+Image";
//             }}
//           />

//           <div className="absolute top-3 right-3">
//             <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
//               {book.genre}
//             </span>
//           </div>
//           {book.averageRating > 0 && (
//             <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
//               <StarRating rating={book.averageRating} size="sm" />
//               <span className="text-xs font-medium text-gray-700">
//                 ({book.totalReviews})
//               </span>
//             </div>
//           )}
//         </div>

//         <div className="p-5">
//           <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
//             {book.title}
//           </h3>

//           <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
//             <User className="h-4 w-4" />
//             <span className="font-medium">{book.author}</span>
//           </div>

//           {book.description && (
//             <p className="text-gray-600 text-sm mb-4 line-clamp-3">
//               {book.description}
//             </p>
//           )}

//           <div className="flex items-center justify-between text-xs text-gray-500">
//             <div className="flex items-center space-x-1">
//               <Calendar className="h-3 w-3" />
//               <span>{new Date(book.createdAt).toLocaleDateString()}</span>
//             </div>

//             <div className="flex items-center space-x-1">
//               <MessageCircle className="h-3 w-3" />
//               <span>{book.totalReviews} reviews</span>
//             </div>
//           </div>

//           <div className="mt-3 pt-3 border-t border-gray-100">
//             <div className="flex items-center space-x-2">
//               <img
//                 src={book.addedBy.avatar}
//                 alt={book.addedBy.name}
//                 className="h-6 w-6 rounded-full object-cover"
//               />
//               <span className="text-xs text-gray-600">
//                 Added by {book.addedBy.name}
//               </span>
//             </div>
//           </div>
//         </div>
//       </Link>
//     </motion.div>
//   );
// };

// export default BookCard;

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, MessageCircle } from "lucide-react";
import { Book } from "../services/bookService";
import StarRating from "./StarRating";

interface BookCardProps {
  book: Book;
  index?: number;
}

const BookCard: React.FC<BookCardProps> = ({ book, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <Link to={`/books/${book._id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop";
            }}
          />
          <div className="absolute top-3 right-3">
            <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
              {book.genre}
            </span>
          </div>
          {book.averageRating > 0 && (
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
              <StarRating rating={book.averageRating} size="sm" />
              <span className="text-xs font-medium text-gray-700">
                ({book.totalReviews})
              </span>
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {book.title}
          </h3>

          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
            <User className="h-4 w-4" />
            <span className="font-medium">{book.author}</span>
          </div>

          {book.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {book.description}
            </p>
          )}

          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(book.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center space-x-1">
              <MessageCircle className="h-3 w-3" />
              <span>{book.totalReviews} reviews</span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <img
                src={book.addedBy.avatar}
                alt={book.addedBy.name}
                className="h-6 w-6 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face";
                }}
              />
              <span className="text-xs text-gray-600">
                Added by {book.addedBy.name}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BookCard;