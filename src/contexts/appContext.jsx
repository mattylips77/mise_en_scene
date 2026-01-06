import {createContext, useContext, useState} from 'react';

const AppContext = createContext();

export function AppProvider({children}) {
  const [selectedMovie, setSelectedMovie] = useState()
  const [userData, setUserData] = useState(() => {
    const stored = localStorage.getItem('userData');
    if (stored) return JSON.parse(stored);

    const defaultValue = [];
    localStorage.setItem('userData', JSON.stringify(defaultValue));
    return defaultValue;
  });
  const [userMovieData, setUserMovieData] = useState({})

  const value = {
    selectedMovie,
    setSelectedMovie,
    userData,
    setUserData,
    userMovieData,
    setUserMovieData
  };

  return (
      <AppContext.Provider value={value}>
        {children}
      </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useMovieContext must be used within MovieProvider');
  }
  return context;
}