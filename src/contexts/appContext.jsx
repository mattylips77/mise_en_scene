import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children}) {
  const [selectedMovie, setSelectedMovie] = useState(null)

  const value = {
    selectedMovie,
    setSelectedMovie
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