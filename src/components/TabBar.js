import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons, FontAwesome, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AiQuizGenerator from '../components/AiQuizGenerator'; // Import the AI Quiz Generator component

const TabBar = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('Home');
  const [showAiModal, setShowAiModal] = useState(false); // Add state for the AI modal
  
  // Animation values for the button press effect
  const scaleAnimation = React.useRef(new Animated.Value(1)).current;
  
  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
    navigation.navigate(tabName);
    
    // Create a small "press" animation
    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  // Function to handle AI-generated quiz
  const handleQuizGenerated = (quizData) => {
    console.log('Generated quiz:', quizData);
    // Here you would save the quiz data to your app's state/database
    // Then navigate to an edit screen or preview screen
    // Example:
    // navigation.navigate('QuizPreview', { quizData });
  };
  
  // Function to determine if a tab is active
  const isActive = (tabName) => selectedTab === tabName;
  
  // Function to handle the + button press
  const handlePlusButtonPress = () => {
    // Show the AI Quiz Generator modal
    setShowAiModal(true);
    
    // Optional: You could also show options here if you want to give the user a choice
    // between creating a quiz manually or using AI
    // For example:
    // Alert.alert(
    //   "Create Quiz",
    //   "Choose an option",
    //   [
    //     { text: "Create Manually", onPress: () => navigation.navigate('CreateQuizScreen') },
    //     { text: "Ask AI to Create", onPress: () => setShowAiModal(true) }
    //   ]
    // );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TabButton 
          iconComponent={<Ionicons name="home" size={22} color={isActive('Home') ? "#3498db" : "#777777"} />}
          label="Home"
          isActive={isActive('Home')}
          onPress={() => handleTabPress('Home')}
        />
        
        <TabButton 
          iconComponent={<Feather name="search" size={22} color={isActive('Search') ? "#3498db" : "#777777"} />}
          label="Search"
          isActive={isActive('Search')}
          onPress={() => handleTabPress('Search')}
        />
        
        <Animated.View 
          style={[
            styles.centerButtonContainer,
            { transform: [{ scale: scaleAnimation }] }
          ]}
        >
          <TouchableOpacity 
            style={styles.plusButton}
            onPress={handlePlusButtonPress} // Changed to our new handler
            activeOpacity={0.7}
          >
            <View style={styles.plusIconContainer}>
              <Feather name="plus" size={26} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </Animated.View>
        
        <TabButton 
          iconComponent={<FontAwesome name="trophy" size={22} color={isActive('Leaderboard') ? "#3498db" : "#777777"} />}
          label="Ranks"
          isActive={isActive('Leaderboard')}
          onPress={() => handleTabPress('Leaderboard')}
        />
        
        <TabButton 
          iconComponent={<Feather name="user" size={22} color={isActive('Profile') ? "#3498db" : "#777777"} />}
          label="Profile"
          isActive={isActive('Profile')}
          onPress={() => handleTabPress('Profile')}
        />
      </View>
      
      {/* Add the AI Quiz Generator Modal */}
      <AiQuizGenerator 
        visible={showAiModal}
        onClose={() => setShowAiModal(false)}
        onQuizGenerated={handleQuizGenerated}
      />
    </View>
  );
};

// Separate component for tab buttons
const TabButton = ({ iconComponent, label, isActive, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.tabItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
        {iconComponent}
      </View>
      <Text style={[
        styles.tabText, 
        isActive && styles.activeTabText
      ]} numberOfLines={1}>
        {label}
      </Text>
      {isActive && <View style={styles.activeDot} />}
    </TouchableOpacity>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  // Your existing styles...
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    height: 70,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 60,
    position: 'relative',
    paddingHorizontal: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
    borderRadius: 10,
  },
  activeIconContainer: {
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
  },
  centerButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusButton: {
    marginBottom: 30,
  },
  plusIconContainer: {
    backgroundColor: '#3498db',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  tabText: {
    fontSize: 11,
    color: '#777777',
    fontWeight: '500',
    textAlign: 'center',
    width: '100%',
  },
  activeTabText: {
    color: '#3498db',
    fontWeight: '600',
  },
  activeDot: {
    position: 'absolute',
    bottom: 6,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#3498db',
  }
});

export default TabBar;