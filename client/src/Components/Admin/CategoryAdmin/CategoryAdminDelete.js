import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CategoryAdminDelete() {
  const { id } = useParams();

  useEffect(() => {
    const deleteCategory = async () => {
      try {
        await axios.delete(`http://localhost:5000/admin/categories/${id}`);
        console.log('Category deleted successfully');
    
      } catch (error) {
        console.error('Error deleting category:', error);
        
      }
    };

    deleteCategory();
  }, [id]);

  return (
    <div>
      {/* You can optionally display a message or loading indicator here */}
      <p>Deleting this category...</p>
    </div>
  );
}

export default CategoryAdminDelete;
