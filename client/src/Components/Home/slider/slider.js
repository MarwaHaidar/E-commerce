import React from 'react'
import styles from './slider.module.css';
import Swiper from './Swiper'

const Slider = () => {
  return (
    <div>
      <div className={styles.container1}>
        <div className={styles.ctg}>
          <details>
            <summary>Men's Collection</summary>
            <p>Shirts</p>
            <p>Pants</p>
            <p>Trousers</p>
            <p>Shoes</p>
          </details>
          <details>
            <summary>Women's Collection</summary>
            <p>Shirts</p>
            <p>Pants</p>
            <p>Trousers</p>
            <p>Shoes</p>
          </details>
          <details>
            <summary>Kid's Collection</summary>
            <p>Shirts</p>
            <p>Pants</p>
            <p>Trousers</p>
            <p>Shoes</p>
          </details>
          <details>
            <summary>Accessories</summary>
            <p>Laces</p>
            <p>Bags</p>
            <p>Earings</p>
            <p>Rings</p>
          </details>
          <details>
            <summary>Perfumes</summary>
            <p>Men's Perfumes</p>
            <p>women's Perfumes</p>
          </details>
          <details>
            <summary>Self Care</summary>
            <p>Skincare</p>
            <p>Hair Care</p>
            <p>Bath and Bod</p>
          </details>

        </div>
        <div className={styles.slider}>
          <Swiper />

        </div>
      </div>

    </div>
  )
}

export default Slider

/*const Slider = () => {
  // State to store the category names fetched from the database
  const [categoryNames, setCategoryNames] = useState([]);

  // Fetch category names from the database when the component mounts
  useEffect(() => {
    const fetchCategoryNames = async () => {
      try {
        const response = await axios.get('/categories'); // Adjust the URL as per your API endpoint
        setCategoryNames(response.data); // Assuming the response contains an array of category names
      } catch (error) {
        console.error('Error fetching category names:', error);
      }
    };

    fetchCategoryNames(); // Call the fetchCategoryNames function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      <div className={styles.container1}>
        <div className={styles.ctg}>
          // Map over categoryNames and render each category name 
          {categoryNames.map((categoryName, index) => (
            <p key={index}>{categoryName}</p>
          ))}
        </div>
        <div className={styles.slider}>
          //Your slider content 
        </div>
      </div>
    </div>
  );
};

export default Slider;*/