import React, { createContext, useState } from "react";

const categoryContext = createContext({
  categories: [],
  getCategories: (data) => { },
  addCategory: (item) => { },
});

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const getCategories = (data) => {
    setCategories(data);
  };

  const addCategory = (item) => {
    setCategories((pre) => [
      ...pre,
      { ...item },
    ]);
  };
  return (
    <categoryContext.Provider value={{ addCategory, categories, getCategories }}>
      {children}
    </categoryContext.Provider>
  );
};


export default categoryContext