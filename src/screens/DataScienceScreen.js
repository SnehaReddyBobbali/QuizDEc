import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';

const DataScienceScreen = ({ navigation }) => {
  // Sample data for data science quizzes
  const dataScienceQuizzes = [
    {
      id: '1',
      title: 'Statistics Fundamentals',
      description: 'Test your knowledge of probability and statistical methods',
      questions: 12,
      time: '10 min',
      difficulty: 'Medium',
      icon: require('../assets/icons/statistics.png'),
      color: '#3F51B5' // Indigo color
    },
    {
      id: '2',
      title: 'Machine Learning',
      description: 'Challenge yourself on ML algorithms and applications',
      questions: 15,
      time: '12 min',
      difficulty: 'Hard',
      icon: require('../assets/icons/machine-learning.png'),
      color: '#00BCD4' // Cyan color
    },
    {
      id: '3',
      title: 'Data Visualization',
      description: 'From basic charts to interactive dashboards',
      questions: 10,
      time: '8 min',
      difficulty: 'Easy',
      icon: require('../assets/icons/visualization.png'),
      color: '#8BC34A' // Light Green color
    },
    {
      id: '4',
      title: 'Big Data Technologies',
      description: 'Hadoop, Spark, and other big data frameworks',
      questions: 12,
      time: '11 min',
      difficulty: 'Hard',
      icon: require('../assets/icons/big-data.png'),
      color: '#FF5252' // Red Accent color
    },
    {
      id: '5',
      title: 'Python for Data Science',
      description: 'Test your knowledge of NumPy, Pandas, and scikit-learn',
      questions: 14,
      time: '12 min',
      difficulty: 'Medium',
      icon: require('../assets/icons/python.png'),
      color: '#009688' // Teal color
    },
    {
      id: '6',
      title: 'Data Preprocessing',
      description: 'Cleaning, transformation, and feature engineering',
      questions: 10,
      time: '9 min',
      difficulty: 'Medium',
      icon: require('../assets/icons/preprocessing.png'),
      color: '#673AB7' // Deep Purple color
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
      <Text style={styles.headerTitle}>Data Science</Text>
      <Text style={styles.subTitle}>Test your knowledge about data analysis and machine learning</Text>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.quizGrid}>
          {dataScienceQuizzes.map(quiz => renderQuizItem(quiz))}
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

export default DataScienceScreen;