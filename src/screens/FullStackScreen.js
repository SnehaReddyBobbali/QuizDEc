import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FullStackScreen = ({ navigation }) => {
  // Full Stack quizzes data
  const fullStackQuizzes = [
    {
      id: '1',
      title: 'Frontend Basics',
      description: 'HTML, CSS, and JavaScript fundamentals',
      questions: 10,
      time: '8 min',
      difficulty: 'Easy',
      icon: require('../assets/icons/frontend.png'),
      color: '#4FC3F7' // Light Blue color
    },
    {
      id: '2',
      title: 'React & React Native',
      description: 'Component-based UI development for web and mobile',
      questions: 12,
      time: '10 min',
      difficulty: 'Medium',
      icon: require('../assets/icons/react.png'),
      color: '#61DAFB' // React Blue color
    },
    {
      id: '3',
      title: 'Backend Development',
      description: 'Node.js, Express, and RESTful APIs',
      questions: 15,
      time: '12 min',
      difficulty: 'Medium',
      icon: require('../assets/icons/backend.png'),
      color: '#4CAF50' // Green color
    },
    {
      id: '4',
      title: 'Databases',
      description: 'SQL, NoSQL, and database architecture',
      questions: 10,
      time: '9 min',
      difficulty: 'Medium',
      icon: require('../assets/icons/database.png'),
      color: '#FFA726' // Orange color
    },
    {
      id: '5',
      title: 'DevOps & CI/CD',
      description: 'Deployment, automation, and container technologies',
      questions: 8,
      time: '7 min',
      difficulty: 'Hard',
      icon: require('../assets/icons/devops.png'),
      color: '#7E57C2' // Purple color
    },
    {
      id: '6',
      title: 'Web Security',
      description: 'Authentication, authorization, and common vulnerabilities',
      questions: 12,
      time: '10 min',
      difficulty: 'Hard',
      icon: require('../assets/icons/security.png'),
      color: '#F44336' // Red color
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
      <Text style={styles.headerTitle}>Full Stack Development</Text>
      <Text style={styles.subTitle}>Test your skills across frontend, backend, and DevOps</Text>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.quizGrid}>
          {fullStackQuizzes.map(quiz => renderQuizItem(quiz))}
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

export default FullStackScreen;