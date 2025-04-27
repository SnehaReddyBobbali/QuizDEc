// QuizScreen.js - Main screen showing available quizzes
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Icons for categories (you can replace with your actual icons)
const categoryIcons = {
  Science: require('../assets/icons/science.png'),
  Mathematics: require('../assets/icons/math.png'),
  History: require('../assets/icons/history.png'),
  Geography: require('../assets/icons/geography.png'),
  Literature: require('../assets/icons/literature.png'),
  Arts: require('../assets/icons/arts.png'),
};

const QuizUserScreen = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [userQuizzes, setUserQuizzes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch predefined quizzes
    fetchQuizzes();
    // Fetch user created quizzes
    fetchUserQuizzes();
  }, []);

  const fetchQuizzes = () => {
    // Mock data - replace with your actual API call
    const mockQuizzes = [
      {
        id: '1',
        title: 'Science Quiz',
        description: 'Test your knowledge about planets, chemistry, and biology',
        category: 'Science',
        questions: 10,
        timeLimit: 5, // minutes
      },
      {
        id: '2',
        title: 'Math Challenge',
        description: 'Challenge yourself with algebra and geometry problems',
        category: 'Mathematics',
        questions: 8,
        timeLimit: 10,
      },
    ];
    setQuizzes(mockQuizzes);
  };

  const fetchUserQuizzes = () => {
    // Mock data - replace with your actual storage retrieval logic
    const mockUserQuizzes = [];
    setUserQuizzes(mockUserQuizzes);
  };

  const handleCreateQuiz = () => {
    navigation.navigate('CreateQuiz');
  };

  const handleTakeQuiz = (quiz) => {
    navigation.navigate('TakeQuiz', { quiz });
  };

  const renderQuizItem = ({ item }) => (
    <TouchableOpacity
      style={styles.quizCard}
      onPress={() => handleTakeQuiz(item)}
    >
      <View style={styles.quizContent}>
        {item.category && categoryIcons[item.category] && (
          <Image source={categoryIcons[item.category]} style={styles.categoryIcon} />
        )}
        <View style={styles.quizInfo}>
          <Text style={styles.quizTitle}>{item.title}</Text>
          <Text style={styles.quizDescription}>{item.description}</Text>
          <Text style={styles.quizMeta}>
            {item.questions} questions • {item.timeLimit} min
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => navigation.navigate('CategoryQuizzes', { category: item.name })}
    >
      <Image source={categoryIcons[item.name]} style={styles.categoryIcon} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Featured Quizzes</Text>
      <FlatList
        data={quizzes}
        renderItem={renderQuizItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.featuredList}
      />

      <Text style={styles.sectionTitle}>My Quizzes</Text>
      {userQuizzes.length > 0 ? (
        <FlatList
          data={userQuizzes}
          renderItem={renderQuizItem}
          keyExtractor={item => item.id}
          style={styles.myQuizzesList}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>You haven't created any quizzes yet</Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateQuiz}
          >
            <Text style={styles.createButtonText}>Create Your First Quiz</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        data={[
          { id: '1', name: 'Science' },
          { id: '2', name: 'Mathematics' },
          { id: '3', name: 'History' },
          { id: '4', name: 'Geography' },
          { id: '5', name: 'Literature' },
          { id: '6', name: 'Arts' },
        ]}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.categoryGrid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  featuredList: {
    height: 150,
  },
  quizCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quizContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quizInfo: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  quizDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  quizMeta: {
    fontSize: 12,
    color: '#888',
  },
  emptyState: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 16,
  },
  createButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  categoryGrid: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QuizUserScreen;