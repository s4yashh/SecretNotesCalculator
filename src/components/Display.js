import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Display({ value }) {
  return (
    <View style={styles.container}>
      <Text style={styles.display} numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#000',
    borderRadius: 12,
    marginVertical: 12,
    minHeight: 80,
    justifyContent: 'center',
  },
  display: {
    fontSize: 48,
    fontWeight: '300',
    textAlign: 'right',
    color: '#fff',
  },
});
