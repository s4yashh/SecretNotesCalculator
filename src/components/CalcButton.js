import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CalcButton({ label, onPress, style }) {
  return (
    <TouchableOpacity 
      style={[styles.button, style]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 16,
    marginHorizontal: 4,
    backgroundColor: '#E5E5EA',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 60,
  },
  text: {
    color: '#000',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
});
