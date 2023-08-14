import { useState, createContext, useContext } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keyword: null,
    results: [],
  });

  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};

//custom hook;hook is function only
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
