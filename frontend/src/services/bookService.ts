import api from './api';

export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  description?: string;
  isbn?: string;
  publishedYear?: number;
  coverImage: string;
  addedBy: {
    _id: string;
    name: string;
    avatar: string;
  };
  averageRating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
}

export interface BooksResponse {
  success: boolean;
  data: Book[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalBooks: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface BookFilters {
  page?: number;
  limit?: number;
  genre?: string;
  author?: string;
  search?: string;
  sortBy?: 'rating' | 'newest' | 'oldest' | 'title';
}

export const bookService = {
  async getBooks(filters: BookFilters = {}): Promise<BooksResponse> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    const response = await api.get(`/books?${params.toString()}`);
    return response.data;
  },

  async getBook(id: string): Promise<{ success: boolean; data: Book }> {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  async createBook(bookData: Partial<Book>): Promise<{ success: boolean; data: Book }> {
    const response = await api.post('/books', bookData);
    return response.data;
  },

  async updateBook(id: string, bookData: Partial<Book>): Promise<{ success: boolean; data: Book }> {
    const response = await api.put(`/books/${id}`, bookData);
    return response.data;
  },

  async deleteBook(id: string): Promise<{ success: boolean }> {
    const response = await api.delete(`/books/${id}`);
    return response.data;
  },

  async getGenres(): Promise<{ success: boolean; data: string[] }> {
    const response = await api.get('/books/genres');
    return response.data;
  },
};