import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const UserQuizzes = ({ navigation: propNavigation }) => {
  const navigation = useNavigation() || propNavigation; // Use the hook or fallback to props
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllQuizzes();
    
    // Add listener to reload quizzes when screen comes into focus
    const unsubscribe = navigation.addListener('focus', () => {
      loadAllQuizzes();
    });

    return unsubscribe;
  }, [navigation]);

  const loadAllQuizzes = async () => {
    try {
      setLoading(true);
      // Load quizzes from both storage keys
      const existingQuizzes = await AsyncStorage.getItem('userQuizzes');
      const createdQuizzes = await AsyncStorage.getItem('userCreatedQuizzes');

      let parsedQuizzes = [];
      
      if (existingQuizzes) {
        parsedQuizzes = parsedQuizzes.concat(JSON.parse(existingQuizzes));
      }
      
      if (createdQuizzes) {
        parsedQuizzes = parsedQuizzes.concat(JSON.parse(createdQuizzes));
      }

      // Sort quizzes by creation date, most recent first
      parsedQuizzes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setAllQuizzes(parsedQuizzes);
      setLoading(false);
    } catch (error) {
      console.error('Error loading quizzes:', error);
      setLoading(false);
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    Alert.alert(
      'Delete Quiz',
      'Are you sure you want to delete this quiz?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              // Try to delete from userQuizzes first
              let existingQuizzes = await AsyncStorage.getItem('userQuizzes');
              let parsedQuizzes = existingQuizzes ? JSON.parse(existingQuizzes) : [];
              
              let updatedQuizzes = parsedQuizzes.filter(quiz => quiz.id !== quizId);
              
              // If not found in userQuizzes, try userCreatedQuizzes
              if (updatedQuizzes.length === parsedQuizzes.length) {
                let createdQuizzes = await AsyncStorage.getItem('userCreatedQuizzes');
                parsedQuizzes = createdQuizzes ? JSON.parse(createdQuizzes) : [];
                
                updatedQuizzes = parsedQuizzes.filter(quiz => quiz.id !== quizId);
                await AsyncStorage.setItem('userCreatedQuizzes', JSON.stringify(updatedQuizzes));
              } else {
                await AsyncStorage.setItem('userQuizzes', JSON.stringify(updatedQuizzes));
              }

              // Reload quizzes
              loadAllQuizzes();
            } catch (error) {
              console.error('Error deleting quiz:', error);
            }
          }
        }
      ]
    );
  };

  handleQuizPress = (quiz) => {
    console.log('Quiz pressed:', quiz.title);
    if (navigation) {
      navigation.navigate('QuizPlayerScreen', { quiz });
    } else {
      console.error('Navigation is not available');
    }
  };

  const renderQuizItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.quizItem}
      onPress={() => handleQuizPress(item)}
    >
      <View style={styles.quizInfo}>
        <Text style={styles.quizTitle}>{item.title}</Text>
        <Text style={styles.quizCategory}>{item.category}</Text>
        <Text style={styles.quizSubtext}>
          {item.questions.length} Questions
        </Text>
      </View>
      <View style={styles.quizActions}>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={(e) => {
            e.stopPropagation(); // Prevent triggering the parent onPress
            handleDeleteQuiz(item.id);
          }}
        >
          <Ionicons name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderHomeScreenVersion = () => {
    // Display only the first 2-3 quizzes in HomeScreen with a "See All" option
    const displayQuizzes = allQuizzes.slice(0, 2);
    
    return (
      <View style={styles.homeContainer}>
        {displayQuizzes.length === 0 ? (
          <TouchableOpacity 
            style={styles.emptyStateContainer}
            onPress={() => navigation.navigate('CreateQuizScreen')}
          >
            <Text style={styles.emptyStateText}>
              You haven't created any quizzes yet
            </Text>
            <View style={styles.createButton}>
              <Ionicons name="add-circle-outline" size={16} color="#0099FF" />
              <Text style={styles.createButtonText}>Create a Quiz</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <>
            {displayQuizzes.map(quiz => (
              <TouchableOpacity 
                key={quiz.id}
                style={styles.quizItem}
                onPress={() => handleQuizPress(quiz)}
              >
                <View style={styles.quizInfo}>
                  <Text style={styles.quizTitle}>{quiz.title}</Text>
                  <Text style={styles.quizCategory}>{quiz.category}</Text>
                  <Text style={styles.quizSubtext}>
                    {quiz.questions.length} Questions
                  </Text>
                </View>
                <View style={styles.quizActions}>
                  <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={(e) => {
                      e.stopPropagation(); // Prevent triggering the parent onPress
                      handleDeleteQuiz(quiz.id);
                    }}
                  >
                    <Ionicons name="trash" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
            
            {allQuizzes.length > 2 && (
              <TouchableOpacity 
                style={styles.seeAllButton}
                onPress={() => navigation.navigate('UserQuizzesScreen')}
              >
                <Text style={styles.seeAllText}>See All</Text>
                <Ionicons name="chevron-forward" size={16} color="#0099FF" />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    );
  };

  // Determine if we're on the HomeScreen or the dedicated UserQuizzesScreen
  const isHomeScreenComponent = navigation.getState()?.routes?.slice(-1)[0]?.name === 'HomeScreen';

  return (
    <View style={styles.container}>
      {isHomeScreenComponent ? (
        renderHomeScreenVersion()
      ) : (
        <>
          {allQuizzes.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                You haven't created any quizzes yet
              </Text>
              <TouchableOpacity 
                style={styles.createQuizButton}
                onPress={() => navigation.navigate('CreateQuizScreen')}
              >
                <Ionicons name="add" size={20} color="white" />
                <Text style={styles.createQuizButtonText}>Create Your First Quiz</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.header}>
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={() => navigation.navigate('CreateQuizScreen')}
                >
                  <Ionicons name="add" size={20} color="white" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={allQuizzes}
                renderItem={renderQuizItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.quizList}
              />
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
  homeContainer: {
    marginHorizontal: 15,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  addButton: {
    backgroundColor: '#0099FF',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    padding: 20,
  },
  emptyStateContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  createQuizButton: {
    flexDirection: 'row',
    backgroundColor: '#0099FF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  createQuizButtonText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: '500',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  createButtonText: {
    color: '#0099FF',
    marginLeft: 5,
    fontWeight: '500',
  },
  quizList: {
    paddingHorizontal: 15,
  },
  quizItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quizInfo: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  quizCategory: {
    color: '#555',
    marginBottom: 3,
  },
  quizSubtext: {
    color: '#888',
    fontSize: 12,
  },
  quizActions: {
    marginLeft: 10,
  },
  deleteButton: {
    padding: 5,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#f1f8fe',
    borderRadius: 8,
  },
  seeAllText: {
    color: '#0099FF',
    fontWeight: '500',
    marginRight: 5,
  }
});

export default UserQuizzes;