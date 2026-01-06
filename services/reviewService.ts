import { api } from "@/lib/api";
import { ReviewListResponse } from "@/types/review";

export const reviewService = {
  // GET reviews
  getReviews: async (params?: {
    product_slug?: string;
    page?: number;
    page_size?: number;
    ordering?: string;
  }): Promise<ReviewListResponse> => {
    const res = await api.get("/reviews/", { params });
    const d = res.data;

    return {
      average_rating: Number(d.average_rating) || 0,
      total_reviews: Number(d.total_reviews) || 0,
      star_counts: {
        "1": d.star_counts?.["1"] ?? 0,
        "2": d.star_counts?.["2"] ?? 0,
        "3": d.star_counts?.["3"] ?? 0,
        "4": d.star_counts?.["4"] ?? 0,
        "5": d.star_counts?.["5"] ?? 0,
      },
      results: d.results ?? [],
    };
  },

  // POST review
  addReview: async (data: {
    product_slug: string;
    rating: number;
    comment: string;
  }) => {
    const res = await api.post("/reviews/", data);
    return res.data;
  },
};
