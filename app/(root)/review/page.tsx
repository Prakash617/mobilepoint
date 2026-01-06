"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import Button from "@/components/Button";
import { useReviews } from "@/hooks/useReviews";
import { useAddReview } from "@/hooks/useAddReview";
import { Review } from "@/types/review";

/* 🔹 TEMP SLUG FOR TESTING */
const TEST_SLUG = "airbuds";
const TEMP_USER = "guest@gowell.com";

const ReviewComponent = () => {
  const slug = TEST_SLUG;

  const [rating, setRating] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [formData, setFormData] = useState({
   
    comment: "",
  });

  // Fetch reviews
  const { data, isLoading, error } = useReviews({ product_slug: slug });

  // Add review
  const addReview = useAddReview(slug);

  if (isLoading) return <p className="px-6 py-4">Loading reviews...</p>;
  if (error) return <p className="px-6 py-4">Failed to load reviews</p>;

  const reviewList: Review[] = data?.results ?? [];
  const totalReviews = data?.total_reviews ?? 0;
  const average = data?.average_rating ?? 0;
  const ratings = data?.star_counts ?? { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const maxCount = Math.max(...Object.values(ratings));
  const visibleReviews = showAll ? reviewList : reviewList.slice(0, 3);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const TEMP_USER = "guest@gowell.com";

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!rating || !formData.comment) {
    alert("Rating and review are required");
    return;
  }

  addReview.mutate(
    {
      rating,
      comment: formData.comment,
      product_slug: slug,
      user: TEMP_USER,
    },
    {
      onSuccess: () => {
        setRating(0);
        setFormData({ comment: "" });
        setShowAll(true);
      },
      onError: () => {
        alert("Failed to submit review");
      },
    }
  );
};


  return (
    <>
     
      <div className="flex flex-col lg:flex-row sm:gap-30 w-full px-4 sm:px-6 lg:px-20 py-6">
        {/* Left: Ratings */}
        <div className="w-full lg:w-1/2 max-w-md p-5">
          <h1 className="mb-5">Based on {totalReviews} reviews</h1>

          <div className="text-4xl font-bold flex flex-col w-full">
            {average.toFixed(1)}
            <span className="text-sm font-normal text-gray-600">Overall</span>
          </div>

          <div className="space-y-3 mt-6">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-3">
                <div className="flex gap-0.5 w-20">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i <= star
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-yellow-400 rounded-full"
                    style={{
                      width:
                        maxCount === 0
                          ? "0%"
                          : `${(ratings[star as 1 | 2 | 3 | 4 | 5] / maxCount) * 100}%`,
                    }}
                  />
                </div>

                <span className="text-sm text-gray-500 w-6">
                  {ratings[star as 1 | 2 | 3 | 4 | 5]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Add Review Form */}
     <div className="w-full lg:w-1/2 p-4">
  <form className="space-y-6 mt-6 w-full" onSubmit={handleSubmit}>
    <h3 className="text-lg">Add a Review</h3>

    {/* Rating stars */}
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
      <label className="w-full sm:w-32 text-sm text-gray-700 font-bold">
        Your review:
      </label>
      <div className="flex gap-1 mt-1 sm:mt-0">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={15}
            onClick={() => setRating(star)}
            className={`cursor-pointer ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    </div>

    {/* Comment textarea */}
    <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-5">
      <label className="w-full sm:w-32 text-sm font-bold text-gray-700 pt-2">
        Your Review
      </label>
      <textarea
        name="comment"
        rows={3}
        value={formData.comment}
        onChange={handleChange}
        className="flex-1 rounded-3xl border border-gray-300 px-3 py-2 text-sm"
      />
    </div>


    {/* Submit button */}
    <div className="flex justify-start sm:pl-32">
      <Button
        text={addReview.isPending ? "Submitting..." : "Add review"}
        bgColor="bg-success"
        type="submit"
        disabled={addReview.isPending}
      />
    </div>
  </form>
</div>

      </div>

      {/* Reviews list */}
      <div className="flex flex-row w-full px-4 sm:px-2 lg:px-20 py-6">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-20 py-6 space-y-6">
          {visibleReviews.map((review) => (
            <div key={review.id} className="w-full p-2">
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i <= review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              <p className="text-gray-700 text-sm">{review.comment}</p>

              <p className="mt-2 text-gray-500 text-sm font-medium">
                {review.user} – {new Date(review.created_at).toLocaleDateString()}
              </p>

              <div className="h-0.5 w-full bg-gray-100 rounded-full" />
            </div>
          ))}

          {reviewList.length > 3 && (
            <div className="flex justify-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-blue-600 font-medium hover:underline"
              >
                {showAll
                  ? "Show Less"
                  : `Show More (${reviewList.length - 3})`}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReviewComponent;
