import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Display({ value }) {
  return (
    <View style={styles.container}>
      <Text style={styles.display}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 20,
  },
  display: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#333',
  },
});
