import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';

const MathematicsQuizzesScreen = ({ navigation }) => {
  // Sample data for mathematics quizzes
  const mathQuizzes = [
    {
      id: '1',
      title: 'Algebra',
      description: 'Equations, polynomials and functions',
      questions: 12,
      time: '15 min',
      difficulty: 'Medium',
      icon: require('../assets/icons/algebra.png'),
      color: '#FF7F50' // Coral color
    },
    {
      id: '2',
      title: 'Geometry',
      description: 'Shapes, angles and spatial reasoning',
      questions: 10,
      time: '12 min',
      difficulty: 'Medium',
      icon: require('../assets/icons/geometry.png'),
      color: '#DA70D6' // Orchid color
    },
    {
      id: '3',
      title: 'Calculus',
      description: 'Derivatives, integrals and limits',
      questions: 8,
      time: '10 min',
      difficulty: 'Hard',
      icon: require('../assets/icons/calculus.png'),
      color: '#20B2AA' // LightSeaGreen color
    },
    {
      id: '4',
      title: 'Statistics',
      description: 'Probability, data analysis and interpretation',
      questions: 15,
      time: '14 min',
      difficulty: 'Medium',
      icon: require('../assets/icons/statistics.png'),
      color: '#4682B4' // SteelBlue color
    },
    {
      id: '5',
      title: 'Number Theory',
      description: 'Prime numbers, factors and patterns',
      questions: 10,
      time: '8 min',
      difficulty: 'Hard',
      icon: require('../assets/icons/number.png'),
      color: '#CD5C5C' // IndianRed color
    },
    {
      id: '6',
      title: 'Basic Mathematics',
      description: 'Fundamentals of arithmetic and operations',
      questions: 15,
      time: '10 min',
      difficulty: 'Easy',
      icon: require('../assets/icons/basic.png'),
      color: '#32CD32' // LimeGreen color
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
      <Text style={styles.headerTitle}>Mathematics Quizzes</Text>
      <Text style={styles.subTitle}>Sharpen your mind with numerical and logical challenges</Text>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.quizGrid}>
          {mathQuizzes.map(quiz => renderQuizItem(quiz))}
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

export default MathematicsQuizzesScreen;