import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, BookOpen, MessageCircle, Edit, Save, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { reviewService, Review } from "../services/reviewService";
import StarRating from "../components/StarRating";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    avatar: user?.avatar || "",
  });
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchMyReviews();
  }, []);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name,
        avatar: user.avatar,
      });
    }
  }, [user]);

  const fetchMyReviews = async () => {
    try {
      const response = await reviewService.getMyReviews();
      setMyReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!profileForm.name.trim()) {
      toast.error("Name is required");
      return;
    }

    setUpdating(true);
    const success = await updateProfile(profileForm);

    if (success) {
      setEditMode(false);
    }

    setUpdating(false);
  };

  const handleCancelEdit = () => {
    setProfileForm({
      name: user?.name || "",
      avatar: user?.avatar || "",
    });
    setEditMode(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="Loading profile..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Edit className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>

          {editMode ? (
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img
                    src={profileForm.avatar || user.avatar}
                    alt="Profile"
                    className="h-20 w-20 rounded-full object-cover border-4 border-gray-200"
                  />
                </div>
                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={profileForm.name}
                        onChange={(e) =>
                          setProfileForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="avatar"
                        className="block text-sm font-medium text-gray-700 mb-2">
                        Avatar URL
                      </label>
                      <input
                        type="url"
                        id="avatar"
                        value={profileForm.avatar}
                        onChange={(e) =>
                          setProfileForm((prev) => ({
                            ...prev,
                            avatar: e.target.value,
                          }))
                        }
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter avatar URL"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="submit"
                  disabled={updating}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  {updating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="flex items-center space-x-6">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-20 w-20 rounded-full object-cover border-4 border-gray-200"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {user.name}
                </h2>
                <p className="text-gray-600 mb-2">{user.email}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>
                      Member since{" "}
                      {new Date(
                        user.createdAt || Date.now()
                      ).toLocaleDateString()}
                    </span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{myReviews.length} reviews</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* My Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <MessageCircle className="h-6 w-6" />
            <span>My Reviews ({myReviews.length})</span>
          </h2>

          {loading ? (
            <LoadingSpinner text="Loading your reviews..." />
          ) : myReviews.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No reviews yet
              </h3>
              <p className="text-gray-600 mb-4">
                Start exploring books and share your thoughts with the
                community!
              </p>
              <button
                onClick={() => (window.location.href = "/books")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Browse Books
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {myReviews.map((review, index) => {
                const book = review.book as any; // Type assertion for populated book
                return (
                  <motion.div
                    key={review._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="h-16 w-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                            {book.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <StarRating rating={review.rating} size="sm" />
                            <span className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">
                          by {book.author}
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          {review.reviewText}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
