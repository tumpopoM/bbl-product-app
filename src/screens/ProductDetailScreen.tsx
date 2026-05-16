import React from 'react';
import {Text, Image, StyleSheet, ScrollView} from 'react-native';

const ProductDetailScreen = ({route}: any) => {
  const {product} = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{uri: product.image}}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>{product.title}</Text>

      <Text style={styles.price}>${product.price}</Text>

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
});

export default ProductDetailScreen;
