import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewService } from '@/services/reviewService';

export const reviewKeys = {
  all: ['reviews'] as const,
  list: (product_slug: string) => [...reviewKeys.all, product_slug] as const,
};

export const useReviews = (product_slug: string) => {
  return useQuery({
    queryKey: reviewKeys.list(product_slug),
    queryFn: () => reviewService.getReviews(product_slug),
    enabled: !!product_slug,
  });
};

export const useAddReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: reviewService.createReview,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.list(variables.product_slug) });
      alert("Review submitted successfully");
    },
    onError: (error: any) => {
      alert(error?.response?.data?.detail || "Failed to submit review. Please try again.");
    }
  });
};
