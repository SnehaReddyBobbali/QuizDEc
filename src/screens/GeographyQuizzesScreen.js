import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GeographyQuizzesScreen = ({ navigation }) => {
  // Sample data for geography quizzes
  const geographyQuizzes = [
    {
      id: '1',
      title: 'World Capitals',
      description: 'Test your knowledge of capital cities around the globe',
      questions: 15,
      time: '12 min',
      difficulty: 'Medium',
      icon: require('../assets/icons/capitals.png'), // You'll need to create these icons
      color: '#3498DB' // Bright blue
    },
    {
      id: '2',
      title: 'Natural Wonders',
      description: 'Explore amazing landmarks and natural formations',
      questions: 10,
      time: '8 min',
      difficulty: 'Easy',
      icon: require('../assets/icons/landmarks.png'),
      color: '#27AE60' // Green
    },
    {
      id: '3',
      title: 'Mountain Ranges',
      description: 'From the Himalayas to the Andes and beyond',
      questions: 12,
      time: '10 min',
      difficulty: 'Hard',
      icon: require('../assets/icons/mountains.png'),
      color: '#8E44AD' // Purple
    },
    {
      id: '4',
      title: 'Oceans & Seas',
      description: 'Navigate the waters of our planet',
      questions: 8,
      time: '7 min',
      difficulty: 'Medium',
      icon: require('../assets/icons/oceans.png'),
      color: '#2980B9' // Dark blue
    },
    {
      id: '5',
      title: 'Countries of the World',
      description: 'Borders, flags, and national facts',
      questions: 20,
      time: '15 min',
      difficulty: 'Hard',
      icon: require('../assets/icons/countries.png'),
      color: '#E74C3C' // Red
    },
    {
      id: '6',
      title: 'Climate Zones',
      description: 'Ecosystems and weather patterns around the world',
      questions: 10,
      time: '9 min',
      difficulty: 'Medium',
      icon: require('../assets/icons/climate.png'),
      color: '#F39C12' // Orange
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

  // Alternative implementation using Ionicons if you prefer
  const renderQuizItemWithIonicons = (quiz) => {
    return (
      <TouchableOpacity 
        key={quiz.id}
        style={[styles.quizItem, { backgroundColor: quiz.color }]}
        onPress={() => navigation.navigate('QuizDetails', { quiz })}
      >
        <View style={styles.quizContent}>
          <Ionicons 
            name={
              quiz.title === 'World Capitals' ? 'location-outline' :
              quiz.title === 'Natural Wonders' ? 'earth-outline' :
              quiz.title === 'Mountain Ranges' ? 'triangle-outline' :
              quiz.title === 'Oceans & Seas' ? 'water-outline' :
              quiz.title === 'Countries of the World' ? 'flag-outline' :
              'thermometer-outline' // Climate Zones
            } 
            size={40} 
            color="#FFFFFF" 
            style={styles.quizIconIon} 
          />
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
      <Text style={styles.headerTitle}>Geography Quizzes</Text>
      <Text style={styles.subTitle}>Explore the world's regions, landforms, and countries</Text>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.quizGrid}>
          {geographyQuizzes.map(quiz => renderQuizItem(quiz))}
          {/* Alternatively use: {geographyQuizzes.map(quiz => renderQuizItemWithIonicons(quiz))} */}
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
  quizIconIon: {
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

export default GeographyQuizzesScreen;