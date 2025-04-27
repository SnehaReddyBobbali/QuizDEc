import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Alert,
  Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Add the missing getQuizQuestions function
const getQuizQuestions = (quizId) => {
  // Sample questions data based on quiz ID
  const quizQuestions = {
    'biology': [
      {
        question: 'Which of the following is NOT a function of the cell membrane?',
        options: [
          'Transport of materials',
          'Cell division',
          'Cell recognition',
          'Protection of cellular contents'
        ],
        correctAnswer: 1,
        explanation: 'The cell membrane is responsible for transport of materials, cell recognition, and protection of cellular contents. Cell division is primarily a function of other cell organelles like the nucleus and centrioles.'
      },
      {
        question: 'Which organelle is known as the "powerhouse of the cell"?',
        options: [
          'Nucleus',
          'Endoplasmic Reticulum',
          'Mitochondria',
          'Golgi Apparatus'
        ],
        correctAnswer: 2,
        explanation: 'Mitochondria are known as the powerhouse of the cell because they produce most of the cell\'s energy through the process of cellular respiration.'
      },
      {
        question: 'Which of the following is a characteristic of prokaryotic cells?',
        options: [
          'Presence of a nucleus',
          'Complex organelles',
          'No membrane-bound organelles',
          'Linear DNA'
        ],
        correctAnswer: 2,
        explanation: 'Prokaryotic cells lack membrane-bound organelles, including a nucleus. Their DNA is typically circular rather than linear.'
      },
      {
        question: 'What is the primary role of chloroplasts in plant cells?',
        options: [
          'Cellular respiration',
          'Photosynthesis',
          'Protein synthesis',
          'Waste removal'
        ],
        correctAnswer: 1,
        explanation: 'Chloroplasts contain chlorophyll and are responsible for photosynthesis, the process by which plants convert light energy into chemical energy.'
      },
      {
        question: 'Which of the following best describes the process of osmosis?',
        options: [
          'Movement of water from high to low concentration',
          'Active transport of ions against a concentration gradient',
          'Transport of large molecules across the cell membrane',
          'Exchange of gases in the lungs'
        ],
        correctAnswer: 0,
        explanation: 'Osmosis is the passive movement of water molecules from an area of high water concentration (low solute) to an area of low water concentration (high solute) across a semi-permeable membrane.'
      }
    ],
    'chemistry': [
      {
        question: 'What is the atomic number of carbon?',
        options: ['4', '6', '8', '12'],
        correctAnswer: 1,
        explanation: 'Carbon has 6 protons in its nucleus, giving it an atomic number of 6.'
      },
      {
        question: 'Which of the following is a noble gas?',
        options: ['Chlorine', 'Oxygen', 'Helium', 'Sodium'],
        correctAnswer: 2,
        explanation: 'Helium (He) is a noble gas belonging to group 18 of the periodic table. Noble gases have a full outer shell of electrons, making them generally unreactive.'
      },
      {
        question: 'What type of bond is formed when electrons are shared between atoms?',
        options: ['Ionic', 'Covalent', 'Metallic', 'Hydrogen'],
        correctAnswer: 1,
        explanation: 'In a covalent bond, electrons are shared between atoms. This occurs typically between non-metals.'
      },
      {
        question: 'What is the pH of a neutral solution at 25°C?',
        options: ['0', '7', '14', '10'],
        correctAnswer: 1,
        explanation: 'A neutral solution has a pH of 7 at 25°C. Solutions with pH < 7 are acidic and solutions with pH > 7 are basic or alkaline.'
      },
      {
        question: 'Which of the following is NOT a state of matter?',
        options: ['Solid', 'Liquid', 'Gas', 'Energy'],
        correctAnswer: 3,
        explanation: 'Energy is not a state of matter. The common states of matter are solid, liquid, gas, and plasma (often considered the fourth state of matter).'
      }
    ],
    'physics': [
      {
        question: 'What is Newton\'s First Law of Motion?',
        options: [
          'Force equals mass times acceleration',
          'For every action, there is an equal and opposite reaction',
          'An object at rest stays at rest unless acted upon by a force',
          'Energy cannot be created or destroyed'
        ],
        correctAnswer: 2,
        explanation: 'Newton\'s First Law of Motion, also known as the Law of Inertia, states that an object at rest stays at rest and an object in motion stays in motion with the same speed and direction unless acted upon by an unbalanced force.'
      },
      {
        question: 'What is the SI unit of electric current?',
        options: ['Volt', 'Watt', 'Ampere', 'Ohm'],
        correctAnswer: 2,
        explanation: 'The ampere (A) is the SI unit of electric current. It measures the rate of flow of electric charge.'
      },
      {
        question: 'Which of these is NOT one of the fundamental forces of nature?',
        options: [
          'Gravity',
          'Electromagnetic force',
          'Strong nuclear force',
          'Centrifugal force'
        ],
        correctAnswer: 3,
        explanation: 'The four fundamental forces of nature are gravity, electromagnetic force, strong nuclear force, and weak nuclear force. Centrifugal force is actually a fictitious force that appears in a rotating reference frame.'
      },
      {
        question: 'What does E=mc² represent?',
        options: [
          'Conservation of momentum',
          'Mass-energy equivalence',
          'Gravitational potential energy',
          'Kinetic energy formula'
        ],
        correctAnswer: 1,
        explanation: 'E=mc² is Einstein\'s famous equation representing mass-energy equivalence. It states that energy (E) equals mass (m) times the speed of light (c) squared.'
      },
      {
        question: 'Which type of wave requires a medium to travel?',
        options: [
          'Radio waves',
          'Light waves',
          'Sound waves',
          'X-rays'
        ],
        correctAnswer: 2,
        explanation: 'Sound waves are mechanical waves that require a medium (solid, liquid, or gas) to travel. Radio waves, light waves, and X-rays are all electromagnetic waves that can travel through a vacuum.'
      }
    ],
    // Add more quiz categories as needed
    'default': [
      {
        question: 'Sample question 1?',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        explanation: 'Explanation for the correct answer being Option A.'
      },
      {
        question: 'Sample question 2?',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 1,
        explanation: 'Explanation for the correct answer being Option B.'
      },
      {
        question: 'Sample question 3?',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 2,
        explanation: 'Explanation for the correct answer being Option C.'
      },
      {
        question: 'Sample question 4?',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 3,
        explanation: 'Explanation for the correct answer being Option D.'
      },
      {
        question: 'Sample question 5?',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        explanation: 'Explanation for the correct answer being Option A.'
      }
    ]
  };
  
  // Return questions for the specified quiz ID or default questions if not found
  return quizQuestions[quizId] || quizQuestions['default'];
};

const SCIQuizScreen = ({ route, navigation }) => {
  const { quiz } = route.params;
  
  // Get sample questions based on the quiz topic
  const questions = getQuizQuestions(quiz.id);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getTimeInSeconds(quiz.time));
  const [timeTaken, setTimeTaken] = useState(0);
  const [showReview, setShowReview] = useState(false);
  
  const timerRef = useRef(null);
  
  // Extract time in seconds from quiz.time (e.g., "10 min" -> 600 seconds)
  function getTimeInSeconds(timeString) {
    const minutes = parseInt(timeString.split(' ')[0]);
    return minutes * 60;
  }
  
  // Start timer when component mounts
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          if (!quizCompleted) finishQuiz();
          return 0;
        }
        return prev - 1;
      });
      setTimeTaken(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timerRef.current);
  }, []);
  
  // Clean up timer when quiz is completed
  useEffect(() => {
    if (quizCompleted) {
      clearInterval(timerRef.current);
    }
  }, [quizCompleted]);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };
  
  const handleNextQuestion = () => {
    // Save the answer
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = selectedOption;
    setAnswers(updatedAnswers);
    
    // Update score if correct
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
    // Calculate final score
    let finalScore = score;
    
    // Check if the last question was answered and correct
    if (selectedOption !== null && 
        currentQuestionIndex === questions.length - 1 && 
        selectedOption === questions[currentQuestionIndex].correctAnswer) {
      finalScore += 1;
    }
    
    // Update answers array with the last answer if needed
    if (selectedOption !== null && answers[currentQuestionIndex] === null) {
      const updatedAnswers = [...answers];
      updatedAnswers[currentQuestionIndex] = selectedOption;
      setAnswers(updatedAnswers);
    }
    
    setScore(finalScore);
    setQuizCompleted(true);
  };
  
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setAnswers(Array(questions.length).fill(null));
    setQuizCompleted(false);
    setTimeLeft(getTimeInSeconds(quiz.time));
    setTimeTaken(0);
    setShowReview(false);
    
    // Restart timer
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          if (!quizCompleted) finishQuiz();
          return 0;
        }
        return prev - 1;
      });
      setTimeTaken(prev => prev + 1);
    }, 1000);
  };
  
  const toggleReview = () => {
    setShowReview(!showReview);
  };
  
  const currentQuestion = questions[currentQuestionIndex];
    
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: quiz.color + '20' }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{quiz.title}</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {currentQuestionIndex + 1}/{questions.length}
          </Text>
        </View>
      </View>
      
      {/* Timer */}
      <View style={[styles.timerContainer, { backgroundColor: quiz.color }]}>
        <Icon name="clock-outline" size={20} color="#FFF" />
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
      </View>
      
      {!quizCompleted && !showReview ? (
        <ScrollView style={styles.contentContainer}>
          {/* Question */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
          </View>
          
          {/* Options */}
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionItem,
                  selectedOption === index && { backgroundColor: quiz.color + '40' },
                  selectedOption === index && { borderColor: quiz.color }
                ]}
                onPress={() => handleOptionSelect(index)}
              >
                <Text style={[
                  styles.optionText,
                  selectedOption === index && { color: quiz.color, fontWeight: 'bold' }
                ]}>
                  {String.fromCharCode(65 + index)}. {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Next Button */}
          <TouchableOpacity
            style={[
              styles.nextButton,
              { backgroundColor: quiz.color },
              selectedOption === null && styles.disabledButton
            ]}
            onPress={handleNextQuestion}
            disabled={selectedOption === null}
          >
            <Text style={styles.nextButtonText}>
              {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <ScrollView style={styles.contentContainer}>
          {showReview ? (
            <View style={styles.reviewContainer}>
              <Text style={styles.resultsTitle}>Review Answers</Text>
              
              {questions.map((question, index) => (
                <View key={index} style={styles.reviewItem}>
                  <Text style={styles.reviewQuestion}>
                    {index + 1}. {question.question}
                  </Text>
                  
                  {question.options.map((option, optIndex) => (
                    <View 
                      key={optIndex} 
                      style={[
                        styles.reviewOption,
                        answers[index] === optIndex && 
                          (question.correctAnswer === optIndex 
                            ? styles.correctAnswer 
                            : styles.wrongAnswer),
                        question.correctAnswer === optIndex && 
                          answers[index] !== optIndex && 
                          styles.correctAnswerUnselected
                      ]}
                    >
                      <Text style={[
                        styles.reviewOptionText,
                        (answers[index] === optIndex || 
                         question.correctAnswer === optIndex) && 
                          styles.highlightedOptionText
                      ]}>
                        {String.fromCharCode(65 + optIndex)}. {option}
                      </Text>
                      
                      {question.correctAnswer === optIndex && (
                        <Icon name="check-circle" size={16} color="#4CAF50" />
                      )}
                      
                      {answers[index] === optIndex && 
                       question.correctAnswer !== optIndex && (
                        <Icon name="close-circle" size={16} color="#F44336" />
                      )}
                    </View>
                  ))}
                  
                  {question.explanation && (
                    <Text style={styles.explanationText}>
                      <Text style={{ fontWeight: 'bold' }}>Explanation: </Text>
                      {question.explanation}
                    </Text>
                  )}
                </View>
              ))}
              
              <TouchableOpacity
                style={[styles.nextButton, { backgroundColor: quiz.color }]}
                onPress={toggleReview}
              >
                <Text style={styles.nextButtonText}>
                  Back to Results
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.resultsContainer}>
              <Text style={styles.resultsTitle}>Quiz Completed!</Text>
              
              <View style={styles.scoreCard}>
                <View style={[styles.scoreCircle, { borderColor: quiz.color }]}>
                  <Text style={[styles.scoreNumber, { color: quiz.color }]}>
                    {score}
                  </Text>
                  <Text style={styles.scoreLabel}>
                    out of {questions.length}
                  </Text>
                </View>
                
                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <Icon name="clock-outline" size={20} color="#666" />
                    <Text style={styles.statLabel}>Time Taken</Text>
                    <Text style={styles.statValue}>{formatTime(timeTaken)}</Text>
                  </View>
                  
                  <View style={styles.statItem}>
                    <Icon name="check" size={20} color="#4CAF50" />
                    <Text style={styles.statLabel}>Correct</Text>
                    <Text style={styles.statValue}>{score}</Text>
                  </View>
                  
                  <View style={styles.statItem}>
                    <Icon name="close" size={20} color="#F44336" />
                    <Text style={styles.statLabel}>Incorrect</Text>
                    <Text style={styles.statValue}>{questions.length - score}</Text>
                  </View>
                  
                  <View style={styles.statItem}>
                    <Icon name="percent" size={20} color="#FF9800" />
                    <Text style={styles.statLabel}>Accuracy</Text>
                    <Text style={styles.statValue}>
                      {Math.round((score / questions.length) * 100)}%
                    </Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: quiz.color }]}
                  onPress={toggleReview}
                >
                  <Icon name="eye-outline" size={20} color="#FFF" />
                  <Text style={styles.actionButtonText}>Review Answers</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: quiz.color }]}
                  onPress={restartQuiz}
                >
                  <Icon name="refresh" size={20} color="#FFF" />
                  <Text style={styles.actionButtonText}>Retry Quiz</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: '#333' }]}
                  onPress={() => navigation.goBack()}
                >
                  <Icon name="arrow-left" size={20} color="#FFF" />
                  <Text style={styles.actionButtonText}>Back to Quizzes</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 12,
  },
  progressContainer: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginBottom: 16,
  },
  timerText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  questionContainer: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionItem: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  nextButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  disabledButton: {
    opacity: 0.6,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsContainer: {
    flex: 1,
    alignItems: 'center',
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  scoreCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 24,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreNumber: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  scoreLabel: {
    fontSize: 14,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  statItem: {
    width: '48%',
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonGroup: {
    width: '100%',
  },
  actionButton: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  reviewContainer: {
    flex: 1,
  },
  reviewItem: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  reviewQuestion: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  reviewOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#F5F5F5',
  },
  correctAnswer: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  wrongAnswer: {
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  correctAnswerUnselected: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  reviewOptionText: {
    fontSize: 14,
    color: '#333',
  },
  highlightedOptionText: {
    fontWeight: '500',
  },
  explanationText: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
    fontStyle: 'italic',
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    padding: 12,
    borderRadius: 8,
  },
});

export default SCIQuizScreen;