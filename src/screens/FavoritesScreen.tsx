import React from 'react';

import {Text, FlatList, Image, StyleSheet, Pressable} from 'react-native';

import {useFavorites} from '../context/FavoritesContext';

const FavoritesScreen = ({navigation}: any) => {
  const {favorites, removeFavorite} = useFavorites();

  return (
    <FlatList
      data={favorites}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.list}
      ListEmptyComponent={
        <Text style={styles.emptyText}>No favorite products</Text>
      }
      renderItem={({item}) => (
        <Pressable
          style={styles.card}
          onPress={() =>
            navigation.navigate('ProductDetail', {
              product: item,
            })
          }>
          <Image
            source={{uri: item.image}}
            style={styles.image}
            resizeMode="contain"
          />

          <Text numberOfLines={2} style={styles.title}>
            {item.title}
          </Text>

          <Text style={styles.price}>${item.price}</Text>

          <Pressable
            style={styles.removeButton}
            onPress={() => removeFavorite(item.id)}>
            <Text style={styles.removeText}>Remove Favorite</Text>
          </Pressable>
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#999',
  },

  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },

  image: {
    width: '100%',
    height: 180,
    marginBottom: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },

  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#ff4d4f',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },

  removeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FavoritesScreen;
