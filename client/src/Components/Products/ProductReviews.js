import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import styles from './Product.module.css';




let ratingScore = 3 // comes from database
const renderStars = () => {
  const stars = [];
  const fullStars = Math.round(ratingScore);

  for (let i = 0; i < 5; i++) {
    stars.push(
      <FaStar
        key={i}
        className={`${styles.fstar} ${i < fullStars ? styles.etar : styles.estar}`}
      />
    );
  }

  return stars;
};


const ProductReviews = () => {
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const handleAddReviewClick = () => {
    setIsAddingReview(true);
  };

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const reviewsContainer = document.querySelector(`.${styles.reviews}`);
    const reviewBox = document.createElement('div');
    reviewBox.className = styles.singleReview;

    const user = document.createElement('p');
    user.className = styles.reviewer;

    const ratingElement = document.createElement('p');
    ratingElement.className = styles.reviewerRating;
    ratingElement.textContent = `Rating: ${rating}`;

    const reviewTextElement = document.createElement('div');
    reviewTextElement.className = styles.reviewText;
    reviewTextElement.textContent = `Review: ${reviewText}`;

    const review = {
      userId: 'someone else',
      text: reviewText,
    };
    console.log(review)

    user.textContent = review.userId;

    reviewBox.appendChild(user);
    reviewBox.appendChild(ratingElement);
    reviewBox.appendChild(reviewTextElement);

    console.log(review);

   
    reviewsContainer.appendChild(reviewBox);

    setIsAddingReview(false);
    setReviewText('');
    setRating(0);
  };



  return (
    <div className={styles.main}>
      <p>Product Reviews</p>
      {isAddingReview ? (
        <form onSubmit={handleReviewSubmit}>
          <div className={styles.starRating}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} onClick={() => handleStarClick(star)}>
                {star <= rating ? (
                  <FaStar className={styles.fstar} />
                ) : (
                  <FaStar className={styles.estar} />
                )}
              </span>
            ))}
          </div>
          <textarea
            value={reviewText}
            className={styles.textarea}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Add your review..."
          /> <br />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <a onClick={handleAddReviewClick}>
          Add review
        </a>
      )}
      <div className={styles.reviews}>
        <div className={styles.singleReview}>
          <p className={styles.reviewer}>Someone</p>
          <p className={styles.reviewerRating}> {renderStars()} </p>
          <div>The product is very good</div>
        </div>
        <div className={styles.singleReview}>
          <p className={styles.reviewer}>Someone</p>
          <p className={styles.reviewerRating}> {renderStars()} </p>
          <div>Recommended</div>
        </div>
        <div className={styles.singleReview}>
          <p className={styles.reviewer}>Someone</p>
          <p className={styles.reviewerRating}> {renderStars()} </p>
          <div>Amazing!</div>
        </div>
      </div>

    </div>
  );
};

export default ProductReviews;
