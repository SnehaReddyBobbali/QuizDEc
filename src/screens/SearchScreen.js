import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    category: null,
    difficulty: null
  });
  const [searchActive, setSearchActive] = useState(false);
  
  // Sample data - combine with your actual quiz data
  // Fixed by assigning unique IDs with category prefix
  const historyQuizzes = [
    {
      id: 'history-1',
      title: 'Ancient Civilizations',
      description: 'Test your knowledge about Egypt, Greece, and Rome',
      questions: 12,
      time: '10 min',
      difficulty: 'Medium',
      bgColor: '#F8D56B', // Soft gold
      iconName: 'library-outline',
      category: 'History'
    },
    // other history quizzes...
  ];
  
  const scienceQuizzes = [
    {
      id: 'science-1',
      title: 'Human Biology',
      description: 'Explore the systems of the human body',
      questions: 15,
      time: '12 min',
      difficulty: 'Medium',
      bgColor: '#2E8B57', // SeaGreen color
      iconName: 'body-outline',
      category: 'Science'
    },
    // other science quizzes...
  ];
  
  const mathematicsQuizzes = [
    {
      id: 'math-1',
      title: 'Algebra',
      description: 'Equations, polynomials and functions',
      questions: 12,
      time: '15 min',
      difficulty: 'Medium',
      bgColor: '#FF7F50', // Coral color
      iconName: 'calculator-outline',
      category: 'Mathematics'
    },
    // other mathematics quizzes...
  ];
  
  const geographyQuizzes = [
    {
      id: 'geo-1',
      title: 'World Capitals',
      description: 'Test your knowledge of capital cities around the globe',
      questions: 15,
      time: '12 min',
      difficulty: 'Medium',
      bgColor: '#3498DB', // Bright blue
      iconName: 'location-outline',
      category: 'Geography'
    },
    // other geography quizzes...
  ];
  
  const deepLearningQuizzes = [
    {
      id: 'dl-1',
      title: 'Neural Networks',
      description: 'Fundamentals of neural networks and backpropagation',
      questions: 15,
      time: '12 min',
      difficulty: 'Medium',
      bgColor: '#FF6B81', // Pink
      iconName: 'brain-outline',
      category: 'Deep Learning'
    },
    // other deep learning quizzes...
  ];
  
  // Combine all quizzes for search functionality
  // Filter out any undefined values to prevent errors
  const allQuizzes = [...historyQuizzes, ...scienceQuizzes, ...mathematicsQuizzes, ...geographyQuizzes, ...deepLearningQuizzes].filter(quiz => quiz !== undefined);
  
  // Load recent searches from AsyncStorage on component mount
  useEffect(() => {
    loadRecentSearches();
  }, []);
  
  // Load recent searches from AsyncStorage
  const loadRecentSearches = async () => {
    try {
      const savedSearches = await AsyncStorage.getItem('recentSearches');
      if (savedSearches !== null) {
        setRecentSearches(JSON.parse(savedSearches));
      }
    } catch (error) {
      console.error('Error loading recent searches:', error);
    }
  };
  
  // Save a search term to recent searches
  const saveSearchTerm = async (term, filters) => {
    try {
      // Don't save empty searches
      if (!term.trim()) return;
      
      // Create search object with term and filters
      const searchObject = {
        id: Date.now().toString(),
        term,
        filters,
        timestamp: new Date().toISOString()
      };
      
      // Add new search to the beginning, remove duplicates, limit to 10
      const updatedSearches = [
        searchObject,
        ...recentSearches.filter(item => item.term.toLowerCase() !== term.toLowerCase())
      ].slice(0, 10);
      
      setRecentSearches(updatedSearches);
      await AsyncStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    } catch (error) {
      console.error('Error saving search term:', error);
    }
  };
  
  // Delete a recent search
  const deleteRecentSearch = async (id) => {
    try {
      const updatedSearches = recentSearches.filter(item => item.id !== id);
      setRecentSearches(updatedSearches);
      await AsyncStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    } catch (error) {
      console.error('Error deleting search:', error);
    }
  };
  
  // Clear all recent searches
  const clearAllRecentSearches = async () => {
    try {
      setRecentSearches([]);
      await AsyncStorage.removeItem('recentSearches');
    } catch (error) {
      console.error('Error clearing searches:', error);
    }
  };
  
  // Handle search query
  const handleSearch = (query, filters) => {
    setSearchQuery(query);
    setActiveFilters(filters || { category: null, difficulty: null });
    
    // Save search term if not empty
    if (query.trim()) {
      saveSearchTerm(query, filters || { category: null, difficulty: null });
    }
    
    // Filter quizzes based on query and filters
    if (query.trim() || (filters && (filters.category || filters.difficulty))) {
      const filtered = allQuizzes.filter(quiz => {
        // Check if quiz is defined before accessing properties
        if (!quiz) return false;
        
        // Text matching
        const matchesQuery = !query.trim() || 
          quiz.title.toLowerCase().includes(query.toLowerCase()) || 
          quiz.description.toLowerCase().includes(query.toLowerCase());
        
        // Filter matching - safely check if filters exist before accessing properties
        const matchesCategory = !filters || !filters.category || quiz.category === filters.category;
        const matchesDifficulty = !filters || !filters.difficulty || quiz.difficulty === filters.difficulty;
        
        return matchesQuery && matchesCategory && matchesDifficulty;
      });
      
      setSearchResults(filtered);
      setSearchActive(true);
    } else {
      setSearchResults([]);
      setSearchActive(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (filters) => {
    // Just reuse the search handler with current query
    handleSearch(searchQuery, filters);
  };
  
  // Handle pressing a quiz
  const handleQuizPress = (quiz) => {
    navigation.navigate('TakeQuizScreen', { quiz });
  };
  
  // Load a recent search
  const handleRecentSearchPress = (searchItem) => {
    setSearchQuery(searchItem.term);
    setActiveFilters(searchItem.filters || { category: null, difficulty: null });
    handleSearch(searchItem.term, searchItem.filters);
  };
  
  // Format timestamp for display
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const searchTime = new Date(timestamp);
    const diffTime = Math.abs(now - searchTime);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    
    if (diffDays > 0) {
      return `${diffDays}d ago`;
    } else if (diffHours > 0) {
      return `${diffHours}h ago`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes}m ago`;
    } else {
      return 'Just now';
    }
  };
  
  // Render a quiz item
  const renderQuizItem = ({ item }) => {
    // Check if item exists
    if (!item) return null;
    
    return (
      <TouchableOpacity
        style={[styles.quizCard, { backgroundColor: item.bgColor }]}
        onPress={() => handleQuizPress(item)}
      >
        <View style={styles.quizCardContent}>
          <Ionicons name={item.iconName} size={30} color="#FFF" style={styles.quizIcon} />
          <Text style={styles.quizTitle}>{item.title}</Text>
          <Text style={styles.quizDescription}>{item.description}</Text>
          
          <View style={styles.quizMetaContainer}>
            <View style={styles.quizMetaItem}>
              <Text style={styles.quizMetaText}>{item.questions} Questions</Text>
            </View>
            <View style={styles.quizMetaItem}>
              <Text style={styles.quizMetaText}>{item.time}</Text>
            </View>
            <View style={[styles.quizMetaItem, styles.difficultyBadge]}>
              <Text style={styles.difficultyText}>{item.difficulty}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  // Render a recent search item
  const renderRecentSearchItem = ({ item }) => (
    <View style={styles.recentSearchItem}>
      <TouchableOpacity
        style={styles.recentSearchContent}
        onPress={() => handleRecentSearchPress(item)}
      >
        <Ionicons name="time-outline" size={20} color="#666" />
        <View style={styles.recentSearchTextContainer}>
          <Text style={styles.recentSearchText}>{item.term}</Text>
          <Text style={styles.recentSearchTime}>{formatTimeAgo(item.timestamp)}</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteRecentSearch(item.id)}
      >
        <Ionicons name="close" size={18} color="#999" />
      </TouchableOpacity>
    </View>
  );
  
  // Show empty state for search results
  const renderEmptyResults = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="search-outline" size={50} color="#ccc" />
      <Text style={styles.emptyText}>No quizzes found</Text>
      <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchBar 
        onSearch={handleSearch} 
        onFilterChange={handleFilterChange}
      />
      
      {searchActive ? (
        // Show search results when search is active
        <SearchResults 
          results={searchResults} 
          onQuizPress={handleQuizPress} 
          renderQuizItem={renderQuizItem}
          emptyComponent={renderEmptyResults}
        />
      ) : (
        // Show recent searches when no search is active
        <ScrollView style={styles.recentSearchesContainer}>
          <View style={styles.recentSearchesHeader}>
            <Text style={styles.recentSearchesTitle}>Recent Searches</Text>
            {recentSearches.length > 0 && (
              <TouchableOpacity onPress={clearAllRecentSearches}>
                <Text style={styles.clearAllText}>Clear All</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {recentSearches.length > 0 ? (
            <FlatList
              data={recentSearches}
              renderItem={renderRecentSearchItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              style={styles.recentSearchesList}
            />
          ) : (
            <View style={styles.noSearchesContainer}>
              <Text style={styles.noSearchesText}>
                Your recent searches will appear here
              </Text>
            </View>
          )}
          
          <View style={styles.exploreCategoriesSection}>
            <Text style={styles.exploreCategoriesTitle}>Explore Categories</Text>
            <View style={styles.categoriesGrid}>
              {[
                { name: 'History', style: styles.categoryItemHistory, icon: 'library-outline' },
                { name: 'Science', style: styles.categoryItemScience, icon: 'flask-outline' },
                { name: 'Mathematics', style: styles.categoryItemMathematics, icon: 'calculator-outline' },
                { name: 'Geography', style: styles.categoryItemGeography, icon: 'globe-outline' },
                { name: 'Deep Learning', style: styles.categoryItemDeepLearning, icon: 'brain-outline' }
              ].map(cat => (
                <TouchableOpacity 
                  key={cat.name}
                  style={[styles.categoryItem, cat.style]}
                  onPress={() => navigation.navigate('CategoryQuizzesScreen', { category: cat.name })}
                >
                  <Ionicons 
                    name={cat.icon} 
                    size={40} 
                    color="rgba(0,0,0,0.25)" 
                    style={styles.categoryIcon} 
                  />
                  <Text style={styles.categoryText}>{cat.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  recentSearchesContainer: {
    flex: 1,
    padding: 20,
  },
  recentSearchesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 8,
  },
  recentSearchesTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212529',
    letterSpacing: 0.3,
  },
  clearAllText: {
    fontSize: 14,
    color: '#4361EE',
    fontWeight: '600',
  },
  recentSearchesList: {
    marginBottom: 20,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  recentSearchContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentSearchTextContainer: {
    marginLeft: 14,
    flex: 1,
  },
  recentSearchText: {
    fontSize: 16,
    color: '#212529',
    fontWeight: '500',
  },
  recentSearchTime: {
    fontSize: 12,
    color: '#6C757D',
    marginTop: 3,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 20,
  },
  noSearchesContainer: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F3F5',
    borderRadius: 12,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    height: 120,
  },
  noSearchesText: {
    color: '#6C757D',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  exploreCategoriesSection: {
    marginTop: 10,
    marginBottom: 40,
  },
  exploreCategoriesTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  categoryItem: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    position: 'relative',
    overflow: 'hidden',
  },
  categoryIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    opacity: 0.2,
  },
  categoryText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#212529',
    textAlign: 'center',
  },
  categoryItemHistory: {
    backgroundColor: '#F9E6B3',
  },
  categoryItemScience: {
    backgroundColor: '#D1F5D3',
  },
  categoryItemMathematics: {
    backgroundColor: '#FFD6D6',
  },
  categoryItemGeography: {
    backgroundColor: '#C5E8FF',
  },
  categoryItemDeepLearning: {
    backgroundColor: '#E5D4F0',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    marginTop: 30,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495057',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#6C757D',
    textAlign: 'center',
  },
  quizCard: {
    borderRadius: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    padding: 20,
  },
  quizCardContent: {
    minHeight: 160,
  },
  quizIcon: {
    marginBottom: 14,
  },
  quizTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  quizDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.95,
    marginBottom: 20,
    lineHeight: 22,
  },
  quizMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    gap: 8,
  },
  quizMetaItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  quizMetaText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  difficultyBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  difficultyText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  searchBarContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
});

export default SearchScreen;