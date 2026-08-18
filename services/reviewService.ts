import { api } from '@/lib/api';

export type Review = {
  id: number;
  product_slug: string;
  user: string;
  rating: number;
  title?: string;
  comment: string;
  created_at: string;
};

export type ReviewResponse = {
  average_rating: number;
  total_reviews: number;
  star_counts: Record<number, number>;
  results: Review[];
};

export const reviewService = {
  getReviews: async (product_slug: string) => {
    const { data } = await api.get<ReviewResponse>(`/reviews/`, {
      params: { product_slug },
    });
    return data;
  },
  
  createReview: async (payload: { product_slug: string; rating: number; title?: string; comment: string }) => {
    const { data } = await api.post<Review>(`/reviews/`, payload);
    return data;
  },
};
