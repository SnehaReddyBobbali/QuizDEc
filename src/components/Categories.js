import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Categories = () => {
  const navigation = useNavigation();
  
  const categories = [
    { id: 1, name: 'Science', icon: '🧪', color: '#4CAF50' },
    { id: 2, name: 'Mathematics', icon: '🔢', color: '#2196F3' },
    { id: 3, name: 'History', icon: '📜', color: '#FF9800' },
    { id: 4, name: 'Geography', icon: '🌍', color: '#9C27B0' },
    { id: 5, name: 'Literature', icon: '📚', color: '#795548' },
    { id: 6, name: 'Arts', icon: '🎨', color: '#F44336' },
  ];

  const handleCategoryPress = (category) => {
    if (category.name === 'Science') {
      navigation.navigate('QuizScreen', { quizType: 'Science' });
    } else {
      // For future implementation
      alert(`${category.name} quiz coming soon!`);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.categoryCard, { backgroundColor: item.color + '10' }]}
            onPress={() => handleCategoryPress(item)}
          >
            <Text style={styles.categoryIcon}>{item.icon}</Text>
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 5,
  },
  categoryCard: {
    flex: 1,
    margin: 5,
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
});

export default Categories;