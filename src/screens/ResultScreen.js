import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Share, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ResultScreen = ({ route, navigation }) => {
  const { score, total, timeTaken, answers, quizType } = route.params;
  const percentage = Math.round((score / total) * 100);
  
  // Format time taken (seconds) to mm:ss format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Determine the color based on score percentage
  const getScoreColor = () => {
    if (percentage >= 80) return "#4CAF50"; // Green
    if (percentage >= 60) return "#8BC34A"; // Light green
    if (percentage >= 40) return "#FFC107"; // Amber
    return "#F44336"; // Red
  };

  const getMedalImage = () => {
    if (percentage >= 90) return "🏆";
    if (percentage >= 70) return "🥈";
    if (percentage >= 50) return "🥉";
    return "🎯";
  };

  // Mock rank for demonstration purposes
  const rank = 38;

  // Share results function
  const shareResults = async () => {
    try {
      const message = 
      `${getMedalImage()} QuizDeck Results ${getMedalImage()}\n\n` +
      `Quiz: ${quizType}\n` +
      `Score: ${percentage}% (${score}/${total})\n` +
      `Time: ${formatTime(timeTaken)}\n` +
      `Rank: #${rank}\n\n` +
      `Think you can beat me? Try QuizDeck now!`;

      await Share.share({
        message,
        title: 'My Quiz Results'
      });
    } catch (error) {
      console.error('Error sharing results:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>QuizDeck</Text>
        </View>
        
        <Text style={styles.title}>Quiz Complete!</Text>
        
        <View style={styles.scoreCircle}>
          <View style={[styles.circleOutline, { borderColor: getScoreColor() }]}>
            <Text style={[styles.scorePercentage, { color: getScoreColor() }]}>
              {percentage}%
            </Text>
          </View>
        </View>
        
        <Text style={styles.statsTitle}>Statistics</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Correct Answers:</Text>
            <Text style={styles.statValue}>{score}/{total}</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Time Taken:</Text>
            <Text style={styles.statValue}>{formatTime(timeTaken)}</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>New Rank:</Text>
            <Text style={styles.statValue}>#{rank}</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.reviewButton}
          onPress={() => navigation.navigate('ReviewAnswers', { answers })}
        >
          <Text style={styles.buttonText}>Review Answers</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => navigation.navigate('QuizScreen', { quizType })}
        >
          <Text style={styles.retryButtonText}>Retry Quiz</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={shareResults}
        >
          <Ionicons name="share-social" size={18} color="white" style={styles.shareIcon} />
          <Text style={styles.shareButtonText}>Share Results</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 16,
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  scoreCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  circleOutline: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scorePercentage: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 8,
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  reviewButton: {
    backgroundColor: '#2196F3',
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
  },
  shareButton: {
    backgroundColor: '#4CAF50',
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  retryButtonText: {
    color: '#333',  // Changed to dark color for better visibility
    fontSize: 16,
    fontWeight: '500',
  },
  shareButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  shareIcon: {
    marginRight: 8,
  }
});

export default ResultScreen;