import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PlayQuizScreen = ({ route, navigation }) => {
  const { quiz } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30); // 30 seconds per question
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeTaken, setTimeTaken] = useState(0);
  
  useEffect(() => {
    // Load quiz data
    setLoading(false);
    
    // Start timer
    const timer = setInterval(() => {
      setTimeTaken(prev => prev + 1);
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleNextQuestion();
          return 30; // Reset timer for next question
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Reset timer when moving to a new question
  useEffect(() => {
    setTimeRemaining(30);
  }, [currentQuestionIndex]);
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0099FF" />
        <Text style={styles.loadingText}>Loading Quiz...</Text>
      </View>
    );
  }
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  
  const handleSelectAnswer = (answer) => {
    if (showAnswer) return; // Prevent changing answer after reveal
    setSelectedAnswer(answer);
  };
  
  const handleCheckAnswer = () => {
    if (!selectedAnswer) return; // Don't proceed if no answer selected
    
    setShowAnswer(true);
    
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    // Save answer data for review at the end
    setAnswers([
      ...answers,
      {
        question: currentQuestion.question,
        userAnswer: selectedAnswer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect
      }
    ]);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      // End of quiz, navigate to results
      navigation.navigate('ResultScreen', {
        score,
        total: quiz.questions.length,
        timeTaken,
        answers,
        quizType: quiz.title
      });
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{quiz.title}</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {currentQuestionIndex + 1}/{quiz.questions.length}
          </Text>
        </View>
      </View>
      
      <View style={styles.timerContainer}>
        <View 
          style={[
            styles.timerBar, 
            { width: `${(timeRemaining / 30) * 100}%` }
          ]}
        />
      </View>
      
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion?.question}</Text>
      </View>
      
      <View style={styles.answersContainer}>
        {currentQuestion?.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerOption,
              selectedAnswer === option && styles.selectedOption,
              showAnswer && option === currentQuestion.correctAnswer && styles.correctOption,
              showAnswer && selectedAnswer === option && option !== currentQuestion.correctAnswer && styles.incorrectOption
            ]}
            onPress={() => handleSelectAnswer(option)}
            disabled={showAnswer}
          >
            <Text 
              style={[
                styles.answerText,
                showAnswer && option === currentQuestion.correctAnswer && styles.correctText,
                showAnswer && selectedAnswer === option && option !== currentQuestion.correctAnswer && styles.incorrectText
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.footer}>
        {!showAnswer ? (
          <TouchableOpacity 
            style={[styles.checkButton, !selectedAnswer && styles.disabledButton]}
            onPress={handleCheckAnswer}
            disabled={!selectedAnswer}
          >
            <Text style={styles.checkButtonText}>Check Answer</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.nextButton}
            onPress={handleNextQuestion}
          >
            <Text style={styles.nextButtonText}>
              {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'View Results'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#555',
  },
  header: {
    backgroundColor: '#0099FF',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 5,
  },
  progressText: {
    color: 'white',
    fontWeight: '500',
  },
  timerContainer: {
    height: 5,
    backgroundColor: '#e0e0e0',
    width: '100%',
  },
  timerBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  questionContainer: {
    padding: 20,
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  answersContainer: {
    padding: 15,
  },
  answerOption: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedOption: {
    borderColor: '#0099FF',
    backgroundColor: '#f0f8ff',
  },
  correctOption: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  incorrectOption: {
    borderColor: '#F44336',
    backgroundColor: '#FFEBEE',
  },
  answerText: {
    fontSize: 16,
    color: '#333',
  },
  correctText: {
    color: '#4CAF50',
  },
  incorrectText: {
    color: '#F44336',
  },
  footer: {
    padding: 15,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  checkButton: {
    backgroundColor: '#0099FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  checkButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default PlayQuizScreen;