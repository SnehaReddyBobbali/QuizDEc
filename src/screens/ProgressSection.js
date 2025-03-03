import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProgressSection() {
  return (
    <View style={styles.progressSection}>
      <Text style={styles.sectionTitle}>Your Progress</Text>
      <View style={styles.progressStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>24</Text>
          <Text style={styles.statLabel}>QUIZZES</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>86%</Text>
          <Text style={styles.statLabel}>ACCURACY</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>#42</Text>
          <Text style={styles.statLabel}>RANK</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressSection: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
});
