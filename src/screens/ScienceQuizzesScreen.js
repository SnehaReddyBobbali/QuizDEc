import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo
// If not using Expo, you'd need to install: npm install --save react-native-vector-icons
// And then import: import Ionicons from 'react-native-vector-icons/Ionicons';

const ScienceQuizzesScreen = ({ navigation }) => {
  // Sample data for science quizzes with Ionicons names
  const scienceQuizzes = [
    {
      id: '1',
      title: 'Human Biology',
      description: 'Explore the systems of the human body',
      questions: 15,
      time: '12 min',
      difficulty: 'Medium',
      icon: 'body-outline',
      color: '#2E8B57' // SeaGreen color
    },
    {
      id: '2',
      title: 'Chemistry Basics',
      description: 'Elements, compounds and chemical reactions',
      questions: 12,
      time: '10 min',
      difficulty: 'Hard',
      icon: 'flask-outline',
      color: '#6A5ACD' // SlateBlue color
    },
    {
      id: '3',
      title: 'Physics Laws',
      description: 'Newton, Einstein and quantum mechanics',
      questions: 10,
      time: '8 min',
      difficulty: 'Hard',
      icon: 'magnet-outline',
      color: '#4169E1' // RoyalBlue color
    },
    {
      id: '4',
      title: 'Astronomy',
      description: 'Stars, planets and the universe',
      questions: 8,
      time: '7 min',
      difficulty: 'Medium',
      icon: 'planet-outline',
      color: '#191970' // MidnightBlue color
    },
    {
      id: '5',
      title: 'Environmental Science',
      description: 'Ecosystems, climate change and conservation',
      questions: 10,
      time: '9 min',
      difficulty: 'Easy',
      icon: 'leaf-outline',
      color: '#3CB371' // MediumSeaGreen color
    },
    {
      id: '6',
      title: 'Genetics',
      description: 'DNA, inheritance and genetic engineering',
      questions: 12,
      time: '10 min',
      difficulty: 'Hard',
      icon: 'git-branch-outline',
      color: '#8A2BE2' // BlueViolet color
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
          <Ionicons name={quiz.icon} size={36} color="#FFFFFF" style={styles.quizIcon} />
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
      <Text style={styles.headerTitle}>Science Quizzes</Text>
      <Text style={styles.subTitle}>Challenge yourself with fascinating scientific concepts</Text>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.quizGrid}>
          {scienceQuizzes.map(quiz => renderQuizItem(quiz))}
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

export default ScienceQuizzesScreen;