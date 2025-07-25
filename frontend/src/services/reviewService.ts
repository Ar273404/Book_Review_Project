import api from './api';

export interface Review {
  _id: string;
  book: string | {
    _id: string;
    title: string;
    author: string;
    coverImage: string;
  };
  reviewer: {
    _id: string;
    name: string;
    avatar: string;
  };
  rating: number;
  reviewText: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewsResponse {
  success: boolean;
  data: Review[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalReviews: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export const reviewService = {
  async getBookReviews(bookId: string, page = 1, limit = 10): Promise<ReviewsResponse> {
    const response = await api.get(`/reviews/book/${bookId}?page=${page}&limit=${limit}`);
    return response.data;
  },

  async createReview(reviewData: {
    book: string;
    rating: number;
    reviewText: string;
  }): Promise<{ success: boolean; data: Review }> {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  },

  async updateReview(id: string, reviewData: {
    rating: number;
    reviewText: string;
  }): Promise<{ success: boolean; data: Review }> {
    const response = await api.put(`/reviews/${id}`, reviewData);
    return response.data;
  },

  async deleteReview(id: string): Promise<{ success: boolean }> {
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
  },

  async getMyReviews(page = 1, limit = 10): Promise<ReviewsResponse> {
    const response = await api.get(`/reviews/my-reviews?page=${page}&limit=${limit}`);
    return response.data;
  },
};