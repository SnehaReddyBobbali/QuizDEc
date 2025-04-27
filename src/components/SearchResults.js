import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

const SearchResults = ({ 
  results, 
  onQuizPress, 
  renderQuizItem,
  emptyComponent
}) => {
  // Use provided empty component or default
  const EmptyComponent = emptyComponent || (() => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No quizzes found</Text>
      <Text style={styles.emptySubtext}>Try adjusting your search</Text>
    </View>
  ));

  return (
    <FlatList
      data={results}
      renderItem={renderQuizItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.resultsList}
      ListEmptyComponent={<EmptyComponent />}
    />
  );
};

const styles = StyleSheet.create({
  resultsList: {
    padding: 16,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#616161',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#9E9E9E',
  },
});

export default SearchResults;