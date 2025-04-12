import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ReviewAnswers = ({ route, navigation }) => {
  const { answers = [] } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review Answers</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {answers.map((item, index) => (
          <View key={index} style={styles.questionCard}>
            <Text style={styles.questionNumber}>Question {index + 1}</Text>
            <Text style={styles.questionText}>{item.question}</Text>
            
            <View style={styles.answerDetails}>
              <View style={styles.answerRow}>
                <Text style={styles.answerLabel}>Your answer:</Text>
                <View style={{flex: 1}}>
                  <Text style={[
                    styles.answerValue, 
                    {color: item.isCorrect ? '#4CAF50' : '#F44336'}
                  ]}>
                    {item.userAnswer}: {item.userAnswerText || ''}
                  </Text>
                </View>
              </View>
              
              {!item.isCorrect && (
                <View style={styles.answerRow}>
                  <Text style={styles.answerLabel}>Correct answer:</Text>
                  <View style={{flex: 1}}>
                    <Text style={[styles.answerValue, {color: '#4CAF50'}]}>
                      {item.correctAnswer}: {item.correctAnswerText || ''}
                    </Text>
                  </View>
                </View>
              )}
            </View>
            
            <View style={[
              styles.resultBadge,
              {backgroundColor: item.isCorrect ? '#E8F5E9' : '#FFEBEE'}
            ]}>
              <Ionicons 
                name={item.isCorrect ? "checkmark-circle" : "close-circle"} 
                size={16} 
                color={item.isCorrect ? '#4CAF50' : '#F44336'} 
              />
              <Text style={[
                styles.resultText,
                {color: item.isCorrect ? '#4CAF50' : '#F44336'}
              ]}>
                {item.isCorrect ? 'Correct' : 'Incorrect'}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 16,
  },
  questionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  questionNumber: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
  },
  answerDetails: {
    marginBottom: 12,
  },
  answerRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  answerLabel: {
    fontSize: 14,
    color: '#616161',
    marginRight: 8,
    width: 100,
  },
  answerValue: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  resultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  resultText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
});

export default ReviewAnswers;