import React, {useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Pressable,
  Text,
  View,
} from 'react-native';
import {mockData} from '../data/mockData';
import {usePosts} from '../hooks/usePosts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardItem from '../components/CardItem';

const HomeScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const {list, setList, loading, error, fetchData} = usePosts();

  const handleRefresh = async () => {
    try {
      setRefreshing(true);

      await fetchData();
    } catch (err) {
      console.log(err);
    } finally {
      setRefreshing(false);
    }
  };

  const saveData = async (data: typeof mockData) => {
    try {
      await AsyncStorage.setItem('MY_LIST', JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (id: string) => {
    const updatedList = list.filter(item => item.id !== id);

    setList(updatedList);

    saveData(updatedList);
  };

  const handleAdd = () => {
    if (!title.trim() || !description.trim()) {
      return;
    }

    if (editingId) {
      const updatedList = list.map(item =>
        item.id === editingId
          ? {
              ...item,
              title,
              description,
            }
          : item,
      );

      setList(updatedList);

      saveData(updatedList);

      setEditingId(null);
    } else {
      const newItem = {
        id: Date.now().toString(),
        title,
        description,
      };

      const updatedList = [newItem, ...list];

      setList(updatedList);

      saveData(updatedList);
    }

    setTitle('');
    setDescription('');
  };

  const handleEdit = (
    id: string,
    currentTitle: string,
    currentDescription: string,
  ) => {
    setEditingId(id);

    setTitle(currentTitle);
    setDescription(currentDescription);
  };

  const filteredList = list.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
          style={styles.input}
        />

        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />

        <Pressable style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>
            {editingId ? 'Update Item' : 'Add Item'}
          </Text>
        </Pressable>
      </View>
      <FlatList
        data={filteredList}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListEmptyComponent={<Text style={styles.emptyText}>No data found</Text>}
        renderItem={({item}) => (
          <CardItem
            title={item.title}
            description={item.description}
            onDelete={() => handleDelete(item.id)}
            onEdit={() => handleEdit(item.id, item.title, item.description)}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  list: {
    padding: 16,
  },
  formContainer: {
    padding: 16,
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },

  addButton: {
    backgroundColor: '#1677ff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },

  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#999',
  },
});

export default HomeScreen;
