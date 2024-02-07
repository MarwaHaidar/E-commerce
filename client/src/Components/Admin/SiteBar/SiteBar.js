import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import Axios
import { IoIosArrowDropdown } from 'react-icons/io';
import styles from './SiteBar.module.css';

function SiteBar() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (categoryId) => {
    if (selectedCategoryId === categoryId) {
      setIsOpen(!isOpen);
    } else {
      setIsOpen(true);
      setSelectedCategoryId(categoryId);
    }
  };

  useEffect(() => {
    // Fetch categories from your server using Axios
    axios.get('http://localhost:5000/categories')
      .then((response) => setCategories(response.data.data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    // Fetch subcategories based on selected category using Axios
    if (selectedCategoryId !== null) {
      if (!subcategories[selectedCategoryId]) {
        axios.get(`http://localhost:5000/categories/${selectedCategoryId}/subcategories`)
          .then((response) => {
            setSubcategories((prevSubcategories) => ({
              ...prevSubcategories,
              [selectedCategoryId]: response.data.data,
            }));
          })
          .catch((error) => console.error('Error fetching subcategories:', error));
      }
    }
  }, [selectedCategoryId, subcategories]);

  return (
    <div className="flex h-screen bg-gray-200">
      <aside className={`w-64 bg-gray-800 text-white ${styles.siteBarBackground}`}>
        <div className="p-4">
          <h2 className={`text-2xl font-bold ${styles.siteBarMainTopic}`}>Main Topics</h2>
        </div>
        <ul>
          {categories &&
            categories.map((category) => (
              <li key={category._id} className="py-2 px-4 cursor-pointer">
                <div onClick={() => toggleDropdown(category._id)} className={styles.siteBarTopic}>
                  <IoIosArrowDropdown className={styles.siteBarIcons} />
                  {category.name}
                </div>

                {isOpen && selectedCategoryId === category._id && (
                  <ul className={`pl-4 ${styles.siteBarsubTopic}`}>
                    {subcategories[selectedCategoryId] &&
                      subcategories[selectedCategoryId].map((subcategory) => (
                        <li key={subcategory._id} className="py-2">
                          {subcategory.name}
                        </li>
                      ))}
                  </ul>
                )}
              </li>
            ))}
        </ul>
      </aside>

      <div className="flex-1 p-4">
        <h1>Main Content</h1>
      </div>
    </div>
  );
}

export default SiteBar;
