import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AddSubCategories.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddSubCategories() {
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    image: null,
    category: '',
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from your server using Axios
    axios.get('http://localhost:5000/categories')
      .then((response) => setCategories(response.data.data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

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
      formDataCreate.append('category', formData.category);

      const response = await axios.post('http://localhost:5000/admin/subcategories', formDataCreate);

      console.log('Subcategory created successfully:', response.data);
      toast.success('Category created successfully!');
      // Redirect or handle success as needed
    } catch (error) {
      console.error('Error creating subcategory:', error);
    }
  };

  return (
    <div><ToastContainer />
    <div className={`max-w-md mx-auto mt-8 p-8 bg-white rounded-md shadow-md ${styles.formContainerSubCat}`}>
      <h2 className={`text-2xl font-bold mb-6 ${styles.formHeadingSubCat}`}>Add Subcategory</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className={`block text-sm font-medium text-gray-700 ${styles.formLabelSubCat}`}>
            Subcategory Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border rounded-md ${styles.formInputSubCat}`}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="desc" className={`block text-sm font-medium text-gray-700 ${styles.formLabelSubCat}`}>
            Description
          </label>
          <textarea
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border rounded-md ${styles.formInputSubCat}`}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className={`block text-sm font-medium text-gray-700 ${styles.formLabelSubCat}`}>
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border rounded-md ${styles.formSelectSubCat}`}
            required
          >
            <option value="" disabled>Select a Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className={`block text-sm font-medium text-gray-700 ${styles.formLabelSubCat}`}>
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            className="mt-1"
            accept="image/*"
            required
          />
        </div>
        <div className={`mb-4 ${styles.buttonContainer}`}>
          <button type="submit" className={`bg-blue-500 text-white p-2 rounded-md ${styles.formButtonSubCat}`}>
            Add Subcategory
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default AddSubCategories;