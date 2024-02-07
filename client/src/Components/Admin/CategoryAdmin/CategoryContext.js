import { createContext, useContext } from 'react';

const CategoryContext = createContext();

export const useCategoryContext = () => {
  return useContext(CategoryContext);
};

export default CategoryContext;