import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert
} from 'react-native';

// Mock data for demonstration
const initialUserData = {
  isLoggedIn: false,
  username: '',
  email: '',
  bio: 'Quiz enthusiast',
  avatar: 'https://via.placeholder.com/100x100',
  quizzesTaken: 0,
  quizzesCreated: 0,
  favoriteCategory: '',
  scoreHistory: [
    { date: '1/4', score: 75 },
    { date: '2/4', score: 80 },
    { date: '3/4', score: 70 },
    { date: '4/4', score: 85 },
    { date: '5/4', score: 90 },
  ],
  savedQuizzes: [],
};

const ProfileScreen = () => {
  const [userData, setUserData] = useState(initialUserData);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [signupModalVisible, setSignupModalVisible] = useState(false);
  const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);
  
  // Form states
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [profileForm, setProfileForm] = useState({ username: '', bio: '' });
  
  // Handle login
  const handleLogin = () => {
    if (!loginForm.email || !loginForm.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    // Mock login success
    setUserData({
      ...userData,
      isLoggedIn: true,
      username: 'QuizMaster',
      email: loginForm.email,
      quizzesTaken: 12,
      quizzesCreated: 3,
      favoriteCategory: 'Science'
    });
    setLoginModalVisible(false);
    setLoginForm({ email: '', password: '' });
  };
  
  // Handle signup
  const handleSignup = () => {
    if (!signupForm.username || !signupForm.email || !signupForm.password || !signupForm.confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    if (signupForm.password !== signupForm.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    
    // Mock signup success
    setUserData({
      ...userData,
      isLoggedIn: true,
      username: signupForm.username,
      email: signupForm.email,
      quizzesTaken: 0,
      quizzesCreated: 0,
      favoriteCategory: 'None'
    });
    setSignupModalVisible(false);
    setSignupForm({ username: '', email: '', password: '', confirmPassword: '' });
  };
  
  // Handle edit profile
  const handleEditProfile = () => {
    setUserData({
      ...userData,
      username: profileForm.username || userData.username,
      bio: profileForm.bio || userData.bio
    });
    setEditProfileModalVisible(false);
  };
  
  // Handle logout
  const handleLogout = () => {
    setUserData(initialUserData);
  };
  
  // Prepare edit profile form when modal opens
  useEffect(() => {
    if (editProfileModalVisible) {
      setProfileForm({
        username: userData.username,
        bio: userData.bio
      });
    }
  }, [editProfileModalVisible]);

  // Simple score history chart component (no recharts dependency)
  const ScoreChart = ({ data }) => {
    const maxScore = Math.max(...data.map(item => item.score));
    const minScore = Math.min(...data.map(item => item.score));
    
    return (
      <View style={styles.chartWrapper}>
        <View style={styles.chartLabels}>
          <Text style={styles.chartMaxLabel}>{maxScore}</Text>
          <Text style={styles.chartMinLabel}>{minScore}</Text>
        </View>
        <View style={styles.chart}>
          {data.map((item, index) => {
            const height = ((item.score - minScore) / (maxScore - minScore)) * 100;
            return (
              <View key={index} style={styles.chartBarContainer}>
                <View style={[styles.chartBar, { height: `${height}%` }]} />
                <Text style={styles.chartBarLabel}>{item.date}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {userData.isLoggedIn ? (
        <>
          <View style={styles.header}>
            <Image
              source={{ uri: userData.avatar }}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text style={styles.username}>{userData.username}</Text>
              <Text style={styles.email}>{userData.email}</Text>
              <Text style={styles.bio}>{userData.bio}</Text>
            </View>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{userData.quizzesTaken}</Text>
              <Text style={styles.statLabel}>Quizzes Taken</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{userData.quizzesCreated}</Text>
              <Text style={styles.statLabel}>Quizzes Created</Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Performance</Text>
            <ScoreChart data={userData.scoreHistory} />
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Favorite Category</Text>
            <Text style={styles.categoryText}>{userData.favoriteCategory || 'None yet'}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Saved Quizzes</Text>
            {userData.savedQuizzes.length > 0 ? (
              userData.savedQuizzes.map((quiz, index) => (
                <Text key={index} style={styles.quizItem}>{quiz.title}</Text>
              ))
            ) : (
              <Text style={styles.emptyMessage}>No saved quizzes yet</Text>
            )}
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setEditProfileModalVisible(true)}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, styles.logoutButton]}
              onPress={handleLogout}
            >
              <Text style={[styles.buttonText, styles.logoutText]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.authContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150x150' }}
            style={styles.logo}
          />
          <Text style={styles.welcomeTitle}>Welcome to Quiz App</Text>
          <Text style={styles.welcomeText}>
            Sign in to track your progress, create quizzes, and more!
          </Text>
          
          <TouchableOpacity
            style={styles.authButton}
            onPress={() => setLoginModalVisible(true)}
          >
            <Text style={styles.authButtonText}>Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.authButton, styles.signupButton]}
            onPress={() => setSignupModalVisible(true)}
          >
            <Text style={styles.authButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {/* Login Modal */}
      <Modal
        visible={loginModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Login</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={loginForm.email}
              onChangeText={(text) => setLoginForm({...loginForm, email: text})}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={loginForm.password}
              onChangeText={(text) => setLoginForm({...loginForm, password: text})}
              secureTextEntry
            />
            
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleLogin}
            >
              <Text style={styles.modalButtonText}>Login</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setLoginModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      {/* Signup Modal */}
      <Modal
        visible={signupModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Account</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={signupForm.username}
              onChangeText={(text) => setSignupForm({...signupForm, username: text})}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={signupForm.email}
              onChangeText={(text) => setSignupForm({...signupForm, email: text})}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={signupForm.password}
              onChangeText={(text) => setSignupForm({...signupForm, password: text})}
              secureTextEntry
            />
            
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={signupForm.confirmPassword}
              onChangeText={(text) => setSignupForm({...signupForm, confirmPassword: text})}
              secureTextEntry
            />
            
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleSignup}
            >
              <Text style={styles.modalButtonText}>Sign Up</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setSignupModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      {/* Edit Profile Modal */}
      <Modal
        visible={editProfileModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            
            <Text style={styles.inputLabel}>Username</Text>
            <TextInput
              style={styles.input}
              value={profileForm.username}
              onChangeText={(text) => setProfileForm({...profileForm, username: text})}
            />
            
            <Text style={styles.inputLabel}>Bio</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={profileForm.bio}
              onChangeText={(text) => setProfileForm({...profileForm, bio: text})}
              multiline
              numberOfLines={4}
            />
            
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleEditProfile}
            >
              <Text style={styles.modalButtonText}>Save Changes</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setEditProfileModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ddd',
  },
  userInfo: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  bio: {
    fontSize: 14,
    color: '#444',
    marginTop: 5,
    maxWidth: 250,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 15,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  // Chart styles
  chartWrapper: {
    height: 200,
    flexDirection: 'row',
    marginVertical: 10,
  },
  chartLabels: {
    width: 30,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  chartMaxLabel: {
    fontSize: 12,
    color: '#888',
  },
  chartMinLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 20,
  },
  chart: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 150,
    paddingBottom: 20,
  },
  chartBarContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 30,
  },
  chartBar: {
    width: 20,
    backgroundColor: '#4a90e2',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  chartBarLabel: {
    fontSize: 10,
    color: '#888',
    marginTop: 5,
  },
  categoryText: {
    fontSize: 16,
    color: '#444',
  },
  quizItem: {
    fontSize: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#888',
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 12,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  logoutText: {
    color: '#666',
  },
  // Auth styles (when not logged in)
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 50,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: '#ddd',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  authButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginTop: 15,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: '#5cb85c',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '85%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 5,
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#444',
    marginBottom: 5,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
});

export default ProfileScreen;