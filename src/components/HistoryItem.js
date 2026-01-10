import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HistoryItem({ expression, result, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.expression}>{expression}</Text>
      <Text style={styles.result}>= {result}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginVertical: 4,
    backgroundColor: '#f9f9f9',
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  expression: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
