import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SubCategoryAdminDelete() {
  const { id } = useParams();

  useEffect(() => {
    const deleteSubCategory = async () => {
      try {
        await axios.delete(`http://localhost:5000/admin/subcategories/${id}`);
        console.log('SubCategory deleted successfully');
    
      } catch (error) {
        console.error('Error deleting Subcategory:', error);
        
      }
    };

    deleteSubCategory();
  }, [id]);

  return (
    <div>
      {/* You can optionally display a message or loading indicator here */}
      <p>Deleting this category...</p>
    </div>
  );
}

export default SubCategoryAdminDelete
