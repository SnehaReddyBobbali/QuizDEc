import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator, 
  Alert,
  Modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const QuizListScreen = ({ navigation }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const categories = ['All', 'Science', 'Math', 'History', 'General'];
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadQuizzes();
    });
    
    return unsubscribe;
  }, [navigation]);
  
  const loadQuizzes = async () => {
    try {
      setLoading(true);
      const userQuizzesString = await AsyncStorage.getItem('userQuizzes');
      if (userQuizzesString) {
        const userQuizzes = JSON.parse(userQuizzesString);
        setQuizzes(userQuizzes);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading quizzes:', error);
      Alert.alert('Error', 'Failed to load quizzes');
      setLoading(false);
    }
  };
  
  const filteredQuizzes = selectedCategory === 'All' 
    ? quizzes 
    : quizzes.filter(quiz => quiz.category === selectedCategory);
  
  const handleQuizSelection = (quiz) => {
    setSelectedQuiz(quiz);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedQuiz(null);
  };

  const startQuiz = (mode) => {
    closeModal();
    if (mode === 'play') {
      navigation.navigate('PlayQuizScreen', { quiz: selectedQuiz });
    } else {
      navigation.navigate('TakeQuiz', { quizId: selectedQuiz.id });
    }
  };
  
  const renderQuizItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.quizCard}
        onPress={() => handleQuizSelection(item)}
      >
        <View style={styles.quizHeader}>
          <Text style={styles.quizTitle}>{item.title}</Text>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>
        
        <View style={styles.quizDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="help-circle-outline" size={16} color="#007bff" />
            <Text style={styles.detailText}>{item.questions.length} Questions</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={16} color="#007bff" />
            <Text style={styles.detailText}>
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>
        
        <View style={styles.playButtonContainer}>
          <View style={styles.playButton}>
            <Ionicons name="play" size={18} color="white" />
            <Text style={styles.playButtonText}>Start Quiz</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="document-text-outline" size={60} color="#c0c0c0" />
      <Text style={styles.emptyTitle}>No Quizzes Found</Text>
      <Text style={styles.emptyText}>
        {selectedCategory === 'All' 
          ? "You haven't created any quizzes yet."
          : `No quizzes found in the ${selectedCategory} category.`}
      </Text>
      <TouchableOpacity 
        style={styles.createButton}
        onPress={() => navigation.navigate('Create', { screen: 'CreateQuiz' })}
      >
        <Ionicons name="add" size={20} color="white" />
        <Text style={styles.createButtonText}>Create a Quiz</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Available Quizzes</Text>
      
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === item && styles.selectedCategoryButton
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text 
                style={[
                  styles.categoryButtonText,
                  selectedCategory === item && styles.selectedCategoryButtonText
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      ) : (
        <FlatList
          data={filteredQuizzes}
          keyExtractor={(item) => item.id}
          renderItem={renderQuizItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={renderEmptyList}
        />
      )}
      
      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={() => navigation.navigate('Create', { screen: 'CreateQuiz' })}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      {/* Quiz Mode Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Quiz Mode</Text>
            
            <Text style={styles.modalSubtitle}>Select how you want to take this quiz:</Text>
            
            <TouchableOpacity 
              style={styles.modeButton} 
              onPress={() => startQuiz('play')}
            >
              <Ionicons name="timer-outline" size={24} color="#007bff" style={styles.modeIcon} />
              <View style={styles.modeTextContainer}>
                <Text style={styles.modeTitle}>Timed Mode</Text>
                <Text style={styles.modeDescription}>Play with time limits and scoring</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#007bff" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.modeButton} 
              onPress={() => startQuiz('take')}
            >
              <Ionicons name="book-outline" size={24} color="#28a745" style={styles.modeIcon} />
              <View style={styles.modeTextContainer}>
                <Text style={styles.modeTitle}>Study Mode</Text>
                <Text style={styles.modeDescription}>Take your time with no pressure</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#28a745" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={closeModal}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8',
    padding: 15,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginVertical: 15,
  },
  categoriesContainer: {
    marginBottom: 15,
  },
  categoryButton: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e1e1e8',
  },
  selectedCategoryButton: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  categoryButtonText: {
    color: '#2c3e50',
    fontWeight: '500',
  },
  selectedCategoryButtonText: {
    color: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flexGrow: 1,
  },
  quizCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
  },
  categoryTag: {
    backgroundColor: '#f0f7ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: '#007bff',
    fontSize: 12,
    fontWeight: '500',
  },
  quizDetails: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  detailText: {
    color: '#7f8c8d',
    marginLeft: 5,
    fontSize: 14,
  },
  playButtonContainer: {
    alignItems: 'flex-end',
  },
  playButton: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  playButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 5,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: '#007bff',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 30,
  },
  createButton: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  createButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 10,
    fontSize: 16,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 20,
    textAlign: 'center',
  },
  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e1e1e8',
  },
  modeIcon: {
    marginRight: 15,
  },
  modeTextContainer: {
    flex: 1,
  },
  modeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  modeDescription: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  cancelButton: {
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7f8c8d',
  },
});

export default QuizListScreen;