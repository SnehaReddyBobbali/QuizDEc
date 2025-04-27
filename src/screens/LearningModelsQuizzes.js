import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';

const LearningModelsScreen = ({ navigation }) => {
  // Sample data for learning models quizzes
  const learningModelsQuizzes = [
    {
      id: '1',
      title: 'Cognitive Theory',
      description: 'Explore how we process and retain information',
      questions: 10,
      time: '8 min',
      difficulty: 'Medium',
      icon: require('../assets/icons/cognitive.png'),
      color: '#4CAF50' // Green color
    },
    {
      id: '2',
      title: 'Behaviorism',
      description: 'Test your knowledge on conditioning and behavior patterns',
      questions: 12,
      time: '10 min',
      difficulty: 'Hard',
      icon: require('../assets/icons/behaviorism.png'),
      color: '#FF5722' // Deep Orange color
    },
    {
      id: '3',
      title: 'Constructivism',
      description: 'Learn about building knowledge through experiences',
      questions: 8,
      time: '7 min',
      difficulty: 'Easy',
      icon: require('../assets/icons/constructivism.png'),
      color: '#2196F3' // Blue color
    },
    {
      id: '4',
      title: 'Multiple Intelligences',
      description: 'Discover Gardner\'s theory of different learning styles',
      questions: 15,
      time: '12 min',
      difficulty: 'Medium',
      icon: require('../assets/icons/intelligence.png'),
      color: '#9C27B0' // Purple color
    },
    {
      id: '5',
      title: 'Social Learning',
      description: 'Explore how we learn through observation and imitation',
      questions: 10,
      time: '9 min',
      difficulty: 'Medium',
      icon: require('../assets/icons/social.png'),
      color: '#FF9800' // Orange color
    },
    {
      id: '6',
      title: 'Experiential Learning',
      description: 'Test your knowledge on Kolb\'s learning cycle',
      questions: 12,
      time: '11 min',
      difficulty: 'Hard',
      icon: require('../assets/icons/experiential.png'),
      color: '#607D8B' // Blue Gray color
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
      <Text style={styles.headerTitle}>Learning Models</Text>
      <Text style={styles.subTitle}>Test your knowledge about educational theories and learning styles</Text>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.quizGrid}>
          {learningModelsQuizzes.map(quiz => renderQuizItem(quiz))}
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

export default LearningModelsScreen;