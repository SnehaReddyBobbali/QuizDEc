import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import getQuizQuestions from './getQuizQuestions';

const QuizDetailsScreen = ({ route, navigation }) => {
  const { quiz } = route.params;
  const questions = getQuizQuestions(quiz.id);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Quiz Banner */}
        <View style={[styles.banner, { backgroundColor: quiz.color }]}>
          <Image source={quiz.icon} style={styles.bannerIcon} />
          <Text style={styles.bannerTitle}>{quiz.title}</Text>
          <Text style={styles.bannerDescription}>{quiz.description}</Text>
        </View>

        {/* Quiz Info */}
        <View style={styles.infoContainer}>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Icon name="help-circle-outline" size={24} color={quiz.color} />
                <Text style={styles.infoLabel}>Questions</Text>
                <Text style={styles.infoValue}>{quiz.questions}</Text>
              </View>
              
              <View style={styles.infoItem}>
                <Icon name="clock-outline" size={24} color={quiz.color} />
                <Text style={styles.infoLabel}>Duration</Text>
                <Text style={styles.infoValue}>{quiz.time}</Text>
              </View>
              
              <View style={styles.infoItem}>
                <Icon name="star-outline" size={24} color={quiz.color} />
                <Text style={styles.infoLabel}>Difficulty</Text>
                <Text style={styles.infoValue}>{quiz.difficulty}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Topics Overview */}
        <View style={styles.topicsContainer}>
          <Text style={styles.sectionTitle}>Topics Covered</Text>
          <View style={styles.topicsList}>
            {/* Generate topics from the questions */}
            {generateTopics(questions).map((topic, index) => (
              <View key={index} style={styles.topicItem}>
                <Icon name="checkbox-marked-circle-outline" size={20} color={quiz.color} />
                <Text style={styles.topicText}>{topic}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quiz Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionTitle}>About this Quiz</Text>
          <Text style={styles.descriptionText}>
            This quiz will test your knowledge on {quiz.title.toLowerCase()}. 
            It contains {quiz.questions} questions and should take about {quiz.time} to complete.
            Try to answer all questions correctly and see how well you do!
          </Text>
        </View>

        {/* Start Quiz Button */}
        <TouchableOpacity 
          style={[styles.startButton, { backgroundColor: quiz.color }]}
          onPress={() => navigation.navigate('QuizScreen', { quiz })}
        >
          <Text style={styles.startButtonText}>Start Quiz</Text>
          <Icon name="arrow-right" size={24} color="#FFF" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// Generate topics from the questions
const generateTopics = (questions) => {
  const topics = new Set();
  
  // Extract key topics from questions
  questions.forEach(question => {
    const words = question.question.split(' ');
    for (const word of words) {
      if (word.length > 5 && !commonWords.includes(word.toLowerCase())) {
        topics.add(capitalizeFirstLetter(word.replace(/[^a-zA-Z ]/g, "")));
      }
    }
    
    // Add topics from options when appropriate
    question.options.forEach(option => {
      if (option.length < 10 && !commonWords.includes(option.toLowerCase())) {
        topics.add(capitalizeFirstLetter(option));
      }
    });
  });
  
  // If we have too many topics, limit them
  return Array.from(topics).slice(0, 5);
};

// Helper function to capitalize first letter
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Common words to exclude from topics
const commonWords = [
  "which", "what", "where", "when", "why", "how", "the", "and", "that", "have", 
  "with", "this", "from", "they", "will", "would", "there", "their", "these"
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  banner: {
    padding: 24,
    alignItems: 'center',
  },
  bannerIcon: {
    width: 60,
    height: 60,
    marginBottom: 16,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  bannerDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
  infoContainer: {
    padding: 16,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  topicsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  topicsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  topicText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  descriptionContainer: {
    padding: 16,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 8,
  },
});

export default QuizDetailsScreen;