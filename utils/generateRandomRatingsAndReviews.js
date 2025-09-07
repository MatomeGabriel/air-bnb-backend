// Generate random reviews and review Count
exports.generateRandomReviewsAndRatings = () => {
  const rating = (Math.random() * 1 + 4).toFixed(1);
  const reviewCount = Math.floor(Math.random() * 500) + 1;
  return { rating, reviewCount };
};
