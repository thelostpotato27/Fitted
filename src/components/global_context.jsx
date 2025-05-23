import React, { createContext, useState, useContext } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalVariable, setGlobalVariable] = useState(null);

  return (
    <GlobalContext.Provider value={{ globalVariable, setGlobalVariable }}>
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => useContext(GlobalContext);


const ReviewGlobalContext = createContext();

export const ReviewGlobalProvider = ({ children }) => {
  const [globalVariable, setGlobalVariable] = useState({searchType: null, starRating: null, clothingType: null});

  return (
    <ReviewGlobalContext.Provider value={{ globalVariable, setGlobalVariable }}>
      {children}
    </ReviewGlobalContext.Provider>
  );
};
export const useReviewGlobalContext = () => useContext(ReviewGlobalContext);
