import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ActionButtons() {
  return (
    <View style={styles.actionButtons}>
      <TouchableOpacity style={styles.inviteButton}>
        <Text style={styles.inviteButtonText}>Invite</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.startQuizButton}>
        <Text style={styles.startQuizButtonText}>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  actionButtons: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
  },
  inviteButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0288D1',
  },
  inviteButtonText: {
    color: '#0288D1',
    fontWeight: 'bold',
  },
  startQuizButton: {
    flex: 1,
    backgroundColor: '#0288D1',
    paddingVertical: 12,
    borderRadius: 25,
    marginLeft: 10,
    alignItems: 'center',
  },
  startQuizButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
