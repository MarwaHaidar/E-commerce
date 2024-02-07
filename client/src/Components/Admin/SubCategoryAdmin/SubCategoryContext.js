import { createContext, useContext } from 'react';

const SubCategoryContext = createContext();

export const useSubCategoryContext = () => {
  return useContext(SubCategoryContext);
};

export default SubCategoryContext;