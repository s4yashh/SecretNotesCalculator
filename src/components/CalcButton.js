import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CalcButton({ label, onPress, style }) {
  return (
    <TouchableOpacity 
      style={[styles.button, style]} 
      onPress={onPress}
      activeOpacity={0.6}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 2,
    marginVertical: 2,
    backgroundColor: '#E5E5EA',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 55,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  text: {
    color: '#000',
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
});
