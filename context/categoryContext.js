import React, { createContext, useState } from "react";

const categoryContext = createContext({
  data: [],
  getCategories: (data) => {},
  addCategory: (name, type, icon) => {},
});

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const getCategories = (data) => {
    setCategories(data);
  };

  const addCategory = (name, type, icon) => {
    setCategories((pre) => [
      ...pre,
      { name, type, id: Math.floor(Math.random() * 10000), icon },
    ]);
  };
  return (
    <categoryContext.Provider value={(addCategory, categories, getCategories)}>
      {children}
    </categoryContext.Provider>
  );
};
