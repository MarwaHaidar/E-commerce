// CategoryAdminEdit.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './CategoryAdmin.module.css'
import axios from 'axios';
import CategoryAdminGetOne from './CategoryAdminGetOne';
import { useCategoryContext } from './CategoryContext';

function CategoryAdminEdit() {
  const { id } = useParams();
  const { categoryData, updateCategoryData } = useCategoryContext();
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    image: null,
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/categories/${id}`)
        .then((response) => {
          const { name, desc } = response.data.data;
          setFormData({ name, desc, image: null });
        })
        .catch((error) => console.error('Error fetching category details:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'image' ? e.target.files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataUpdate = new FormData();
      formDataUpdate.append('name', formData.name);
      formDataUpdate.append('desc', formData.desc);

      if (formData.image) {
        formDataUpdate.append('image', formData.image);
      }

      await axios.put(`http://localhost:5000/admin/categories/${id}`, formDataUpdate);

      console.log('Category updated successfully');
      // Redirect or handle success as needed

      // Update category data using the context
      updateCategoryData(id);
  
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <div className={styles.AdminEditMainBox}>
      <form onSubmit={handleSubmit}>
        <h1>{id ? 'Edit' : 'Create'} Category</h1>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="desc" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          {id ? 'Update' : 'Create'} Category
        </button>
      </form>
      <CategoryAdminGetOne />
    </div>
  );
}

export default CategoryAdminEdit;
