import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const TakeQuizScreen = () => {
  const route = useRoute();
  const { quiz } = route.params;
  const navigation = useNavigation();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit * 60); // convert minutes to seconds
  const [quizComplete, setQuizComplete] = useState(false);
  const [questions, setQuestions] = useState([]);
  
  useEffect(() => {
    // Load quiz questions - replace with your actual API call
    loadQuizQuestions();
    
    // Setup timer
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          finishQuiz();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const loadQuizQuestions = () => {
    // Mock questions - replace with your actual data
    const mockQuestions = [
      {
        id: '1',
        text: 'What is the closest planet to the Sun?',
        options: [
          { id: 'a', text: 'Venus' },
          { id: 'b', text: 'Mercury' },
          { id: 'c', text: 'Earth' },
          { id: 'd', text: 'Mars' },
        ],
        correctAnswer: 'b',
      },
      {
        id: '2',
        text: 'Which of these is NOT a state of matter?',
        options: [
          { id: 'a', text: 'Solid' },
          { id: 'b', text: 'Liquid' },
          { id: 'c', text: 'Energy' },
          { id: 'd', text: 'Gas' },
        ],
        correctAnswer: 'c',
      },
      // Add more questions as needed
    ];
    
    setQuestions(mockQuestions);
  };
  
  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
  };
  
  const handleNextQuestion = () => {
    // Check if answer is correct and update score
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    
    // Move to next question or finish quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      finishQuiz();
    }
  };
  
  const finishQuiz = () => {
    setQuizComplete(true);
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handleQuizExit = () => {
    Alert.alert(
      "Exit Quiz",
      "Are you sure you want to exit? Your progress will be lost.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Exit", style: "destructive", onPress: () => navigation.goBack() }
      ]
    );
  };
  
  if (quizComplete) {
    return (
      <View style={styles.container}>
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Quiz Complete!</Text>
          <Text style={styles.resultScore}>
            Your Score: {score} / {questions.length}
          </Text>
          <Text style={styles.resultPercent}>
            {Math.round((score / questions.length) * 100)}%
          </Text>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.actionButtonText}>Back to Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={() => {
              setCurrentQuestionIndex(0);
              setSelectedOption(null);
              setScore(0);
              setTimeLeft(quiz.timeLimit * 60);
              setQuizComplete(false);
            }}
          >
            <Text style={styles.secondaryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleQuizExit}>
          <Text style={styles.exitButton}>Exit</Text>
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Question {currentQuestionIndex + 1}/{questions.length}
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` },
              ]}
            />
          </View>
        </View>
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
      </View>
      
      <ScrollView style={styles.questionContainer}>
        {questions.length > 0 && (
          <>
            <Text style={styles.questionText}>
              {questions[currentQuestionIndex].text}
            </Text>
            
            {questions[currentQuestionIndex].options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionButton,
                  selectedOption === option.id && styles.selectedOption,
                ]}
                onPress={() => handleOptionSelect(option.id)}
              >
                <Text style={styles.optionLabel}>{option.id.toUpperCase()}</Text>
                <Text style={styles.optionText}>{option.text}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            !selectedOption && styles.disabledButton,
          ]}
          disabled={!selectedOption}
          onPress={handleNextQuestion}
        >
          <Text style={styles.nextButtonText}>
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  exitButton: {
    fontSize: 16,
    color: '#f44336',
    fontWeight: 'bold',
  },
  progressContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  timerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  questionContainer: {
    flex: 1,
    padding: 16,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedOption: {
    borderColor: '#2196F3',
    backgroundColor: '#E3F2FD',
  },
  optionLabel: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    lineHeight: 30,
    marginRight: 12,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  nextButton: {
    backgroundColor: '#2196F3',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#bdbdbd',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  resultScore: {
    fontSize: 18,
    marginBottom: 8,
    color: '#555',
  },
  resultPercent: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 24,
  },
  actionButton: {
    backgroundColor: '#2196F3',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  secondaryButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TakeQuizScreen;