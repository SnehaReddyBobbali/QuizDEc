import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FeaturedQuizzes = () => {
  const navigation = useNavigation();
  
  const featuredQuizzes = [
    {
      id: 1,
      title: 'Science Quiz',
      description: 'Test your knowledge about planets, chemistry, and biology',
      questions: 10,
      time: '5 min',
      color: '#4CAF50',
      icon: '🧪'
    },
    {
      id: 2,
      title: 'Math Quiz',
      description: 'Challenge yourself with algebra and geometry problems',
      questions: 8,
      time: '4 min',
      color: '#2196F3',
      icon: '🔢'
    },
    {
      id: 3,
      title: 'History Quiz',
      description: 'Explore world history with these challenging questions',
      questions: 12,
      time: '6 min',
      color: '#FF9800',
      icon: '📜'
    }
  ];

  const handleQuizPress = (quiz) => {
    if (quiz.title === 'Science Quiz') {
      navigation.navigate('QuizScreen', { quizType: 'Science' });
    } else {
      // For future implementation
      alert(`${quiz.title} coming soon!`);
    }
  };

  return (
    <ScrollView 
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {featuredQuizzes.map((quiz) => (
        <TouchableOpacity 
          key={quiz.id} 
          style={[styles.quizCard, { borderLeftColor: quiz.color }]}
          onPress={() => handleQuizPress(quiz)}
        >
          <View style={styles.quizContent}>
            <Text style={styles.quizIcon}>{quiz.icon}</Text>
            <Text style={styles.quizTitle}>{quiz.title}</Text>
            <Text style={styles.quizDescription}>{quiz.description}</Text>
            <View style={styles.quizMeta}>
              <Text style={styles.quizMetaText}>{quiz.questions} questions</Text>
              <Text style={styles.quizMetaText}>•</Text>
              <Text style={styles.quizMetaText}>{quiz.time}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  quizCard: {
    width: 250,
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: 15,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  quizContent: {
    padding: 15,
  },
  quizIcon: {
    fontSize: 28,
    marginBottom: 10,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  quizDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  quizMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quizMetaText: {
    fontSize: 12,
    color: '#888',
    marginRight: 5,
  },
});

export default FeaturedQuizzes;