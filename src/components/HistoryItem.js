import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HistoryItem({ expression, result, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.6}>
      <Text style={styles.expression} numberOfLines={1}>{expression}</Text>
      <Text style={styles.result} numberOfLines={1}>= {result}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 4,
    backgroundColor: '#fff',
    borderLeftWidth: 3,
    borderLeftColor: '#007AFF',
    borderRadius: 4,
  },
  expression: {
    fontSize: 13,
    color: '#666',
    marginBottom: 3,
    fontFamily: 'Courier New',
  },
  result: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});
