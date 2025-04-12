import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const QuizScreen = ({ route }) => {
  const navigation = useNavigation();
  const { quizType = 'Science' } = route.params || {};
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(225); 
  const [answers, setAnswers] = useState([]);
  const [startTime, setStartTime] = useState(new Date());
  
  // Quiz questions for different types
  const quizQuestions = {
    'Science': [
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
    ],
    'Maths': [
      {
        question: 'What is 7 × 8?',
        options: {
          'A': '54',
          'B': '56',
          'C': '62',
          'D': '64'
        },
        correctAnswer: 'B'
      },
      {
        question: 'What is the square root of 144?',
        options: {
          'A': '10',
          'B': '12',
          'C': '14',
          'D': '16'
        },
        correctAnswer: 'B'
      },
      {
        question: 'Solve: 15 + 27 - 12',
        options: {
          'A': '20',
          'B': '25',
          'C': '30',
          'D': '35'
        },
        correctAnswer: 'C'
      },
      {
      question: 'What is the value of π (pi) to two decimal places?',
      options: {
        'A': '3.14',
        'B': '3.16',
        'C': '3.12',
        'D': '3.18'
      },
      correctAnswer: 'A'
    },
    {
      question: 'What is the square root of 144?',
      options: {
        'A': '14',
        'B': '12',
        'C': '24',
        'D': '10'
      },
      correctAnswer: 'B'
    },
    {
      question: 'In a right-angled triangle, what is the name of the theorem that relates the sides?',
      options: {
        'A': 'Pascal\'s Theorem',
        'B': 'Newton\'s Theorem',
        'C': 'Pythagoras\' Theorem',
        'D': 'Euclid\'s Theorem'
      },
      correctAnswer: 'C'
    },
    {
      question: 'What is the next number in the Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, ?',
      options: {
        'A': '18',
        'B': '20',
        'C': '21',
        'D': '26'
      },
      correctAnswer: 'C'
    },
    {
      question: 'What is the derivative of x²?',
      options: {
        'A': '2x',
        'B': 'x',
        'C': '2',
        'D': 'x²'
      },
      correctAnswer: 'A'
    },
    {
      question: 'If x = 3 and y = 5, what is the value of 2x² + 3y?',
      options: {
        'A': '33',
        'B': '31',
        'C': '27',
        'D': '35'
      },
      correctAnswer: 'A'
    },
    {
      question: 'What is 40% of 80?',
      options: {
        'A': '36',
        'B': '32',
        'C': '24',
        'D': '42'
      },
      correctAnswer: 'B'
    },
    {
      question: 'What is the area of a circle with radius 4 units?',
      options: {
        'A': '16π square units',
        'B': '8π square units',
        'C': '4π square units',
        'D': '12π square units'
      },
      correctAnswer: 'A'
    },
    {
      question: 'What is the sum of the angles in a triangle?',
      options: {
        'A': '90 degrees',
        'B': '180 degrees',
        'C': '270 degrees',
        'D': '360 degrees'
      },
      correctAnswer: 'B'
    },
    {
      question: 'Solve for x: 2x - 7 = 15',
      options: {
        'A': 'x = 11',
        'B': 'x = 8',
        'C': 'x = 4',
        'D': 'x = 9'
      },
      correctAnswer: 'A'
    }
    ],
    'History': [
      {
        question: 'In which year did World War II end?',
        options: {
          'A': '1943',
          'B': '1944',
          'C': '1945',
          'D': '1946'
        },
        correctAnswer: 'C'
      },
      {
        question: 'Who was the first President of the United States?',
        options: {
          'A': 'Thomas Jefferson',
          'B': 'John Adams',
          'C': 'George Washington',
          'D': 'Benjamin Franklin'
        },
        correctAnswer: 'C'
      },
      {
        question: 'Which ancient civilization built the pyramids?',
        options: {
          'A': 'Babylonians',
          'B': 'Sumerians',
          'C': 'Mayans',
          'D': 'Egyptians'
        },
        correctAnswer: 'D'
      },
      {
        question: 'Who was the first President of the United States?',
        options: {
          'A': 'Thomas Jefferson',
          'B': 'John Adams',
          'C': 'George Washington',
          'D': 'Abraham Lincoln'
        },
        correctAnswer: 'C'
      },
      {
        question: 'The ancient city of Rome was built on how many hills?',
        options: {
          'A': 'Five',
          'B': 'Six',
          'C': 'Seven',
          'D': 'Eight'
        },
        correctAnswer: 'C'
      },
      {
        question: 'In which year did World War II end?',
        options: {
          'A': '1943',
          'B': '1945',
          'C': '1947',
          'D': '1941'
        },
        correctAnswer: 'B'
      },
      {
        question: 'Who was the first female Prime Minister of the United Kingdom?',
        options: {
          'A': 'Queen Victoria',
          'B': 'Margaret Thatcher',
          'C': 'Theresa May',
          'D': 'Queen Elizabeth II'
        },
        correctAnswer: 'B'
      },
      {
        question: 'What was the name of the first satellite launched into space?',
        options: {
          'A': 'Explorer 1',
          'B': 'Vostok 1',
          'C': 'Apollo 11',
          'D': 'Sputnik 1'
        },
        correctAnswer: 'D'
      },
      {
        question: 'The French Revolution began in which year?',
        options: {
          'A': '1789',
          'B': '1776',
          'C': '1804',
          'D': '1812'
        },
        correctAnswer: 'A'
      },
      {
        question: 'Which civilization built the Machu Picchu complex in Peru?',
        options: {
          'A': 'Aztec',
          'B': 'Maya',
          'C': 'Inca',
          'D': 'Olmec'
        },
        correctAnswer: 'C'
      },
      {
        question: 'The Great Wall of China was built primarily during which dynasty?',
        options: {
          'A': 'Ming',
          'B': 'Han',
          'C': 'Tang',
          'D': 'Qin'
        },
        correctAnswer: 'A'
      },
      {
        question: 'Who discovered penicillin?',
        options: {
          'A': 'Louis Pasteur',
          'B': 'Marie Curie',
          'C': 'Alexander Fleming',
          'D': 'Joseph Lister'
        },
        correctAnswer: 'C'
      },
      {
        question: 'Which event marked the beginning of World War I?',
        options: {
          'A': 'The assassination of Archduke Franz Ferdinand',
          'B': 'The invasion of Poland',
          'C': 'The sinking of the Lusitania',
          'D': 'The Treaty of Versailles'
        },
        correctAnswer: 'A'
      }
      // Add more History questions
    ]
  };
  
  // Select questions based on quiz type
  const questions = quizQuestions[quizType] || quizQuestions['Science'];
  
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
  const newAnswers = [...answers, {
    question: questions[currentQuestionIndex].question,
    userAnswer: option,
    userAnswerText: questions[currentQuestionIndex].options[option],
    correctAnswer: questions[currentQuestionIndex].correctAnswer,
    correctAnswerText: questions[currentQuestionIndex].options[questions[currentQuestionIndex].correctAnswer],
    isCorrect
  }];
  
  // Update the answers state
  setAnswers(newAnswers);
  
  if (currentQuestionIndex < questions.length - 1) {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  } else {
    // For the last question, pass the updated answers to finishQuiz
    finishQuiz(newAnswers);
  }
};

const finishQuiz = (finalAnswers = answers) => {
  const endTime = new Date();
  const timeTaken = Math.floor((endTime - startTime) / 1000);
  
  // Using setTimeout to ensure state updates are processed
  setTimeout(() => {
    navigation.navigate('ResultScreen', {
      score,
      total: questions.length,
      timeTaken,
      answers: finalAnswers, // Use the updated answers
      quizType
    });
  }, 100);
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
          <Text style={styles.quizTitle}>{quizType} Quiz</Text>
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