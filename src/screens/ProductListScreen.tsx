import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Pressable,
} from 'react-native';

const ProductListScreen = ({navigation}: any) => {
  const [products, setProducts] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch('https://fakestoreapi.com/products');

      const data = await response.json();

      setProducts(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);

      await fetchProducts();
    } catch (err) {
      console.log(err);
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      contentContainerStyle={styles.list}
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
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  list: {
    padding: 16,
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
});

export default ProductListScreen;
