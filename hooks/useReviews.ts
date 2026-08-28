import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewService } from '@/services/reviewService';
import { toast } from 'sonner';

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
      toast.success("Review submitted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.detail || "Failed to submit review. Please try again.");
    }
  });
};
