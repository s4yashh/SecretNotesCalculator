import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HistoryItem({ expression, result, onPress }) {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress} 
      activeOpacity={0.7}
    >
      <Text style={styles.expression} numberOfLines={1}>
        {expression}
      </Text>
      <Text style={styles.result} numberOfLines={1}>
        = {result}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginVertical: 6,
    marginHorizontal: 4,
    backgroundColor: '#fff',
    borderLeftWidth: 3,
    borderLeftColor: '#5AC8FA',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  expression: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
    fontFamily: 'Courier New',
    fontWeight: '500',
  },
  result: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
});
