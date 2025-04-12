import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Import Screens
import HomeScreen from "./src/screens/HomeScreen";
import QuizScreen from "./src/screens/QuizScreen";
import ResultScreen from "./src/screens/ResultScreen";
import CreateQuizScreen from "./src/screens/CreateQuizScreen";
import CategoryQuizzesScreen from './src/screens/CategoryQuizzesScreen';
import ReviewAnswers from "./src/screens/ReviewAnswers";
import getQuizQuestions from './path/to/getQuizQuestions';
import TakeQuizScreen from "./src/screens/TakeQuizScreen";
import GetQuizScreen from './screens/GetQuizScreen';
import PlayQuizScreen from "./src/screens/PlayQuizScreen";
import CategoriesScreen from './src/screens/CategoriesScreen';
import LeaderboardScreen from './src/screens/LeaderboardScreen';
import ProfileScreen from './src/screens/ProfileScreen';

import ScienceQuizzesScreen from './screens/ScienceQuizzesScreen';
import QuizDetailsScreen from './screens/QuizDetailsScreen';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#0288D1' }, headerTintColor: '#fff' }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen name="QuizScreen" component={QuizScreen} options={{ title: 'Quiz' }} />
      <Stack.Screen name="ReviewAnswers" component={ReviewAnswers} options={{ title: 'Review Answers' }} />
      <Stack.Screen name="ResultScreen" component={ResultScreen} options={{ title: 'Results' }} />
      <Stack.Screen name="PlayQuizScreen" component={PlayQuizScreen} options={{ title: 'Play Quiz' }} />
      <Stack.Screen name="getQuizQuestions" component={getQuizQuestions} options={{ title: 'Take Quiz' }} />
      <Stack.Screen name="SCIQuizScreen" component={SCIQuizScreen} options={{ title: 'Science Quiz' }} />
      <Stack.Screen name="TakeQuizScreen" component={TakeQuizScreen} options={{ title: 'Take Quiz' }} />

      <Stack.Screen name="ScienceQuizzes" component={ScienceQuizzesScreen} />
        <Stack.Screen name="QuizDetails" component={QuizDetailsScreen} />
    </Stack.Navigator>
  );
}

function CategoriesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#0288D1' }, headerTintColor: '#fff' }}>
      <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} options={{ title: 'Categories' }} />
      <Stack.Screen 
        name="CategoryQuizzesScreen" 
        component={CategoryQuizzesScreen} 
        options={({ route }) => ({ title: `${route.params.category} Quizzes` })} 
      />
      <Stack.Screen name="QuizScreen" component={QuizScreen} options={{ title: 'Quiz' }} />
      <Stack.Screen name="PlayQuizScreen" component={PlayQuizScreen} options={{ title: 'Play Quiz' }} />
      <Stack.Screen name="ResultScreen" component={ResultScreen} options={{ title: 'Results' }} />
    </Stack.Navigator>
  );
}

function CreateStack() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#0288D1' }, headerTintColor: '#fff' }}>
      <Stack.Screen name="CreateQuizScreen" component={CreateQuizScreen} options={{ title: 'Create Quiz' }} />
    </Stack.Navigator>
  );
}

function LeaderboardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#0288D1' }, headerTintColor: '#fff' }}>
      <Stack.Screen name="LeaderboardScreen" component={LeaderboardScreen} options={{ title: 'Leaderboard' }} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#0288D1' }, headerTintColor: '#fff' }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Stack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Categories') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Create') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Leaderboard') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0288D1',
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Categories" component={CategoriesStack} />
      <Tab.Screen name="Create" component={CreateStack} />
      <Tab.Screen name="Leaderboard" component={LeaderboardStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return <MainTabNavigator />;
}