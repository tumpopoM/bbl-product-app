import React from 'react';
import {Text, Image, StyleSheet, ScrollView, Pressable} from 'react-native';
import {useFavorites} from '../context/FavoritesContext';

const ProductDetailScreen = ({route}: any) => {
  const {product} = route.params;

  const {addFavorite, removeFavorite, isFavorite} = useFavorites();

  const favorite = isFavorite(product.id);

  const handleFavorite = () => {
    if (favorite) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{uri: product.image}}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>{product.title}</Text>

      <Text style={styles.price}>${product.price}</Text>

      <Pressable
        onPress={handleFavorite}
        style={[styles.favoriteButton, favorite && styles.favoriteActive]}>
        <Text style={styles.favoriteText}>
          {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Text>
      </Pressable>

      <Text style={styles.category}>{product.category}</Text>

      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  image: {
    width: '100%',
    height: 300,
    marginBottom: 24,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  price: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  category: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textTransform: 'capitalize',
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  favoriteButton: {
    backgroundColor: '#1677ff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },

  favoriteActive: {
    backgroundColor: '#ff4d4f',
  },

  favoriteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;
