import React, { useState } from 'react';
import axios from 'axios';
import styles from './AddCategories.module.css';
import { FaImage } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AddCategories() {
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'image' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataCreate = new FormData();
      formDataCreate.append('name', formData.name);
      formDataCreate.append('desc', formData.desc);
      formDataCreate.append('image', formData.image);

      const response = await axios.post('http://localhost:5000/admin/categories', formDataCreate);

      console.log('Category created successfully:', response.data);
      toast.success('Category created successfully!');
      
      // Redirect or handle success as needed
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };
  
// const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Product:", formData); // Log the state to debug
//     // Implement API call here
//   };

  return (
    <div>
    <ToastContainer />
    <div className={`max-w-md mx-auto mt-8 p-8 bg-white rounded-md shadow-md ${styles.formcontainerCat}`}>
      <h2 className={`text-2xl font-bold mb-6 ${styles.formheadingCat}`}>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className={`block text-sm font-medium text-gray-700 ${styles.formLabelCat}`}>
            Category Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border rounded-md ${styles.formInputCat}`}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="desc" className={`block text-sm font-medium text-gray-700 ${styles.formLabelCat}`}>
            Description
          </label>
          <textarea
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border rounded-md ${styles.formInputCat}`}
            required
          />
        </div>
        <div className="mb-4">
            <label htmlFor="image" className={`block text-sm font-medium text-gray-700 ${styles.formLabelCat}`}>
                Image
            </label>
            <div className="relative">
                <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                accept="image/*"
                required
                />
                <div className="text-gray-700 px-4 py-2 rounded-md cursor-pointer flex items-center border border-gray-500">
                <FaImage className="w-5 h-5 mr-2" /> Select Image
                </div>
            </div>
            </div>
        <div className={`buttonContainer ${styles.buttonContainer}`}>
            <button type="submit" className={`bg-blue-500 text-white p-2 rounded-md ${styles.formButtonCat}`}>
                Add Category
            </button>
            </div>
      </form>
    </div>
    </div>
  );
}

export default AddCategories;
