import React from 'react'
import styles from './slider.module.css';
import Swiper from './Swiper'

const Slider = () => {
  return (
    <div>
        <div className={styles.container1}>
            <div className={styles.ctg}>
                <p>Men's Collection</p>
                <p>Women's Collection</p>
                <p>Kid's Collection</p>
                <p>Accessories</p>
                <p>Perfumes</p>



            </div>
            <div className={styles.slider}>
            <Swiper/>

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