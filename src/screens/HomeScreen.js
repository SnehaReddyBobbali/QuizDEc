import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import ActionButtons from '../components/ActionButtons';
import ProgressSection from './ProgressSection';
import FeaturedQuizzes from '../components/FeaturedQuizzes';
import Categories from '../components/Categories';
import TabBar from '../components/TabBar';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Header />
        <ActionButtons />
        <ProgressSection />

        {/* Featured Quizzes Heading */}
        <Text style={styles.heading}>Featured Quizzes</Text>
        <FeaturedQuizzes />

        {/* Categories Heading */}
        <Text style={styles.heading}>Categories</Text>
        <Categories />
      </ScrollView>

      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 5,
    color: '#000',
  },
});

