export type Review = {
  id: number;
  product: number;
  product_slug: string;
  user: string;
  rating: number;
  title?: string;
  comment: string;
  image?: string | null;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
};

export type ReviewStarCounts = {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
};

export type ReviewListResponse = {
  average_rating: number;
  total_reviews: number;
  star_counts: ReviewStarCounts;
  results: Review[];
};
