import React, { createContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    return (
        <DataContext.Provider value={{ products, setProducts }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;