import React , { useEffect , useState} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SubCategoryAdminGetOne from './SubCategoryAdminGetOne';
import { useSubCategoryContext } from './SubCategoryContext';
import styles from './SubCategoryAdmin.module.css'
function SubCategoryAdminEdit() {
  const { id } = useParams();
  const { SubcategoryData, updateSubCategoryData } = useSubCategoryContext ();
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    image: null,
  });
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/subcategories/${id}`)
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

      await axios.put(`http://localhost:5000/admin/subcategories/${id}`, formDataUpdate);
      console.log('subCategory updated successfully');
      updateSubCategoryData(id);
    } catch (error) {
      console.error('Error updating subcategory:', error);
    }
  };
  
  return (
    <div className={styles.AdminEditMainBoxSub}>
      <h1>{id ? 'Edit' : 'Create'} SubCategory</h1>
      <form onSubmit={handleSubmit}>
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
          {id ? 'Update' : 'Create'} subCategory
        </button>
      </form>
      <SubCategoryAdminGetOne />
    </div>
  );
}

export default SubCategoryAdminEdit
