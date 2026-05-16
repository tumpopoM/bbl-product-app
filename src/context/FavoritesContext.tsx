import React, {createContext, useContext, useState} from 'react';

type FavoritesContextType = {
  favorites: any[];

  addFavorite: (product: any) => void;

  removeFavorite: (id: number) => void;

  isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType>(
  {} as FavoritesContextType,
);

export const FavoritesProvider = ({children}: any) => {
  const [favorites, setFavorites] = useState<any[]>([]);

  const addFavorite = (product: any) => {
    setFavorites(prev => [...prev, product]);
  };

  const removeFavorite = (id: number) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const isFavorite = (id: number) => {
    return favorites.some(item => item.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
