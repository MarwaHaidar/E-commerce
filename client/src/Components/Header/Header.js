import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from './../Context';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Header.module.css';
import Banner from './Banner';
import Logo from './Logo';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import { FiHeart, FiShoppingCart } from "react-icons/fi";


const Header = () => {
  const { setProducts } = useContext(DataContext);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const resultsContainerRef = useRef(null);
  const navigate = useNavigate();

  // retrieving products on input change
  const handleSearchQueryChange = async (query) => {
    setSearchQuery(query);

    if (query.trim() === '') {
      setTimeout(() => {
        setShowSuggestions(false);
      }, 800)
    } else {
      try {
        const response = await axios.get(`http://localhost:5000/products/search?q=${query}`);
        const searchedProducts = response.data.products;
        setSearchResults(searchedProducts);
        setProducts(searchedProducts); // Update global state
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const handleSearchQuery = async (query) => {
    setSearchQuery(query);

    if (searchQuery.trim() === '') {
      setTimeout(() => {
        setShowSuggestions(false);
      }, 800)
      return
    } else {
      try {
        const response = await axios.get(`http://localhost:5000/products/search?q=${searchQuery}`);
        const searchedProducts = response.data.products;
        setSearchResults(searchedProducts);
        setProducts(searchedProducts);
        setShowSuggestions(false);
        navigate(`/products/search?q=${searchQuery}`)


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };
  // retrieving products on suggestion click
  const handleSuggestionClick = async (query) => {
    try {
      setSearchQuery(query);
      const response = await axios.get(`http://localhost:5000/products/search?q=${query}`);
      const searchedProducts = response.data.products;
      setSearchResults(searchedProducts);
      setProducts(searchedProducts);
      console.log("header component :", searchedProducts) // this could be more than one product in case multiple products have the same name
      console.log("after fetch (logginf DataContext in header component): ", typeof (DataContext))
      setShowSuggestions(false);
      navigate(`/products/search?q=${searchQuery}`)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };




  useEffect(() => {
    const handleClickOutside = (event) => {
      const searchBarInput = document.getElementById('search');
      if (
        resultsContainerRef.current &&
        !resultsContainerRef.current.contains(event.target) &&
        !event.target.isSameNode(searchBarInput) &&
        !searchBarInput.contains(event.target)
      ) {
        setSearchResults([]);
        setSearchQuery('');
        setShowSuggestions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };

  }, []);

  return (
      <div>
        <Banner />
        <div className={styles.header}>
          <Logo />
          <NavBar />
          <div className={styles.iconContainer}>
            <SearchBar onSearchQueryChange={handleSearchQueryChange} onSearchQuery={handleSearchQuery} />
            <ul ref={resultsContainerRef} className={`${styles.suggestionsContainer} ${showSuggestions ? styles.show : ''}`}>
              {searchResults.length !== 0 ? (
                searchResults.map(result => (
                  <li
                    className={styles.suggestion}
                    key={result._id}
                    onClick={() => handleSuggestionClick(result.name)} // Pass suggestion name as query
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
  );
};

export default Header;
