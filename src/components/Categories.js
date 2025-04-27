import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Categories = () => {
  const navigation = useNavigation();
  
  const categories = [
    { id: 1, name: 'Science', icon: '🧪', color: '#4CAF50' },
    { id: 2, name: 'Mathematics', icon: '🔢', color: '#2196F3' },
    { id: 3, name: 'History', icon: '📜', color: '#FF9800' },
    { id: 4, name: 'Geography', icon: '🌍', color: '#9C27B0' },
    { id: 7, name: 'Deep Learning', icon: '🧠', color: '#673AB7' },
    { id: 8, name: 'Full Stack', icon: '💻', color: '#607D8B' },
    { id: 9, name: 'AI Foundations', icon: '🤖', color: '#00BCD4' },
    { id: 10, name: 'ML Fundamentals', icon: '📊', color: '#009688' },
    { id: 11, name: 'Learning Models', icon: '🔍', color: '#E91E63' },
    { id: 12, name: 'Data Science', icon: '📈', color: '#FFEB3B' },
  ];
  
  const handleCategoryPress = (category) => {
    if (category.name === 'Science' || 
        category.name === 'Mathematics' || 
        category.name === 'History' || 
        category.name === 'Geography'
        || category.name === 'Deep Learning'
        || category.name === 'Full Stack'
        || category.name === 'AI Foundations'
        || category.name === 'ML Fundamentals'
        || category.name === 'Learning Models'
        || category.name === 'Data Science') {
      navigation.navigate('CategoryQuizzesScreen', { category: category.name });
    } else {
      alert(`${category.name} quiz coming soon!`);
    }
  };
  // Instead of using FlatList, we'll use a ScrollView with manual grid layout
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={true}
    >
      <View style={styles.gridContainer}>
        {categories.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.categoryCard, { backgroundColor: item.color + '10' }]}
            onPress={() => handleCategoryPress(item)}
          >
            <Text style={styles.categoryIcon}>{item.icon}</Text>
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Add extra padding at the bottom to ensure last row is visible */}
      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%', // Just under 50% to account for spacing
    marginVertical: 5,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  bottomPadding: {
    height: 100, // Extra space at the bottom to ensure scrollability
  },
});

export default Categories;