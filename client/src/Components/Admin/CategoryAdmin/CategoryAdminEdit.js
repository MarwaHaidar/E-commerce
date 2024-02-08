// CategoryAdminEdit.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './CategoryAdmin.module.css'
import axios from 'axios';
import CategoryAdminGetOne from './CategoryAdminGetOne';
import { useCategoryContext } from './CategoryContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      toast.success('Category updated successfully');
      // Update category data using the context
      updateCategoryData(id);
  
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <div>
      <ToastContainer/>
    <div className={styles.formcontainerCat}>
      <form onSubmit={handleSubmit}>
        <h1 className={styles.formheadingCat}>{id ? 'Edit' : 'Create'} Category</h1>
        <div className="mb-4">
          <label htmlFor="name" className={styles.formLabelCat}>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border rounded-md ${styles.formInputCat}`}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="desc" className={styles.formLabelCat}>Description</label>
          <textarea
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border rounded-md ${styles.formInputCat}`}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className={styles.formLabelCat}  >Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        <div className={styles.buttonContainer}>
        <button type="submit" className={`bg-blue-500 text-white p-2 rounded-md ${styles.formButtonCat}`}>
          {id ? 'Update' : 'Create'} Category
        </button>
        </div>
      </form>
      <CategoryAdminGetOne />
    </div>
    </div>
  );
}

export default CategoryAdminEdit;
