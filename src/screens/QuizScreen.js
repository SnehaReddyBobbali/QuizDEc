import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const QuizScreen = ({ route }) => {
  const navigation = useNavigation();
  const { quizType = 'Science' } = route.params || {};
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(225); // 3:45 in seconds
  const [answers, setAnswers] = useState([]);
  const [startTime, setStartTime] = useState(new Date());
  
  // Sample questions for Science quiz
  const questions = [
    {
      question: 'Which planet is known as the Red Planet?',
      options: {
        'A': 'Venus',
        'B': 'Mars',
        'C': 'Jupiter',
        'D': 'Saturn'
      },
      correctAnswer: 'B'
    },
    {
      question: 'What is the chemical formula for water?',
      options: {
        'A': 'H2O',
        'B': 'CO2',
        'C': 'NaCl',
        'D': 'O2'
      },
      correctAnswer: 'A'
    },
    {
      question: 'What is the largest organ in the human body?',
      options: {
        'A': 'Brain',
        'B': 'Liver',
        'C': 'Skin',
        'D': 'Heart'
      },
      correctAnswer: 'C'
    },
    {
      question: 'Which gas do plants absorb from the atmosphere?',
      options: {
        'A': 'Oxygen',
        'B': 'Nitrogen',
        'C': 'Carbon Dioxide',
        'D': 'Hydrogen'
      },
      correctAnswer: 'C'
    },
    {
      question: 'What is the speed of light in a vacuum?',
      options: {
        'A': '300,000 km/s',
        'B': '150,000 km/s',
        'C': '500,000 km/s',
        'D': '1,000,000 km/s'
      },
      correctAnswer: 'A'
    },
    {
      question: 'Which of these is NOT a type of rock?',
      options: {
        'A': 'Igneous',
        'B': 'Sedimentary',
        'C': 'Metamorphic',
        'D': 'Coniferous'
      },
      correctAnswer: 'D'
    },
    {
      question: 'What is the Earth\'s primary protection from solar radiation?',
      options: {
        'A': 'Ozone Layer',
        'B': 'Ionosphere',
        'C': 'Magnetosphere',
        'D': 'Troposphere'
      },
      correctAnswer: 'A'
    },
    {
      question: 'Which of these scientists developed the theory of relativity?',
      options: {
        'A': 'Isaac Newton',
        'B': 'Albert Einstein',
        'C': 'Niels Bohr',
        'D': 'Marie Curie'
      },
      correctAnswer: 'B'
    },
    {
      question: 'Which element has the chemical symbol H?',
      options: {
        'A': 'Helium',
        'B': 'Hydrogen',
        'C': 'Hassium',
        'D': 'Hafnium'
      },
      correctAnswer: 'B'
    },
    {
      question: 'What is the powerhouse of the cell?',
      options: {
        'A': 'Nucleus',
        'B': 'Ribosome',
        'C': 'Mitochondria',
        'D': 'Endoplasmic reticulum'
      },
      correctAnswer: 'C'
    }
  ];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const handleAnswer = (option) => {
    const isCorrect = option === questions[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    // Store user's answer
    setAnswers([...answers, {
      question: questions[currentQuestionIndex].question,
      userAnswer: option,
      correctAnswer: questions[currentQuestionIndex].correctAnswer,
      isCorrect
    }]);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };
  
  const finishQuiz = () => {
    const endTime = new Date();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    
    navigation.navigate('ResultScreen', {
      score,
      total: questions.length,
      timeTaken,
      answers,
      quizType
    });
  };
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.quizContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>QuizDeck</Text>
        </View>
        
        <View style={styles.quizContent}>
          <Text style={styles.quizTitle}>Science Quiz</Text>
          <Text style={styles.questionNumber}>Question {currentQuestionIndex + 1} of {questions.length}</Text>
          
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentQuestionIndex) / questions.length) * 100}%` }
              ]} 
            />
          </View>
          
          <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>
          
          <View style={styles.optionsContainer}>
            {['A', 'B', 'C', 'D'].map((letter, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswer(letter)}
              >
                <Text style={styles.optionLetter}>{letter}.</Text>
                <Text style={styles.optionText}>{questions[currentQuestionIndex].options[letter]}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.navButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>
          
          <Text style={styles.timer}>Time Remaining: {formatTime(timeRemaining)}</Text>
          
          <TouchableOpacity 
            style={[styles.navButton, styles.nextButton]}
            onPress={() => {
              if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
              } else {
                finishQuiz();
              }
            }}
          >
            <Text style={[styles.navButtonText, styles.nextButtonText]}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  quizContainer: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    backgroundColor: '#0099FF',
    padding: 15,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quizContent: {
    flex: 1,
    padding: 20,
  },
  quizTitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  questionNumber: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  question: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 20,
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  optionLetter: {
    marginRight: 10,
    fontWeight: '500',
    color: '#555',
  },
  optionText: {
    flex: 1,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  navButtonText: {
    color: '#555',
  },
  nextButton: {
    backgroundColor: '#0099FF',
    borderColor: '#0099FF',
  },
  nextButtonText: {
    color: 'white',
  },
  timer: {
    fontSize: 14,
    color: '#555',
  },
});

export default QuizScreen;