import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type AddReviewPayload = {
  rating: number;
  comment: string;
  product_slug: string;
  user: string;
};

export const useAddReview = (slug: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddReviewPayload) => {
      const res = await axios.post(
        "https://api.gowell.edu.np/api/reviews/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", slug],
      });
    },
  });
};
