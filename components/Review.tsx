"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import Button from "./Button";

// Initial static reviews
const initialReviews = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    rating: 5,
    comment: "Amazing product. Totally worth the price!",
    date: "2024-12-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    rating: 4,
    comment: "Good quality, but delivery was slow.",
    date: "2024-12-03",
  },
];

// Component
const Review = () => {
  const [rating, setRating] = useState(0);
  const [reviewList, setReviewList] = useState(initialReviews);
  const [showAll, setShowAll] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  // Derived review summary
  const reviewSummary = (() => {
    const ratingsCount: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let totalStars = 0;

    reviewList.forEach((r) => {
      ratingsCount[r.rating] = (ratingsCount[r.rating] || 0) + 1;
      totalStars += r.rating;
    });

    const totalReviews = reviewList.length;
    const average = totalReviews === 0 ? 0 : +(totalStars / totalReviews).toFixed(1);

    return { ratings: ratingsCount, totalReviews, average };
  })();

  const maxCount = Math.max(...Object.values(reviewSummary.ratings));

  const visibleReviews = showAll ? reviewList : reviewList.slice(0, 3);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.comment || rating === 0) {
      alert("Please fill all fields and select a rating!");
      return;
    }

    const newReview = {
      id: reviewList.length + 1,
      name: formData.name,
      email: formData.email,
      rating,
      comment: formData.comment,
      date: new Date().toISOString().split("T")[0],
    };

    setReviewList((prev) => [newReview, ...prev]);

    setFormData({ name: "", email: "", comment: "" });
    setRating(0);
    setShowAll(true);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row sm:gap-30 w-full px-4 sm:px-6 lg:px-20 py-6">
        {/* Left: Overall Rating & Bars */}
        <div className="w-full lg:w-1/2 max-w-md p-5">
          <h1 className="mb-5">Based on {reviewSummary.totalReviews} reviews</h1>

          {/* Average rating */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 w-full">
            <div className="text-4xl font-bold flex flex-col w-full">
              {reviewSummary.average}
              <span className="text-sm font-normal text-gray-600">Overall</span>
            </div>
          </div>

          {/* Rating bars */}
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-3">
                <div className="flex gap-0.5 w-20">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i <= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-yellow-400 rounded-full"
                    style={{
                      width: `${maxCount === 0 ? 0 : (reviewSummary.ratings[star] / maxCount) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-6">{reviewSummary.ratings[star]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Add Review Form */}
        <div className="w-full lg:w-1/2 p-4">
          <form className="space-y-6 mt-6 w-full" onSubmit={handleSubmit}>
            <h3 className="text-lg">Add a Review</h3>

            {/* Rating */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
              <label className="w-full sm:w-32 text-sm text-gray-700 font-bold">Your review:</label>
              <div className="flex gap-1 mt-1 sm:mt-0">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={15}
                    onClick={() => setRating(star)}
                    className={`cursor-pointer ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>

            {/* Comment */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-5">
              <label htmlFor="review" className="w-full sm:w-32 text-sm font-bold text-gray-700 pt-2 sm:pt-0">
                Your Review
              </label>
              <textarea
                id="review"
                name="comment"
                rows={3}
                value={formData.comment}
                onChange={handleChange}
                className="flex-1 rounded-3xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-0.5 focus:ring-primary focus:border-primary resize-none"
              />
            </div>

            {/* Name */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
              <label htmlFor="name" className="w-full sm:w-32 text-sm font-bold text-gray-700">
                Name<span className="text-red-600">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="flex-1 rounded-3xl border border-gray-300 px-3 py-3 text-sm focus:outline-none focus:ring-0.5 focus:ring-primary focus:border-primary"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 w-full">
              <label htmlFor="email" className="w-full sm:w-32 text-sm font-bold text-gray-700">
                Email<span className="text-red-600">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 rounded-3xl border border-gray-300 px-3 py-3 text-sm focus:outline-none focus:ring-0.5 focus:ring-primary focus:border-primary w-full"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-start sm:pl-37">
              <Button text="Add review" bgColor="bg-success" type="submit" />
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
                    className={i <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <p className="text-gray-700 text-sm sm:text-base">{review.comment}</p>
              <p className="mt-2 text-gray-500 text-sm font-medium">
                {review.name} - {review.date}
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
                {showAll ? "Show Less" : `Show More (${reviewList.length - 3})`}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Review;
