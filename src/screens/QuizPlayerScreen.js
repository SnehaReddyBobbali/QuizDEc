import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const QuizPlayerScreen = ({ route, navigation }) => {
  const { quiz } = route.params;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState([]);

  // Check if we have a valid quiz
  useEffect(() => {
    if (!quiz || !quiz.questions || quiz.questions.length === 0) {
      Alert.alert(
        "Error",
        "This quiz doesn't have any questions. Please try another quiz.",
        [{ text: "Go Back", onPress: () => navigation.goBack() }]
      );
    }
  }, [quiz, navigation]);

  // Get the current question
  const currentQuestion = quiz?.questions[currentQuestionIndex];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    // Check if an option was selected
    if (selectedOption === null) {
      Alert.alert("Please select an answer");
      return;
    }

    // Record the answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {
      question: currentQuestion.question,
      selectedAnswer: selectedOption,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect: selectedOption === currentQuestion.correctAnswer
    };
    setAnswers(newAnswers);

    // Update score if answer is correct
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    // Move to next question or show results
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setShowResults(true);
    }
  };

  const saveResults = async () => {
    try {
      setLoading(true);
      
      // Get existing results or initialize empty array
      const existingResultsString = await AsyncStorage.getItem('quizResults');
      const existingResults = existingResultsString ? JSON.parse(existingResultsString) : [];
      
      // Create new result object
      const newResult = {
        id: Date.now().toString(),
        quizId: quiz.id,
        quizTitle: quiz.title,
        score: score,
        totalQuestions: quiz.questions.length,
        date: new Date().toISOString(),
        answers: answers
      };
      
      // Add new result to array
      existingResults.push(newResult);
      
      // Save updated results
      await AsyncStorage.setItem('quizResults', JSON.stringify(existingResults));
      
      setLoading(false);
      
      navigation.navigate('QuizResultsScreen', { 
        score: score,
        totalQuestions: quiz.questions.length,
        quizTitle: quiz.title,
        answers: answers
      });
      
      // If you don't have a QuizResultsScreen, you can navigate back with:
      // Alert.alert('Quiz Complete', `Your score: ${score}/${quiz.questions.length}`, [
      //   { text: 'OK', onPress: () => navigation.goBack() }
      // ]);
    } catch (error) {
      console.error('Error saving results:', error);
      setLoading(false);
      Alert.alert('Error', 'Failed to save quiz results');
    }
  };

  // Render loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0099FF" />
        <Text style={styles.loadingText}>Saving your results...</Text>
      </View>
    );
  }

  // Render results screen
  if (showResults) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Quiz Complete!</Text>
          <Text style={styles.resultsScore}>
            Your Score: {score}/{quiz.questions.length}
          </Text>
          <Text style={styles.resultsPercent}>
            {Math.round((score / quiz.questions.length) * 100)}%
          </Text>
          
          <TouchableOpacity
            style={styles.saveButton}
            onPress={saveResults}
          >
            <Text style={styles.saveButtonText}>Save Results</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Back to Quizzes</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // If quiz or currentQuestion is not available yet, show loading
  if (!quiz || !currentQuestion) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0099FF" />
      </View>
    );
  }

  // Convert options object to array for rendering
  const optionsArray = Object.entries(currentQuestion.options || {}).map(([key, value]) => ({
    id: key,
    text: value
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backBtn}
          onPress={() => {
            Alert.alert(
              "Quit Quiz",
              "Are you sure you want to quit? Your progress will be lost.",
              [
                { text: "Continue Quiz", style: "cancel" },
                { text: "Quit", style: "destructive", onPress: () => navigation.goBack() }
              ]
            );
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{quiz.title}</Text>
        <View style={styles.progressInfo}>
          <Text style={styles.questionCounter}>
            {currentQuestionIndex + 1}/{quiz.questions.length}
          </Text>
        </View>
      </View>

      <View style={styles.progressBarContainer}>
        <View 
          style={[
            styles.progressBar, 
            { width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }
          ]} 
        />
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {optionsArray.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionButton,
              selectedOption === option.id && styles.selectedOption
            ]}
            onPress={() => handleOptionSelect(option.id)}
          >
            <Text style={styles.optionLetter}>{option.id}</Text>
            <Text style={styles.optionText}>{option.text}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNextQuestion}
        >
          <Text style={styles.nextButtonText}>
            {currentQuestionIndex < quiz.questions.length - 1 ? "Next Question" : "Finish Quiz"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f8',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  backBtn: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  progressInfo: {
    minWidth: 40,
  },
  questionCounter: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#e0e0e0',
    width: '100%',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#0099FF',
  },
  questionContainer: {
    backgroundColor: 'white',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  questionText: {
    fontSize: 18,
    color: '#333',
    lineHeight: 26,
  },
  optionsContainer: {
    marginHorizontal: 16,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eaeaea',
  },
  selectedOption: {
    backgroundColor: '#e6f7ff',
    borderColor: '#0099FF',
  },
  optionLetter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: 'bold',
    marginRight: 12,
    color: '#555',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  footer: {
    padding: 16,
    marginTop: 'auto',
  },
  nextButton: {
    backgroundColor: '#0099FF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  resultsScore: {
    fontSize: 20,
    color: '#555',
    marginBottom: 10,
  },
  resultsPercent: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#0099FF',
    marginBottom: 30,
  },
  saveButton: {
    backgroundColor: '#0099FF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 30,
    alignItems: 'center',
    width: '100%',
  },
  backButtonText: {
    color: '#555',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default QuizPlayerScreen;