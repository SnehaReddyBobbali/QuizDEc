import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DeepLearningScreen = ({ navigation }) => {
  // Deep Learning quizzes data
  const deepLearningQuizzes = [
    {
      id: '1',
      title: 'Neural Networks',
      description: 'Fundamentals of neural networks and backpropagation',
      questions: 15,
      time: '12 min',
      difficulty: 'Medium',
      icon: require('../assets/icons/neural.png'),
      color: '#FF6B81' // Pink color
    },
    {
      id: '2',
      title: 'CNNs & Computer Vision',
      description: 'Convolutional neural networks and image processing',
      questions: 12,
      time: '10 min',
      difficulty: 'Hard',
      icon: require('../assets/icons/vision.png'),
      color: '#9575CD' // Purple color
    },
    {
      id: '3',
      title: 'RNNs & NLP',
      description: 'Recurrent networks and natural language processing',
      questions: 10,
      time: '8 min',
      difficulty: 'Hard',
      icon: require('../assets/icons/nlp.png'),
      color: '#64B5F6' // Blue color
    },
    {
      id: '4',
      title: 'Generative AI',
      description: 'GANs, diffusion models, and creative AI applications',
      questions: 8,
      time: '7 min',
      difficulty: 'Medium',
      icon: require('../assets/icons/generative.png'),
      color: '#81C784' // Green color
    },
    {
      id: '5',
      title: 'Reinforcement Learning',
      description: 'Training models through rewards and environments',
      questions: 10,
      time: '9 min',
      difficulty: 'Hard',
      icon: require('../assets/icons/reinforcement.png'),
      color: '#FFB74D' // Orange color
    },
    {
      id: '6',
      title: 'Deep Learning Frameworks',
      description: 'TensorFlow, PyTorch and other popular tools',
      questions: 12,
      time: '10 min',
      difficulty: 'Medium',
      icon: require('../assets/icons/frameworks.png'),
      color: '#F06292' // Pink-Red color
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
      <Text style={styles.headerTitle}>Deep Learning Quizzes</Text>
      <Text style={styles.subTitle}>Master neural networks, computer vision, NLP and more</Text>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.quizGrid}>
          {deepLearningQuizzes.map(quiz => renderQuizItem(quiz))}
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

export default DeepLearningScreen;