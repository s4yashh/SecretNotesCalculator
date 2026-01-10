import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CalcButton({ label, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
    margin: 5,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
