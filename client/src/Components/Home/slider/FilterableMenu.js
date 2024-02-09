import React, { useState, useEffect, useContext } from "react";
import DataContext from '../../Context';
import styles from './slider.module.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const FilterableBox = () => {
    const { products, setProducts } = useContext(DataContext);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [noProducts, setNoProducts] = useState(false)
    const navigate = useNavigate()

    const handleSubcategoryChange = (subcategory) => {
        const isSelected = selectedSubcategories.includes(subcategory);


        if (isSelected) {
            setSelectedSubcategories(selectedSubcategories.filter((item) => item !== subcategory));
        } else {
            setSelectedSubcategories([...selectedSubcategories, subcategory]);
        }


    };

    const handleFilter = () => {

        // Construct the filter query parameters
        const queryParams = {};

        // Add selected subcategories to the query parameters
        if (selectedSubcategories.length > 0) {
            queryParams.subcategory = selectedSubcategories.join(',');
        }

        // Add minPrice and maxPrice to the query parameters
        if (minPrice !== '') {
            queryParams.minPrice = minPrice;
        }
        if (maxPrice !== '') {
            queryParams.maxPrice = maxPrice;
        }

        // Convert the query parameters object into a query string
        const queryString = new URLSearchParams(queryParams).toString();
        console.log(queryString)

        // Fetch products with the constructed query string
        axios.get(`http://localhost:5000/products/filter?${queryString}`)
            .then(response => {
                const filteredProducts = response.data;
                if (filteredProducts.resultCount > 0) {
                    console.log(filteredProducts);
                    setNoProducts(false);
                    setProducts(filteredProducts);
                    setProducts(filteredProducts); // Update global state
                    navigate(`/products/filter?${queryString}`)

                } else {
                    console.log("No products");
                    // setFilteredProducts([]);
                    setNoProducts(true);
                }
            })
            .catch(error => {
                console.error('Error fetching filtered products:', error);
            });
    };

    useEffect(() => {
        axios.get('http://localhost:5000/categories')
            .then(response => {
                const categoriesData = response.data.data;
                setCategories(categoriesData);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });

        axios.get('http://localhost:5000/subcategories')
            .then(response => {
                const subcategoriesData = response.data.data;
                setSubcategories(subcategoriesData);
            })
            .catch(error => {
                console.error('Error fetching subcategories:', error);
            });
    }, []);

    return (
        <div className={styles.ctg}>
            {noProducts && (
                <div className="bg-yellow-300 bg-opacity-50  text-gray-600 mr-3 px-4 py-2 rounded-md mt-4">
                    No products found.
                </div>

            )}

            <div className={styles.filterBox}>
                {categories.map(category => (
                    <details key={category._id}>
                        <summary>{category.name}</summary>
                        {subcategories && subcategories
                            .filter(subcategory => subcategory.category === category._id)
                            .map(subcategory => (
                                <p key={subcategory._id}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="subcategory"
                                            value={subcategory._id}
                                            checked={selectedSubcategories.includes(subcategory._id)}
                                            onChange={() => handleSubcategoryChange(subcategory._id)}
                                        />
                                        {subcategory.name}
                                    </label>
                                </p>
                            ))}
                    </details>
                ))}
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



