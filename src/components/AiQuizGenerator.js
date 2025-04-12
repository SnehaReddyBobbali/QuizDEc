import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const AiQuizGenerator = ({ visible, onClose, onQuizGenerated }) => {
  const [topic, setTopic] = useState('');
  const [questionCount, setQuestionCount] = useState('10');
  const [difficulty, setDifficulty] = useState('medium');
  const [questionType, setQuestionType] = useState('multiple-choice');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateQuiz = async () => {
    if (!topic) {
      setError('Please enter a topic');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // This is where you'd call your AI API
      const prompt = `Create a ${questionCount}-question ${questionType} quiz about ${topic} at ${difficulty} difficulty level. Format the response as a JSON array with objects containing "question", "options" (array), and "correctAnswer" fields.`;
      
      // Replace with your actual API call
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo', // Use gpt-4 if your key has access
          messages: [
            { role: 'system', content: 'You are a helpful quiz assistant.' },
            { role: 'user', content: prompt },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        },
        {
          headers: {
            Authorization: 'Bearer YOUR_OPENAI_API_KEY',
            'Content-Type': 'application/json',
          },
        }
      );
      
      const quizDataText = response.data.choices[0].message.content;
      
      // Parse the JSON response
      const quizData = JSON.parse(quizDataText);
      
      onQuizGenerated({
        title: `${topic} Quiz`,
        questions: quizData,
        metadata: {
          difficulty,
          questionType,
          generatedBy: 'AI',
        },
      });
      
      onClose();      
    } catch (err) {
      console.error('Error generating quiz:', err);
      setError('Failed to generate quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Ask AI to Create Quiz</Text>
          
          <Text style={styles.label}>Topic</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., World War II, Solar System, JavaScript Basics"
            value={topic}
            onChangeText={setTopic}
          />
          
          <Text style={styles.label}>Number of Questions</Text>
          <TextInput
            style={styles.input}
            placeholder="10"
            value={questionCount}
            onChangeText={setQuestionCount}
            keyboardType="numeric"
          />
          
          <Text style={styles.label}>Difficulty</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={difficulty}
              onValueChange={(value) => setDifficulty(value)}
              style={styles.picker}
            >
              <Picker.Item label="Easy" value="easy" />
              <Picker.Item label="Medium" value="medium" />
              <Picker.Item label="Hard" value="hard" />
            </Picker>
          </View>
          
          <Text style={styles.label}>Question Type</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={questionType}
              onValueChange={(value) => setQuestionType(value)}
              style={styles.picker}
            >
              <Picker.Item label="Multiple Choice" value="multiple-choice" />
              <Picker.Item label="True/False" value="true-false" />
              <Picker.Item label="Fill in the Blank" value="fill-blank" />
            </Picker>
          </View>
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.generateButton} 
              onPress={generateQuiz}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.generateButtonText}>Generate Quiz</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
  },
  picker: {
    height: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: '500',
  },
  generateButton: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#0094d4',
    alignItems: 'center',
  },
  generateButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default AiQuizGenerator;