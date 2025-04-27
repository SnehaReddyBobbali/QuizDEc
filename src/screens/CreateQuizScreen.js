import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const CreateQuizScreen = ({ navigation }) => {
  const [quizTitle, setQuizTitle] = useState('');
  const [category, setCategory] = useState('');
  const [questions, setQuestions] = useState([
    { 
      question: '', 
      options: ['', '', '', ''], 
      correctAnswer: null 
    }
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions, 
      { 
        question: '', 
        options: ['', '', '', ''], 
        correctAnswer: null 
      }
    ]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      const newQuestions = questions.filter((_, i) => i !== index);
      setQuestions(newQuestions);
    }
  };

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const setCorrectAnswer = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctAnswer = optionIndex;
    setQuestions(newQuestions);
  };

  const saveQuiz = async () => {
    // Validate quiz
    if (!quizTitle.trim()) {
      Alert.alert('Error', 'Please enter a quiz title');
      return;
    }

    if (!category.trim()) {
      Alert.alert('Error', 'Please select a category');
      return;
    }

    const isValid = questions.every(q => 
      q.question.trim() && 
      q.options.every(opt => opt.trim()) && 
      q.correctAnswer !== null
    );

    if (!isValid) {
      Alert.alert('Error', 'Please complete all questions and options');
      return;
    }

    try {
      // Format questions to match the QuizScreen format
      const formattedQuestions = questions.map(q => {
        // Create options object with A, B, C, D keys
        const optionsObj = {};
        q.options.forEach((option, idx) => {
          const letter = String.fromCharCode(65 + idx); // A, B, C, D
          optionsObj[letter] = option;
        });

        // Convert numeric correctAnswer index to letter
        const correctAnswerLetter = String.fromCharCode(65 + q.correctAnswer);

        return {
          question: q.question,
          options: optionsObj,
          correctAnswer: correctAnswerLetter
        };
      });

      // Retrieve existing user quizzes
      const existingQuizzes = await AsyncStorage.getItem('userQuizzes');
      const quizzesList = existingQuizzes ? JSON.parse(existingQuizzes) : [];

      // Create new quiz object
      const newQuiz = {
        id: Date.now().toString(),
        title: quizTitle,
        category,
        questions: formattedQuestions,
        createdAt: new Date().toISOString()
      };

      // Add new quiz to list
      quizzesList.push(newQuiz);

      // Save updated list back to storage
      await AsyncStorage.setItem('userQuizzes', JSON.stringify(quizzesList));

      Alert.alert(
        'Success', 
        'Your quiz has been created!', 
        [{ 
          text: 'OK', 
          onPress: () => navigation.goBack() 
        }]
      );
    } catch (error) {
      console.error('Error saving quiz:', error);
      Alert.alert('Error', 'Failed to save quiz');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create Your Quiz</Text>

      <TextInput
        style={styles.input}
        placeholder="Quiz Title"
        value={quizTitle}
        onChangeText={setQuizTitle}
      />

      <View style={styles.categoryContainer}>
        <Text style={styles.label}>Category</Text>
        <View style={styles.categoryButtons}>
          {['Science', 'Math', 'History', 'General'].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton, 
                category === cat && styles.selectedCategory
              ]}
              onPress={() => setCategory(cat)}
            >
              <Text style={[
                styles.categoryButtonText,
                category === cat && styles.selectedCategoryText
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {questions.map((question, questionIndex) => (
        <View key={questionIndex} style={styles.questionContainer}>
          <View style={styles.questionHeader}>
            <Text style={styles.questionLabel}>
              Question {questionIndex + 1}
            </Text>
            {questions.length > 1 && (
              <TouchableOpacity 
                onPress={() => removeQuestion(questionIndex)}
                style={styles.removeQuestionButton}
              >
                <Ionicons name="trash" size={20} color="red" />
              </TouchableOpacity>
            )}
          </View>

          <TextInput
            style={styles.questionInput}
            placeholder={`Enter Question ${questionIndex + 1}`}
            value={question.question}
            onChangeText={(text) => updateQuestion(questionIndex, 'question', text)}
          />

          {question.options.map((option, optionIndex) => (
            <View key={optionIndex} style={styles.optionContainer}>
              <Text style={styles.optionLetter}>
                {String.fromCharCode(65 + optionIndex)}
              </Text>
              <TextInput
                style={styles.optionInput}
                placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                value={option}
                onChangeText={(text) => updateOption(questionIndex, optionIndex, text)}
              />
              <TouchableOpacity
                style={[
                  styles.correctButton,
                  question.correctAnswer === optionIndex && styles.selectedCorrectButton
                ]}
                onPress={() => setCorrectAnswer(questionIndex, optionIndex)}
              >
                <Text style={[
                  styles.correctButtonText,
                  question.correctAnswer === optionIndex && styles.selectedCorrectButtonText
                ]}>
                  {question.correctAnswer === optionIndex ? '✓ Correct' : 'Mark'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ))}

      <TouchableOpacity 
        style={styles.addQuestionButton} 
        onPress={addQuestion}
      >
        <Ionicons name="add" size={20} color="white" />
        <Text style={styles.addQuestionButtonText}>Add Question</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.saveButton} 
        onPress={saveQuiz}
      >
        <Text style={styles.saveButtonText}>Save Quiz</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#e1e1e8',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 10,
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryButton: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e1e1e8',
    borderRadius: 10,
    paddingVertical: 12,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  selectedCategory: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  categoryButtonText: {
    color: '#2c3e50',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: 'white',
  },
  questionContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  questionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  removeQuestionButton: {
    padding: 5,
  },
  questionInput: {
    backgroundColor: '#f9f9fc',
    borderColor: '#e1e1e8',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 15,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionLetter: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 25,
    textAlign: 'center',
  },
  optionInput: {
    flex: 1,
    backgroundColor: '#f9f9fc',
    borderColor: '#e1e1e8',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 15,
  },
  correctButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e1e1e8',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: 65,
    alignItems: 'center',
  },
  selectedCorrectButton: {
    backgroundColor: '#28a745',
    borderColor: '#28a745',
  },
  correctButtonText: {
    color: '#2c3e50',
    fontSize: 13,
  },
  selectedCorrectButtonText: {
    color: 'white',
  },
  addQuestionButton: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  addQuestionButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#28a745',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateQuizScreen;