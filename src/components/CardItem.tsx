import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

type Props = {
  title: string;
  description: string;
  onDelete: () => void;
  onEdit: () => void;
};

const CardItem = ({title, description, onDelete, onEdit}: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description}>{description}</Text>

      <Pressable style={styles.editButton} onPress={onEdit}>
        <Text style={styles.buttonText}>Edit</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={onDelete}>
        <Text style={styles.buttonText}>Delete</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#ff4d4f',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#faad14',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 8,
  },
});

export default CardItem;
