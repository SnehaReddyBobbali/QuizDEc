import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MLFundamentalsScreen = ({ navigation }) => {
  // ML Fundamentals quizzes data
  const mlFundamentalsQuizzes = [
    {
      id: '1',
      title: 'Supervised Learning',
      description: 'Classification, regression, and evaluation metrics',
      questions: 12,
      time: '10 min',
      difficulty: 'Medium',
      icon: require('../assets/icons/supervised.png'),
      color: '#2196F3' // Blue color
    },
    {
      id: '2',
      title: 'Unsupervised Learning',
      description: 'Clustering, dimensionality reduction, and anomaly detection',
      questions: 10,
      time: '8 min',
      difficulty: 'Medium',
      icon: require('../assets/icons/unsupervised.png'),
      color: '#9C27B0' // Purple color
    },
    {
      id: '3',
      title: 'ML Algorithms',
      description: 'Decision trees, SVMs, and ensemble methods',
      questions: 15,
      time: '12 min',
      difficulty: 'Hard',
      icon: require('../assets/icons/algorithms.png'),
      color: '#FF9800' // Orange color
    },
    {
      id: '4',
      title: 'Feature Engineering',
      description: 'Selection, extraction, and transformation techniques',
      questions: 8,
      time: '7 min',
      difficulty: 'Medium',
      icon: require('../assets/icons/feature.png'),
      color: '#4CAF50' // Green color
    },
    {
      id: '5',
      title: 'Model Evaluation',
      description: 'Metrics, validation, and hyperparameter tuning',
      questions: 10,
      time: '8 min',
      difficulty: 'Medium',
      icon: require('../assets/icons/evaluation.png'),
      color: '#F44336' // Red color
    },
    {
      id: '6',
      title: 'ML Pipelines',
      description: 'End-to-end workflows and deployment concepts',
      questions: 12,
      time: '10 min',
      difficulty: 'Hard',
      icon: require('../assets/icons/pipeline.png'),
      color: '#00BCD4' // Cyan color
    },
  ];

  const renderQuizItem = (quiz) => {
    return (
      <TouchableOpacity 
        key={quiz.id}
        style={[styles.quizItem, { backgroundColor: quiz.color }]}
        onPress={() => navigation.navigate('QuizDetails', { quiz })}
      >
        <View style={styles.quizContent}>
          <Image source={quiz.icon} style={styles.quizIcon} />
          <Text style={styles.quizTitle}>{quiz.title}</Text>
          <Text style={styles.quizDescription}>{quiz.description}</Text>
          <View style={styles.quizMeta}>
            <Text style={styles.quizMetaText}>{quiz.questions} questions • {quiz.time}</Text>
            <View style={styles.difficultyBadge}>
              <Text style={styles.difficultyText}>{quiz.difficulty}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>ML Fundamentals</Text>
      <Text style={styles.subTitle}>Master the core concepts and techniques of machine learning</Text>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.quizGrid}>
          {mlFundamentalsQuizzes.map(quiz => renderQuizItem(quiz))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  quizGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quizItem: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quizContent: {
    height: 180,
    justifyContent: 'space-between',
  },
  quizIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  quizDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 8,
  },
  quizMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quizMetaText: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  difficultyBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default MLFundamentalsScreen;