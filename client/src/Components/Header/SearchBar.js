import React from 'react'
import styles from './Header.module.css';
import { LuSearch } from "react-icons/lu";

const SearchBar = () => {
    return (

     
        <div className={styles.searchBar}>
          <input
            type="text"
            name="search"
            id="search"
            className="rounded-md py-3 pl-5 pr-20 w-full text-gray-900 ring-1 ring-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-m sm:leading-6"
            placeholder="What are you looking for? ..."
          />
                 <LuSearch className={styles.searchIcon}/>
        </div>

    )
}

export default SearchBar