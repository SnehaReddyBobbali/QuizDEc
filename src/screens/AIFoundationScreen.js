import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AIFoundationScreen = ({ navigation }) => {
  // AI Foundation quizzes data
  const aiFoundationQuizzes = [
    {
      id: '1',
      title: 'AI History & Concepts',
      description: 'Origins of AI and fundamental concepts',
      questions: 10,
      time: '8 min',
      difficulty: 'Easy',
      icon: require('../assets/icons/ai-history.png'),
      color: '#3F51B5' // Indigo color
    },
    {
      id: '2',
      title: 'Search Algorithms',
      description: 'BFS, DFS, A* and other search methods',
      questions: 12,
      time: '10 min',
      difficulty: 'Medium',
      icon: require('../assets/icons/search.png'),
      color: '#009688' // Teal color
    },
    {
      id: '3',
      title: 'Knowledge Representation',
      description: 'Logical reasoning and expert systems',
      questions: 8,
      time: '7 min',
      difficulty: 'Medium',
      icon: require('../assets/icons/knowledge.png'),
      color: '#673AB7' // Deep Purple color
    },
    {
      id: '4',
      title: 'Probabilistic Models',
      description: 'Bayesian networks and uncertainty reasoning',
      questions: 12,
      time: '10 min',
      difficulty: 'Hard',
      icon: require('../assets/icons/probability.png'),
      color: '#E91E63' // Pink color
    },
    {
      id: '5',
      title: 'AI Ethics & Society',
      description: 'Ethical considerations and social impacts of AI',
      questions: 10,
      time: '8 min',
      difficulty: 'Medium',
      icon: require('../assets/icons/ethics.png'),
      color: '#8BC34A' // Light Green color
    },
    {
      id: '6',
      title: 'Modern AI Paradigms',
      description: 'From symbolic AI to machine learning approaches',
      questions: 15,
      time: '12 min',
      difficulty: 'Hard',
      icon: require('../assets/icons/modern-ai.png'),
      color: '#FF5722' // Deep Orange color
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
      <Text style={styles.headerTitle}>AI Foundations</Text>
      <Text style={styles.subTitle}>Learn the core principles and foundations of artificial intelligence</Text>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.quizGrid}>
          {aiFoundationQuizzes.map(quiz => renderQuizItem(quiz))}
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

export default AIFoundationScreen;