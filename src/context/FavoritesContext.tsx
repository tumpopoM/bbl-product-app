import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem('FAVORITES', JSON.stringify(favorites));
      } catch (err) {
        console.log(err);
      }
    };

    saveFavorites();
  }, [favorites]);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('FAVORITES');

      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (err) {
      console.log(err);
    }
  };

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
