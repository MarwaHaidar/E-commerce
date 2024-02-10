import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import Axios
import { IoIosArrowDropdown } from 'react-icons/io';
import styles from './SiteBar.module.css';
import { AiOutlineLogin } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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


  const handleDeleteClick = async (categoryID) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this category?');
      if (confirmed) {
        await axios.delete(`http://localhost:5000/admin/categories/${categoryID}`);
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category._id !== categoryID)
        );
        toast.success('Category deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Error deleting category');
    }
  };

  const handleDeleteClickSub = async (subcategoryID) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this Subcategory?');
      if (confirmed) {
        await axios.delete(`http://localhost:5000/admin/subcategories/${subcategoryID}`);
        setSubcategories((prevSubcategories) => {
          const updatedSubcategories = { ...prevSubcategories };
          if (updatedSubcategories[selectedCategoryId]) {
            updatedSubcategories[selectedCategoryId] = updatedSubcategories[
              selectedCategoryId
            ].filter((subcategory) => subcategory._id !== subcategoryID);
          }
          return updatedSubcategories;
        });
        toast.success('Subcategory deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      toast.error('Error deleting subcategory');
    }
  };
  
return (
  <div>
    <ToastContainer />
    <div className="flex h-screen bg-gray-200">
      <aside className={`w-64 bg-gray-800 text-white ${styles.siteBarBackground}`}>
        <div className="p-4">

          <h2 className={`text-xl font-bold  ${styles.siteBarMainTopic}`}>Additions </h2>

          <div className={styles.Adddropdown}>
            <Link to="/admin/addcategories" className={`text-lg ${styles.subtopicbtn}`}>
              Add Category
            </Link>
            <Link to="/admin/addsubcategories" className={`text-lg ${styles.subtopicbtn}`}>
              Add Subcategory
            </Link>
            <Link to="/admin/addproduct" className={`text-lg ${styles.subtopicbtn}`}>
              Add Product
            </Link>
          </div>
        </div>

         
            <h2 className={`text-xl font-bold ml-4 ${styles.siteBarMainTopic}`}>Main Topics</h2>
        
        <ul>
          {categories &&
            categories.map((category) => (
              <li key={category._id} className="py-2 px-4 cursor-pointer">
                <div onClick={() => toggleDropdown(category._id)} className={styles.siteBarTopic}>
                  <IoIosArrowDropdown className={styles.siteBarIcons} />
                  {category.name}
                  <div className={styles.crudoperationSiteBar}>
                    {/* Link to the edit page with the category ID */}
                    <Link to={`/admin/editCat/${category._id}`}><FaRegEdit className={styles.iconSize} /></Link>
                    <Link to={`/admin/`}
                    onClick={() => handleDeleteClick(category._id)}><MdDeleteForever className={styles.iconSize}/> </Link>

                  </div>
                </div>

                {isOpen && selectedCategoryId === category._id && (
                  <ul className={`pl-4 ${styles.siteBarsubTopic}`}>
                    {subcategories[selectedCategoryId] &&
                      subcategories[selectedCategoryId].map((subcategory) => (
                        <li key={subcategory._id} className="py-2 ml-4 flex " >
                          {subcategory.name}
                          <div className={styles.crudoperationSiteBar}>
                          <Link to={`/admin/allproducts/${subcategory._id}`}><AiOutlineLogin className={styles.iconSize} /></Link>
                            <Link to={`/admin/editsubCat/${subcategory._id}`}><FaRegEdit className={styles.iconSize} /></Link>
                            <Link to={`/admin/`}
                            onClick={() => handleDeleteClickSub(subcategory._id)}><MdDeleteForever  className={styles.iconSize}/> </Link> 
                          </div>    
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
    </div>
  );
}

export default SiteBar;
