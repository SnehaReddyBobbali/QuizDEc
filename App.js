import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import Screens
import HomeScreen from "./src/screens/HomeScreen";
import QuizScreen from "./src/screens/QuizScreen";
import ResultScreen from "./src/screens/ResultScreen";
import CreateQuizScreen from "./src/screens/CreateQuizScreen";
import CategoryQuizzesScreen from './src/screens/CategoryQuizzesScreen';
import ReviewAnswers from "./src/screens/ReviewAnswers";
import SCIQuizScreen from './src/screens/SCIQuizScreen';
import TakeQuizScreen from "./src/screens/TakeQuizScreen";
import PlayQuizScreen from "./src/screens/PlayQuizScreen";
import LeaderboardScreen from './src/screens/LeaderboardScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SearchScreen from './src/screens/SearchScreen';

const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="QuizScreen" component={QuizScreen} />
      <Stack.Screen name="ReviewAnswers" component={ReviewAnswers} />
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
      <Stack.Screen name="CreateQuizScreen" component={CreateQuizScreen} />
      <Stack.Screen name="PlayQuizScreen" component={PlayQuizScreen} />
      <Stack.Screen name="CategoryQuizzesScreen" component={CategoryQuizzesScreen} />
      <Stack.Screen name="SCIQuizScreen" component={SCIQuizScreen} />
      <Stack.Screen name="TakeQuizScreen" component={TakeQuizScreen} />
      <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}