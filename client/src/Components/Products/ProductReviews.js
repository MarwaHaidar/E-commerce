import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { FaStar } from 'react-icons/fa';
import styles from './Product.module.css';


// for posting reviews
const getAccessToken = () => {
  const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };
  return getCookie('accessToken');

};




const ProductReviews = () => {
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState([]);
  const { productId } = useParams();
  console.log(productId)
  const accessToken = getAccessToken(); // to post reviews


  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.round(rating);

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

  // dom manipulations
  const handleAddReviewClick = () => {
    setIsAddingReview(true);
  };

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };




  const handleReviewSubmit = (e) => {

    e.preventDefault();
    const userReview = {
      productId,
      userId: "65bcfbfd28d92d66cf80c50c",// should be equal to user id in database / should be got from the token
      rating,
      reviewText: reviewText
    };
    axios.post('http://localhost:5000/user/review', userReview)
      .then(response => {
        console.log('Review added successfully:', response.data);
        setReview(review);
        setIsAddingReview(false);
        setReviewText('');
        setRating(0);
      })
      .catch(error => {
        console.error('Error adding review:', error);
        // Handle error
      });




  };

  useEffect(() => {
    if (productId) {
      axios.get(`http://localhost:5000/reviews/product-reviews/${productId}`)
        .then(response => {
          const reviews = response.data.data[0];
          const reversedReviews = reviews.reviews.slice().reverse(); 
          const updatedReviews = { ...reviews, reviews: reversedReviews }; 
          setReview(updatedReviews); 
        })
        .catch(error => console.error("Error: no such product Id", error));
    }
  }, [productId, isAddingReview]);
  


  





  return (
    <div className={styles.main}>
      <p key={review.productId} >Product Reviews</p>
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
        {review.reviews && review.reviews.map((rev, index) => (
          <div key={index} className={styles.singleReview}>
            <p className={styles.reviewer}>{rev.fullName}</p>
            <p className={styles.reviewerRating}>{renderStars(rev.rating)}</p>
            <div>{rev.reviewText}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
