import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Display({ value }) {
  const displayValue = value === '0' ? '0' : value;
  const isError = value === 'Error';

  return (
    <View style={[styles.container, isError && styles.errorContainer]}>
      <Text 
        style={[styles.display, isError && styles.errorDisplay]} 
        numberOfLines={2} 
        adjustsFontSizeToFit
      >
        {displayValue}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginVertical: 10,
    minHeight: 90,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  errorContainer: {
    backgroundColor: '#2a1a1a',
  },
  display: {
    fontSize: 44,
    fontWeight: '300',
    textAlign: 'right',
    color: '#fff',
    letterSpacing: 0.5,
  },
  errorDisplay: {
    color: '#FF6B6B',
    fontSize: 28,
  },
});
