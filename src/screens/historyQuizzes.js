import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';

const HistoryQuizzesScreen = ({ navigation }) => {
  // Sample data for history quizzes
  const historyQuizzes = [
    {
      id: '1',
      title: 'Ancient Civilizations',
      description: 'Test your knowledge about Egypt, Greece, and Rome',
      questions: 12,
      time: '10 min',
      difficulty: 'Medium',
      icon: require('../assets/icons/ancient.png'),
      color: '#FFD700' // Gold color
    },
    {
      id: '2',
      title: 'World Wars',
      description: 'Challenge yourself on WWI and WWII facts',
      questions: 15,
      time: '12 min',
      difficulty: 'Hard',
      icon: require('../assets/icons/wars.png'),
      color: '#B22222' // FireBrick color
    },
    {
      id: '3',
      title: 'American History',
      description: 'From colonial times to modern America',
      questions: 10,
      time: '8 min',
      difficulty: 'Easy',
      icon: require('../assets/icons/america.png'),
      color: '#4682B4' // SteelBlue color
    },
    {
      id: '4',
      title: 'Renaissance',
      description: 'Art, culture and innovation in Europe',
      questions: 8,
      time: '7 min',
      difficulty: 'Medium',
      icon: require('../assets/icons/renaissance.png'),
      color: '#9370DB' // MediumPurple color
    },
    {
      id: '5',
      title: 'Industrial Revolution',
      description: 'Inventions and social changes of the 18th-19th centuries',
      questions: 10,
      time: '9 min',
      difficulty: 'Medium',
      icon: require('../assets/icons/industry.png'),
      color: '#708090' // SlateGray color
    },
    {
      id: '6',
      title: 'Cold War Era',
      description: 'Test your knowledge of post-WWII geopolitics',
      questions: 12,
      time: '10 min',
      difficulty: 'Hard',
      icon: require('../assets/icons/coldwar.png'),
      color: '#2F4F4F' // DarkSlateGray color
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
      <Text style={styles.headerTitle}>History Quizzes</Text>
      <Text style={styles.subTitle}>Test your knowledge about historical events and figures</Text>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.quizGrid}>
          {historyQuizzes.map(quiz => renderQuizItem(quiz))}
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

export default HistoryQuizzesScreen;