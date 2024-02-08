import React, { useState, useEffect } from "react";
import styles from './slider.module.css';
import axios from 'axios';

const handleFilter = () => {
    // filtering logic
};

const FilterableBox = () => {
    const [categories, setCategories] = useState([]);
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const handleSubcategoryChange = (subcategory) => {
        const isSelected = selectedSubcategories.includes(subcategory);

        if (isSelected) {
            setSelectedSubcategories(selectedSubcategories.filter((item) => item !== subcategory));
        } else {
            setSelectedSubcategories([...selectedSubcategories, subcategory]);
        }

        // Add logic to filter products based on the selected subcategories
    };

    useEffect(() => {


        axios.get('http://localhost:5000/categories')
            .then(response => {
                const categories = response.data.data;
                console.log(categories)
                setCategories(categories);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [])

    return (
        <div className={styles.ctg}>
            <div className={styles.filterBox}>
        
                    
            {categories && categories.map(category => (
                    <details key={category._id}>
                        <summary>{category.name}</summary>
                    <p>
                        <label>
                            <input
                                type="checkbox"
                                name="subcategory"
                                value="Shirts"
                                checked={selectedSubcategories.includes('Shirts')}
                                onChange={() => handleSubcategoryChange('Shirts')}
                            />Shirts
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="checkbox" name="subcategory" value="Pants" checked={selectedSubcategories.includes('Pants')} onChange={() => handleSubcategoryChange('Pants')}
                            />Pants
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="checkbox" name="subcategory" value="Trousers" checked={selectedSubcategories.includes('Trousers')} onChange={() => handleSubcategoryChange('Trousers')}
                            />Trousers
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="checkbox" name="subcategory" value="Shoes" checked={selectedSubcategories.includes('Shoes')} onChange={() => handleSubcategoryChange('Shoes')}
                            />Shoes
                        </label>
                    </p>
                    </details>
                ))}
               
                {/* <details>
                    <summary>Health & Well-being</summary>
                    <p>
                        <label>
                            <input
                                type="checkbox"
                                name="subcategory"
                                value="Shirts"
                                checked={selectedSubcategories.includes('Shirts')}
                                onChange={() => handleSubcategoryChange('Shirts')}
                            />Shirts
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="checkbox" name="subcategory" value="Pants" checked={selectedSubcategories.includes('Pants')} onChange={() => handleSubcategoryChange('Pants')}
                            />Pants
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="checkbox" name="subcategory" value="Trousers" checked={selectedSubcategories.includes('Trousers')} onChange={() => handleSubcategoryChange('Trousers')}
                            />Trousers
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="checkbox" name="subcategory" value="Shoes" checked={selectedSubcategories.includes('Shoes')} onChange={() => handleSubcategoryChange('Shoes')}
                            />Shoes
                        </label>
                    </p>
                </details>
                <details>
                    <summary>Women's Collection</summary>
                    <p>
                        <label>
                            <input type="checkbox" name="subcategory" value="Shirts" checked={selectedSubcategories.includes('Shirts')} onChange={() => handleSubcategoryChange('Shirts')}
                            />Shirts
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="checkbox" name="subcategory" value="Pants" checked={selectedSubcategories.includes('Pants')} onChange={() => handleSubcategoryChange('Pants')}
                            />Pants
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="checkbox" name="subcategory" value="Trousers" checked={selectedSubcategories.includes('Trousers')} onChange={() => handleSubcategoryChange('Trousers')}
                            />Trousers
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="checkbox" name="subcategory" value="Shoes" checked={selectedSubcategories.includes('Shoes')} onChange={() => handleSubcategoryChange('Shoes')}
                            />Shoes
                        </label>
                    </p>
                </details>
                <details>
                    <summary>Kids's Collection</summary>
                    <p>
                        <label>
                            <input type="checkbox" name="subcategory" value="Shirts" checked={selectedSubcategories.includes('Shirts')} onChange={() => handleSubcategoryChange('Shirts')}
                            />Shirts
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="checkbox" name="subcategory" value="Pants" checked={selectedSubcategories.includes('Pants')} onChange={() => handleSubcategoryChange('Pants')}
                            />Pants
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="checkbox" name="subcategory" value="Trousers" checked={selectedSubcategories.includes('Trousers')} onChange={() => handleSubcategoryChange('Trousers')}
                            />Trousers
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type="checkbox" name="subcategory" value="Shoes" checked={selectedSubcategories.includes('Shoes')} onChange={() => handleSubcategoryChange('Shoes')}
                            />Shoes
                        </label>
                    </p>
                </details> */}
            </div>
            <div className={styles.filterBtn}>
                <input
                    type="number"
                    id="minPrice"
                    name="minPrice"
                    placeholder="min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
                <span>USD Min Price</span>
                <br />
                <input
                    type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
                <span>USD Max Price</span><br />

                <button onClick={handleFilter}>Filter Products</button>
            </div>
        </div>
    );
};

export default FilterableBox;






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