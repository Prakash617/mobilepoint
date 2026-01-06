// hooks/useReviews.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReviewListResponse } from "@/types/review";

export const useReviews = ({ product_slug }: { product_slug: string }) => {
  return useQuery<ReviewListResponse>({
    queryKey: ["reviews", product_slug],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.gowell.edu.np/api/reviews/`
      );
      // Filter results for the specific product_slug
      const filteredResults = res.data.results.filter(
        (r: any) => r.product_slug === product_slug
      );
      const total_reviews = filteredResults.length;
      const average_rating =
        total_reviews === 0
          ? 0
          : filteredResults.reduce((sum: number, r: any) => sum + r.rating, 0) /
            total_reviews;

      const star_counts = {
        "1": filteredResults.filter((r: any) => r.rating === 1).length,
        "2": filteredResults.filter((r: any) => r.rating === 2).length,
        "3": filteredResults.filter((r: any) => r.rating === 3).length,
        "4": filteredResults.filter((r: any) => r.rating === 4).length,
        "5": filteredResults.filter((r: any) => r.rating === 5).length,
      };

      return {
        average_rating,
        total_reviews,
        star_counts,
        results: filteredResults,
      };
    },
  });
};
