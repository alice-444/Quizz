import { createContext, useState, useContext } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [mode, setMode] = useState("easy");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);

  return (
    <AppContext.Provider
      value={{
        mode,
        setMode,
        category,
        setCategory,
        categories,
        setCategories,
        score,
        setScore,
        totalQuestions,
        setTotalQuestions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
