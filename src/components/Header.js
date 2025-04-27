import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.appTitle}>QuizDeck</Text>
      <Text style={styles.appSlogan}>Quiz Smarter, Learn Better</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0288D1',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  appSlogan: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 5,
  },
  stats: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 10,
  },
});
