import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

const SupervisedLearningQuiz = ({ navigation }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const questions = [
    {
      question: "What is the main characteristic of supervised learning?",
      options: [
        "Learning without labeled data",
        "Learning from labeled data with input-output pairs",
        "Learning through reinforcement signals",
        "Learning without any training data"
      ],
      correctAnswer: 1
    },
    {
      question: "Which of the following is a classification algorithm?",
      options: [
        "Linear Regression",
        "K-means",
        "Random Forest",
        "Principal Component Analysis"
      ],
      correctAnswer: 2
    },
    {
      question: "What type of problem is predicting house prices based on features like size and location?",
      options: [
        "Classification",
        "Regression",
        "Clustering",
        "Dimensionality reduction"
      ],
      correctAnswer: 1
    },
    {
      question: "Which metric is most appropriate for evaluating a binary classification model?",
      options: [
        "Mean Squared Error",
        "R-squared",
        "AUC-ROC",
        "Silhouette Score"
      ],
      correctAnswer: 2
    },
    {
      question: "What is the purpose of a train-test split?",
      options: [
        "To make training faster",
        "To evaluate model performance on unseen data",
        "To reduce the dataset size",
        "To simplify the model architecture"
      ],
      correctAnswer: 1
    },
    {
      question: "Which of the following is NOT a typical supervised learning algorithm?",
      options: [
        "Support Vector Machines",
        "K-Nearest Neighbors",
        "K-means Clustering",
        "Decision Trees"
      ],
      correctAnswer: 2
    },
    {
      question: "What is overfitting in supervised learning?",
      options: [
        "When a model performs well on training data but poorly on test data",
        "When a model performs poorly on both training and test data",
        "When a model is too simple to capture patterns in the data",
        "When a model requires too much computational power"
      ],
      correctAnswer: 0
    },
    {
      question: "Which of the following is a regression metric?",
      options: [
        "F1 score",
        "Precision",
        "Recall",
        "Mean Absolute Error"
      ],
      correctAnswer: 3
    },
    {
      question: "What is the goal of a loss function in supervised learning?",
      options: [
        "To measure the model's memory usage",
        "To quantify the error between predictions and actual values",
        "To count the number of features in the dataset",
        "To determine the learning rate"
      ],
      correctAnswer: 1
    },
    {
      question: "What is cross-validation?",
      options: [
        "A method to test the model on different datasets",
        "A technique to combine multiple models",
        "A way to assess model performance using different train-test splits",
        "A preprocessing step to standardize features"
      ],
      correctAnswer: 2
    },
    {
      question: "What does high bias in a model indicate?",
      options: [
        "The model is too complex",
        "The model is too simple and underfitting",
        "The model is perfectly tuned",
        "The model has too many features"
      ],
      correctAnswer: 1
    },
    {
      question: "Which of these is NOT a way to address overfitting?",
      options: [
        "Regularization",
        "Feature engineering",
        "Increasing model complexity",
        "Early stopping"
      ],
      correctAnswer: 2
    }
  ];

  const handleAnswer = (selectedIndex) => {
    setSelectedOption(selectedIndex);
    
    setTimeout(() => {
      if (selectedIndex === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
      
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedOption(null);
      } else {
        setQuizCompleted(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    setSelectedOption(null);
  };

  const renderOptions = () => {
    return questions[currentQuestion].options.map((option, index) => {
      const isSelected = selectedOption === index;
      const isCorrect = index === questions[currentQuestion].correctAnswer;
      
      let optionStyle = styles.option;
      if (isSelected) {
        optionStyle = isCorrect ? styles.correctOption : styles.wrongOption;
      }
      
      return (
        <TouchableOpacity 
          key={index}
          style={optionStyle}
          onPress={() => handleAnswer(index)}
          disabled={selectedOption !== null}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      );
    });
  };

  const renderResults = () => {
    const percentage = (score / questions.length) * 100;
    let resultMessage = "";
    let resultColor = "";
    
    if (percentage >= 80) {
      resultMessage = "Excellent! You have a strong understanding of supervised learning.";
      resultColor = "#2ECC71";
    } else if (percentage >= 60) {
      resultMessage = "Good job! You're on the right track with supervised learning concepts.";
      resultColor = "#3498DB";
    } else {
      resultMessage = "Keep studying! Supervised learning concepts take time to master.";
      resultColor = "#E74C3C";
    }
    
    return (
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>Quiz Completed!</Text>
        <Text style={[styles.resultsScore, { color: resultColor }]}>
          Your score: {score}/{questions.length} ({percentage.toFixed(0)}%)
        </Text>
        <Text style={styles.resultsMessage}>{resultMessage}</Text>
        <TouchableOpacity style={styles.resetButton} onPress={resetQuiz}>
          <Text style={styles.resetButtonText}>Retake Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.homeButton} 
          onPress={() => navigation.navigate('MLFundamentals')}
        >
          <Text style={styles.homeButtonText}>Back to ML Fundamentals</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {!quizCompleted ? (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>Supervised Learning Quiz</Text>
            <View style={styles.progressContainer}>
              <View 
                style={[
                  styles.progressBar, 
                  { width: `${((currentQuestion + 1) / questions.length) * 100}%` }
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              Question {currentQuestion + 1} of {questions.length}
            </Text>
          </View>
          
          <ScrollView style={styles.questionContainer}>
            <Text style={styles.questionText}>{questions[currentQuestion].question}</Text>
            <View style={styles.optionsContainer}>
              {renderOptions()}
            </View>
          </ScrollView>
        </>
      ) : (
        renderResults()
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
    padding: 16,
    backgroundColor: '#2196F3',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  progressContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  questionContainer: {
    flex: 1,
    padding: 16,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 20,
  },
  optionsContainer: {
    marginTop: 10,
  },
  option: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  correctOption: {
    backgroundColor: 'rgba(46, 204, 113, 0.2)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2ECC71',
  },
  wrongOption: {
    backgroundColor: 'rgba(231, 76, 60, 0.2)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E74C3C',
  },
  optionText: {
    fontSize: 16,
    color: '#333333',
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
    marginBottom: 20,
    color: '#333',
  },
  resultsScore: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultsMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#555',
  },
  resetButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  homeButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  homeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default SupervisedLearningQuiz;