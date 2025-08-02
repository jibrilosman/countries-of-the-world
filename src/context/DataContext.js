import React, { createContext, useContext, useState, useEffect} from "react";
import fetchData from "../services/fetchData";

const DataContext = createContext();



export const DataProvider = (props) => {
  const [data, setData] = useState([]);
  const [theme , setTheme] = useState('dark');
  
  useEffect(() => {
      fetchData()
      .then((data) => {
          setData(data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, []);

   
    
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };
    
    const value = {
         data,
        theme,
        toggleTheme,
    };
  return (
    <DataContext.Provider value={value}>
        {props.children}
    </DataContext.Provider>
  );
};

export const useData = () =>  {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
}
