import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import Banner from './Banner';
import Logo from './Logo';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import productsData from '../Home/BrowseProducts/temp/ProductsData.js' // temporary for testing


const Header = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const resultsContainerRef = useRef(null);
  const navigate = useNavigate();


  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setShowSuggestions(false);
    } else {
      const searchedProducts = productsData.filter(result =>
        result.name.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(searchedProducts);
      setShowSuggestions(true);
      // console.log(searchedProducts)
    }
  };

  const handleSuggestionClick = (resultId) => {
    // Find the product in searchResults based on resultId
    const clickedProduct = searchResults.find(product => product.id === resultId);

    // Log the clicked product
    console.log('Product clicked:', clickedProduct);

    // Hide suggestions and navigate to product page
    setShowSuggestions(false);
    navigate('/products');
  };

  useEffect(() => {
    console.log("effect running");

    const handleClickOutside = (event) => {
      console.log('Clicked outside'); // Debugging log

      const searchBarInput = document.getElementById('search');
      if (
        resultsContainerRef.current &&
        !resultsContainerRef.current.contains(event.target) &&
        !event.target.isSameNode(searchBarInput) &&
        !searchBarInput.contains(event.target)
      ) {
        setSearchResults([]);
        setSearchQuery('');
        setShowSuggestions(false); // Reset search query to trigger handleSearchQueryChange
      }
    };


    document.addEventListener('click', handleClickOutside);

    return () => {
      console.log("cleanup");
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  const handleSearchBarFocus = () => {
    if (searchQuery.trim() !== '') {
      setShowSuggestions(true); // Show suggestions when focusing on the search bar if it's not empty
    }
  };

  return (
    <div>
      <Banner />
      <div className={styles.header}>
        <Logo />
        <NavBar />
        <div className={styles.iconContainer}>
          <SearchBar onSearchQueryChange={handleSearchQueryChange} />
          <ul ref={resultsContainerRef} className={`${styles.suggestionsContainer} ${showSuggestions ? styles.show : ''}`}>
            {searchResults.length !== 0 ? (
              searchResults.map(result => (
                <li
                  className={styles.suggestion}
                  key={result.id}
                  onClick={() => handleSuggestionClick(result.id)}
                >
                  {result.name}
                </li>
              ))
            ) : (
              <li>No matches found</li>
            )}
          </ul>
          <Link to="/wishlist" className={styles.link}>
            <FiHeart className={styles.wishIcon} />
          </Link>
          <Link to="/cart" className={styles.link}>
            <FiShoppingCart className={styles.shopCartIcon} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header;

