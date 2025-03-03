import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ResultScreen = ({ route }) => {
  const navigation = useNavigation();
  const { score, total, timeTaken, answers, quizType } = route.params;
  
  const percentage = Math.round((score / total) * 100);
  
  const handleRetryQuiz = () => {
    navigation.navigate('QuizScreen', { quizType });
  };
  
  const handleShareResults = () => {
    // Implement share functionality
    console.log('Sharing results...');
  };
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.resultContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>QuizDeck</Text>
        </View>
        
        <ScrollView contentContainerStyle={styles.resultContent}>
          <Text style={styles.completeText}>Quiz Complete!</Text>
          
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreText}>{percentage}%</Text>
          </View>
          
          <View style={styles.statisticsContainer}>
            <Text style={styles.statisticsHeader}>Statistics</Text>
            <View style={styles.statisticsRow}>
              <Text style={styles.statisticsLabel}>Correct Answers:</Text>
              <Text style={styles.statisticsValue}>{score}/{total}</Text>
            </View>
            <View style={styles.statisticsRow}>
              <Text style={styles.statisticsLabel}>Time Taken:</Text>
              <Text style={styles.statisticsValue}>{formatTime(timeTaken)}</Text>
            </View>
            <View style={styles.statisticsRow}>
              <Text style={styles.statisticsLabel}>New Rank:</Text>
              <Text style={styles.statisticsValue}>{getRank(percentage)}</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.reviewButton}
            onPress={() => console.log('Review answers...')}
          >
            <Text style={styles.reviewButtonText}>Review Answers</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={handleRetryQuiz}
          >
            <Text style={styles.retryButtonText}>Retry Quiz</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={handleShareResults}
          >
            <Text style={styles.shareButtonText}>Share Results</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

// Function to determine rank based on score percentage
const getRank = (percentage) => {
  if (percentage >= 90) return 'Expert';
  if (percentage >= 75) return 'Advanced';
  if (percentage >= 60) return 'Intermediate';
  if (percentage >= 40) return 'Beginner';
  return 'Novice';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  resultContainer: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    backgroundColor: '#0099FF',
    padding: 15,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContent: {
    padding: 20,
    alignItems: 'center',
  },
  completeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  scoreText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statisticsContainer: {
    width: '100%',
    marginBottom: 25,
  },
  statisticsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
  },
  statisticsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statisticsLabel: {
    color: '#555',
  },
  statisticsValue: {
    fontWeight: '500',
    color: '#333',
  },
  reviewButton: {
    width: '100%',
    backgroundColor: '#0099FF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  retryButton: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  retryButtonText: {
    color: '#555',
    fontWeight: '500',
    fontSize: 16,
  },
  shareButton: {
    width: '100%',
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  shareButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default ResultScreen;