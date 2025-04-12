import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FeaturedQuizzes = () => {
  const navigation = useNavigation();
  
  const featuredQuizzes = [
    {
      id: 1,
      title: 'Science Snapshots',
      description: 'Test your knowledge about planets, chemistry, and biology',
      questions: 10,
      time: '5 min',
      color: '#4CAF50',
      icon: '🧪',
      type: 'Science'
    },
    {
      id: 2,
      title: 'Math Basics Blitz',
      description: 'Challenge yourself with algebra and geometry problems',
      questions: 8,
      time: '4 min',
      color: '#2196F3',
      icon: '🔢',
      type: 'Maths'
    },
    {
      id: 3,
      title: 'Time Travel Teaser',
      description: 'Explore world history with these challenging questions',
      questions: 12,
      time: '6 min',
      color: '#FF9800',
      icon: '📜',
      type: 'History'
    }
  ];

  const handleQuizPress = (quiz) => {
    navigation.navigate('QuizScreen', { quizType: quiz.type });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={featuredQuizzes}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.quizCard, { borderLeftColor: item.color }]}
            onPress={() => handleQuizPress(item)}
          >
            <View style={styles.quizContent}>
              <Text style={styles.quizIcon}>{item.icon}</Text>
              <Text style={styles.quizTitle}>{item.title}</Text>
              <Text style={styles.quizDescription}>{item.description}</Text>
              <View style={styles.quizMeta}>
                <Text style={styles.quizMetaText}>{item.questions} questions</Text>
                <Text style={styles.quizMetaText}>•</Text>
                <Text style={styles.quizMetaText}>{item.time}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
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
