import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';



const CategoryQuizzesScreen = ({ route, navigation }) => {
  // Get the category from navigation params
  const { category } = route.params || { category: 'History' }; // Default to History if no param
  
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    category: null,
    difficulty: null
  });
  
  // Sample data for history quizzes - in a real app, you'd fetch this from an API or database
  const historyQuizzes = [
    {
      id: '1',
      title: 'Ancient Civilizations',
      description: 'Test your knowledge about Egypt, Greece, and Rome',
      questions: 12,
      time: '10 min',
      difficulty: 'Medium',
      bgColor: '#F8D56B', // Soft gold
      iconName: 'library-outline', // Using Ionicons
      category: 'History'
    },
    {
      id: '2',
      title: 'World Wars',
      description: 'Challenge yourself on WWI and WWII facts',
      questions: 15,
      time: '12 min',
      difficulty: 'Hard',
      bgColor: '#EB5353', // Soft red
      iconName: 'flag-outline',
      category: 'History'
    },
    {
      id: '3',
      title: 'American History',
      description: 'From colonial times to modern America',
      questions: 10,
      time: '8 min',
      difficulty: 'Easy',
      bgColor: '#5DA3FA', // Soft blue
      iconName: 'globe-outline',
      category: 'History'
    },
    {
      id: '4',
      title: 'Renaissance',
      description: 'Art, culture and innovation in Europe',
      questions: 8,
      time: '7 min',
      difficulty: 'Medium',
      bgColor: '#9F7DF8', // Soft purple
      iconName: 'color-palette-outline',
      category: 'History'
    },
    {
      id: '5',
      title: 'Industrial Revolution',
      description: 'Inventions and social changes of the 18th-19th centuries',
      questions: 10,
      time: '9 min',
      difficulty: 'Medium',
      bgColor: '#8D8D8D', // Soft gray
      iconName: 'construct-outline',
      category: 'History'
    },
    {
      id: '6',
      title: 'Cold War Era',
      description: 'Test your knowledge of post-WWII geopolitics',
      questions: 12,
      time: '10 min',
      difficulty: 'Hard',
      bgColor: '#3F6C51', // Dark green
      iconName: 'nuclear-outline',
      category: 'History'
    },
  ];
  
  // Enhanced science quizzes data combining both sources
  const scienceQuizzes = [
    {
      id: 'sci_1',
      title: 'Human Biology',
      description: 'Explore the systems of the human body',
      questions: 15,
      time: '12 min',
      difficulty: 'Medium',
      bgColor: '#2E8B57', // SeaGreen color
      iconName: 'body-outline',
      category: 'Science'
    },
    {
      id: 'sci_2',
      title: 'Chemistry Basics',
      description: 'Elements, compounds and chemical reactions',
      questions: 12,
      time: '10 min',
      difficulty: 'Hard',
      bgColor: '#6A5ACD', // SlateBlue color
      iconName: 'flask-outline',
      category: 'Science'
    },
    {
      id: 'sci_3',
      title: 'Physics Laws',
      description: 'Newton, Einstein and quantum mechanics',
      questions: 10,
      time: '8 min',
      difficulty: 'Hard',
      bgColor: '#4169E1', // RoyalBlue color
      iconName: 'speedometer-outline',
      category: 'Science'
    },
    {
      id: 'sci_4',
      title: 'Astronomy',
      description: 'Stars, planets and the universe',
      questions: 8,
      time: '7 min',
      difficulty: 'Medium',
      bgColor: '#191970', // MidnightBlue color
      iconName: 'planet-outline',
      category: 'Science'
    },
    {
      id: 'sci_5',
      title: 'Environmental Science',
      description: 'Ecosystems, climate change and conservation',
      questions: 10,
      time: '9 min',
      difficulty: 'Easy',
      bgColor: '#3CB371', // MediumSeaGreen color
      iconName: 'leaf-outline',
      category: 'Science'
    },
    {
      id: 'sci_6',
      title: 'Genetics',
      description: 'DNA, inheritance and genetic engineering',
      questions: 12,
      time: '10 min',
      difficulty: 'Hard',
      bgColor: '#8A2BE2', // BlueViolet color
      iconName: 'git-branch-outline',
      category: 'Science'
    },
  ];
  
  // Mathematics quizzes data
  const mathematicsQuizzes = [
    {
      id: 'm_1',
      title: 'Algebra',
      description: 'Equations, polynomials and functions',
      questions: 12,
      time: '15 min',
      difficulty: 'Medium',
      bgColor: '#FF7F50', // Coral color
      iconName: 'calculator-outline',
      category: 'Mathematics'
    },
    {
      id: 'm_2',
      title: 'Geometry',
      description: 'Shapes, angles and spatial reasoning',
      questions: 10,
      time: '12 min',
      difficulty: 'Medium',
      bgColor: '#DA70D6', // Orchid color
      iconName: 'shapes-outline',
      category: 'Mathematics'
    },
    {
      id: 'm_3',
      title: 'Calculus',
      description: 'Derivatives, integrals and limits',
      questions: 8,
      time: '10 min',
      difficulty: 'Hard',
      bgColor: '#20B2AA', // LightSeaGreen color
      iconName: 'trending-up-outline',
      category: 'Mathematics'
    },
    {
      id: 'm_4',
      title: 'Statistics',
      description: 'Probability, data analysis and interpretation',
      questions: 15,
      time: '14 min',
      difficulty: 'Medium',
      bgColor: '#4682B4', // SteelBlue color
      iconName: 'bar-chart-outline',
      category: 'Mathematics'
    },
    {
      id: 'm_5',
      title: 'Number Theory',
      description: 'Prime numbers, factors and patterns',
      questions: 10,
      time: '8 min',
      difficulty: 'Hard',
      bgColor: '#CD5C5C', // IndianRed color
      iconName: 'grid-outline',
      category: 'Mathematics'
    },
    {
      id: 'm_6',
      title: 'Basic Mathematics',
      description: 'Fundamentals of arithmetic and operations',
      questions: 15,
      time: '10 min',
      difficulty: 'Easy',
      bgColor: '#3CB371', // LimeGreen color
      iconName: 'add-outline',
      category: 'Mathematics'
    },
  ];

  const geographyQuizzes = [
    {
      id: 'g_1',
      title: 'World Capitals',
      description: 'Test your knowledge of capital cities around the globe',
      questions: 15,
      time: '12 min',
      difficulty: 'Medium',
      bgColor: '#3498DB', // Bright blue
      iconName: 'location-outline',
      category: 'Geography'
    },
    {
      id: 'g_2',
      title: 'Natural Wonders',
      description: 'Explore amazing landmarks and natural formations',
      questions: 10,
      time: '8 min',
      difficulty: 'Easy',
      bgColor: '#27AE60', // Green
      iconName: 'earth-outline',
      category: 'Geography'
    },
    {
      id: 'g_3',
      title: 'Mountain Ranges',
      description: 'From the Himalayas to the Andes and beyond',
      questions: 12,
      time: '10 min',
      difficulty: 'Hard',
      bgColor: '#8E44AD', // Purple
      iconName: 'triangle-outline',
      category: 'Geography'
    },
    {
      id: 'g_4',
      title: 'Oceans & Seas',
      description: 'Navigate the waters of our planet',
      questions: 8,
      time: '7 min',
      difficulty: 'Medium',
      bgColor: '#2980B9', // Dark blue
      iconName: 'water-outline',
      category: 'Geography'
    },
    {
      id: 'g_5',
      title: 'Countries of the World',
      description: 'Borders, flags, and national facts',
      questions: 20,
      time: '15 min',
      difficulty: 'Hard',
      bgColor: '#E74C3C', // Red
      iconName: 'flag-outline',
      category: 'Geography'
    },
    {
      id: 'g6',
      title: 'Climate Zones',
      description: 'Ecosystems and weather patterns around the world',
      questions: 10,
      time: '9 min',
      difficulty: 'Medium',
      bgColor: '#F39C12', // Orange
      iconName: 'thermometer-outline',
      category: 'Geography'
    },
  ];
  const deepLearningQuizzes = [
    {
      id: 'd1',
      title: 'Neural Networks',
      description: 'Fundamentals of neural networks and backpropagation',
      questions: 15,
      time: '12 min',
      difficulty: 'Medium',
      bgColor: '#FF6B81', // Pink
      iconName: 'brain-outline',
      category: 'Deep Learning'
    },
    {
      id: 'd2',
      title: 'CNNs & Computer Vision',
      description: 'Convolutional neural networks and image processing',
      questions: 12,
      time: '10 min',
      difficulty: 'Hard',
      bgColor: '#9575CD', // Purple
      iconName: 'eye-outline',
      category: 'Deep Learning'
    },
    {
      id: 'd3',
      title: 'RNNs & NLP',
      description: 'Recurrent networks and natural language processing',
      questions: 10,
      time: '8 min',
      difficulty: 'Hard',
      bgColor: '#64B5F6', // Blue
      iconName: 'chatbubbles-outline',
      category: 'Deep Learning'
    },
    {
      id: 'd4',
      title: 'Generative AI',
      description: 'GANs, diffusion models, and creative AI applications',
      questions: 8,
      time: '7 min',
      difficulty: 'Medium',
      bgColor: '#81C784', // Green
      iconName: 'color-palette-outline',
      category: 'Deep Learning'
    },
    {
      id: 'd5',
      title: 'Reinforcement Learning',
      description: 'Training models through rewards and environments',
      questions: 10,
      time: '9 min',
      difficulty: 'Hard',
      bgColor: '#FFB74D', // Orange
      iconName: 'game-controller-outline',
      category: 'Deep Learning'
    },
    {
      id: 'd6',
      title: 'Deep Learning Frameworks',
      description: 'TensorFlow, PyTorch and other popular tools',
      questions: 12,
      time: '10 min',
      difficulty: 'Medium',
      bgColor: '#F06292', // Pink-Red
      iconName: 'code-slash-outline',
      category: 'Deep Learning'
    },
  ];
    // Full Stack category quizzes
const fullStackQuizzes = [
  {
    id: 'e1',
    title: 'Web Development',
    description: 'Frontend, backend and deployment fundamentals',
    questions: 15,
    time: '12 min',
    difficulty: 'Medium',
    bgColor: '#4682B4', // SteelBlue
    iconName: 'code-outline',
    category: 'Full Stack'
  },
  {
    id: 'e2',
    title: 'REST APIs',
    description: 'Building and consuming RESTful services',
    questions: 10,
    time: '8 min',
    difficulty: 'Medium',
    bgColor: '#6495ED', // CornflowerBlue
    iconName: 'server-outline',
    category: 'Full Stack'
  },
  {
    id: 'e3',
    title: 'Database Design',
    description: 'SQL, NoSQL and data modeling principles',
    questions: 12,
    time: '10 min',
    difficulty: 'Hard',
    bgColor: '#4169E1', // RoyalBlue
    iconName: 'albums-outline',
    category: 'Full Stack'
  },
  {
    id: 'e4',
    title: 'DevOps Basics',
    description: 'CI/CD, containers and deployment strategies',
    questions: 8,
    time: '7 min',
    difficulty: 'Medium',
    bgColor: '#1E90FF', // DodgerBlue
    iconName: 'rocket-outline',
    category: 'Full Stack'
  },
  {
    id: 'e5',
    title: 'Cloud Services',
    description: 'Working with AWS, Azure, and GCP',
    questions: 10,
    time: '9 min',
    difficulty: 'Hard',
    bgColor: '#00BFFF', // DeepSkyBlue
    iconName: 'cloud-outline',
    category: 'Full Stack'
  },
  {
    id: 'e6',
    title: 'UI/UX Principles',
    description: 'Designing effective and beautiful interfaces',
    questions: 12,
    time: '10 min',
    difficulty: 'Easy',
    bgColor: '#87CEEB', // SkyBlue
    iconName: 'color-palette-outline',
    category: 'Full Stack'
  },
];

// AI Foundations category quizzes
const aiFoundationsQuizzes = [
  {
    id: 'a1',
    title: 'AI History',
    description: 'Evolution of artificial intelligence from 1950s to present',
    questions: 12,
    time: '10 min',
    difficulty: 'Easy',
    bgColor: '#DC143C', // Crimson
    iconName: 'time-outline',
    category: 'AI Foundations'
  },
  {
    id: 'a2',
    title: 'Search Algorithms',
    description: 'BFS, DFS, A* and other classic AI search methods',
    questions: 15,
    time: '12 min',
    difficulty: 'Medium',
    bgColor: '#B22222', // FireBrick
    iconName: 'search-outline',
    category: 'AI Foundations'
  },
  {
    id: 'a3',
    title: 'Knowledge Representation',
    description: 'Logic, semantic networks and frames',
    questions: 10,
    time: '8 min',
    difficulty: 'Hard',
    bgColor: '#CD5C5C', // IndianRed
    iconName: 'library-outline',
    category: 'AI Foundations'
  },
  {
    id: 'a4',
    title: 'Expert Systems',
    description: 'Rule-based systems and inference engines',
    questions: 8,
    time: '7 min',
    difficulty: 'Medium',
    bgColor: '#FA8072', // Salmon
    iconName: 'bulb-outline',
    category: 'AI Foundations'
  },
  {
    id: 'a5',
    title: 'AI Ethics',
    description: 'Ethical considerations and responsible AI',
    questions: 10,
    time: '9 min',
    difficulty: 'Medium',
    bgColor: '#E9967A', // DarkSalmon
    iconName: 'shield-outline',
    category: 'AI Foundations'
  },
  {
    id: 'a6',
    title: 'Agent Systems',
    description: 'Multi-agent systems and autonomous agents',
    questions: 12,
    time: '10 min',
    difficulty: 'Hard',
    bgColor: '#F08080', // LightCoral
    iconName: 'people-outline',
    category: 'AI Foundations'
  },
];

// ML Fundamentals category quizzes
const mlFundamentalsQuizzes = [
  {
    id: 'm1',
    title: 'Regression Analysis',
    description: 'Linear, polynomial and multivariate regression',
    questions: 15,
    time: '12 min',
    difficulty: 'Medium',
    bgColor: '#32CD32', // LimeGreen
    iconName: 'trending-up-outline',
    category: 'ML Fundamentals'
  },
  {
    id: 'm2',
    title: 'Classification',
    description: 'Logistic regression, decision trees and SVM',
    questions: 12,
    time: '10 min',
    difficulty: 'Hard',
    bgColor: '#00FA9A', // MediumSpringGreen
    iconName: 'options-outline',
    category: 'ML Fundamentals'
  },
  {
    id: 'm3',
    title: 'Model Evaluation',
    description: 'Metrics, cross-validation and performance analysis',
    questions: 10,
    time: '8 min',
    difficulty: 'Medium',
    bgColor: '#3CB371', // MediumSeaGreen
    iconName: 'analytics-outline',
    category: 'ML Fundamentals'
  },
  {
    id: 'm4',
    title: 'Feature Engineering',
    description: 'Selection, extraction and transformation of features',
    questions: 8,
    time: '7 min',
    difficulty: 'Hard',
    bgColor: '#2E8B57', // SeaGreen
    iconName: 'construct-outline',
    category: 'ML Fundamentals'
  },
  {
    id: 'm5',
    title: 'Decision Trees',
    description: 'Building and pruning decision trees',
    questions: 10,
    time: '9 min',
    difficulty: 'Medium',
    bgColor: '#008000', // Green
    iconName: 'git-branch-outline',
    category: 'ML Fundamentals'
  },
  {
    id: 'm6',
    title: 'Overfitting & Bias',
    description: 'Understanding and mitigating common ML pitfalls',
    questions: 12,
    time: '10 min',
    difficulty: 'Medium',
    bgColor: '#006400', // DarkGreen
    iconName: 'warning-outline',
    category: 'ML Fundamentals'
  },
];

// Learning Models category quizzes
const learningModelsQuizzes = [
  {
    id: 'l1',
    title: 'Ensemble Methods',
    description: 'Random forests, boosting and bagging techniques',
    questions: 12,
    time: '10 min',
    difficulty: 'Hard',
    bgColor: '#FF69B4', // HotPink
    iconName: 'layers-outline',
    category: 'Learning Models'
  },
  {
    id: 'l2',
    title: 'Support Vector Machines',
    description: 'Linear and non-linear SVMs with kernels',
    questions: 10,
    time: '8 min',
    difficulty: 'Hard',
    bgColor: '#FF1493', // DeepPink
    iconName: 'grid-outline',
    category: 'Learning Models'
  },
  {
    id: 'l3',
    title: 'K-Means Clustering',
    description: 'Unsupervised learning for data grouping',
    questions: 8,
    time: '7 min',
    difficulty: 'Medium',
    bgColor: '#DB7093', // PaleVioletRed
    iconName: 'apps-outline',
    category: 'Learning Models'
  },
  {
    id: 'l4',
    title: 'Hidden Markov Models',
    description: 'Temporal pattern recognition and prediction',
    questions: 10,
    time: '9 min',
    difficulty: 'Hard',
    bgColor: '#C71585', // MediumVioletRed
    iconName: 'pulse-outline',
    category: 'Learning Models'
  },
  {
    id: 'l5',
    title: 'Bayesian Networks',
    description: 'Probabilistic graphical models for inference',
    questions: 12,
    time: '11 min',
    difficulty: 'Hard',
    bgColor: '#FF00FF', // Magenta
    iconName: 'git-network-outline',
    category: 'Learning Models'
  },
  {
    id: 'l6',
    title: 'Optimization Methods',
    description: 'Gradient descent and advanced optimization techniques',
    questions: 15,
    time: '12 min',
    difficulty: 'Medium',
    bgColor: '#BA55D3', // MediumOrchid
    iconName: 'speedometer-outline',
    category: 'Learning Models'
  },
];

// Data Science category quizzes
const dataScienceQuizzes = [
  {
    id: 'd1',
    title: 'Statistical Analysis',
    description: 'Descriptive and inferential statistics for data',
    questions: 15,
    time: '12 min',
    difficulty: 'Medium',
    bgColor: '#FFD700', // Gold
    iconName: 'stats-chart-outline',
    category: 'Data Science'
  },
  {
    id: 'd2',
    title: 'Data Cleaning',
    description: 'Methods for handling missing values and outliers',
    questions: 12,
    time: '10 min',
    difficulty: 'Medium',
    bgColor: '#FFA500', // Orange
    iconName: 'sparkles-outline',
    category: 'Data Science'
  },
  {
    id: 'd3',
    title: 'Data Visualization',
    description: 'Creating insightful charts and graphs',
    questions: 10,
    time: '8 min',
    difficulty: 'Easy',
    bgColor: '#FF8C00', // DarkOrange
    iconName: 'pie-chart-outline',
    category: 'Data Science'
  },
  {
    id: 'd4',
    title: 'Big Data Tools',
    description: 'Hadoop, Spark, and distributed computing',
    questions: 10,
    time: '9 min',
    difficulty: 'Hard',
    bgColor: '#DAA520', // GoldenRod
    iconName: 'server-outline',
    category: 'Data Science'
  },
  {
    id: 'd5',
    title: 'SQL for Data Science',
    description: 'Database queries for data extraction and analysis',
    questions: 12,
    time: '10 min',
    difficulty: 'Medium',
    bgColor: '#CD853F', // Peru
    iconName: 'albums-outline',
    category: 'Data Science'
  },
  {
    id: 'd6',
    title: 'Hypothesis Testing',
    description: 'Statistical methods to validate assumptions',
    questions: 8,
    time: '7 min',
    difficulty: 'Hard',
    bgColor: '#D2691E', // Chocolate
    iconName: 'flask-outline',
    category: 'Data Science'
  },
];
  // Combine all quizzes for search functionality
  const allQuizzes = [...historyQuizzes, ...scienceQuizzes, ...mathematicsQuizzes, ...geographyQuizzes, ...deepLearningQuizzes, ...fullStackQuizzes, ...aiFoundationsQuizzes, ...mlFundamentalsQuizzes, ...learningModelsQuizzes, ...dataScienceQuizzes];

  // Map category to quiz data
  const quizzesByCategory = {
    'History': historyQuizzes,
    'Science': scienceQuizzes,
    'Mathematics': mathematicsQuizzes,
    'Geography': geographyQuizzes,
    'Deep Learning': deepLearningQuizzes,
    'Full Stack': fullStackQuizzes,
    'AI Foundations': aiFoundationsQuizzes,
    'ML Fundamentals': mlFundamentalsQuizzes,
    'Learning Models': learningModelsQuizzes,
    'Data Science': dataScienceQuizzes
  };

  // Get the appropriate quizzes for the selected category
  const quizzes = quizzesByCategory[category] || [];

  // Set initial filtered quizzes to the category quizzes
  useEffect(() => {
    setFilteredQuizzes(quizzes);
  }, [category]);

  // Set header title with appropriate color for each category
  useEffect(() => {
    if (navigation.setOptions) {
      let headerBackgroundColor;
      
      // Set header color based on category
      switch(category) {
        case 'Science':
          headerBackgroundColor = '#2E8B57'; // SeaGreen
          break;
        case 'Mathematics':
          headerBackgroundColor = '#2196F3'; // Blue
          break;
        case 'History':
        default:
          headerBackgroundColor = '#FF9800'; // Orange
          break;
        case 'Geography':
          headerBackgroundColor = '#3498DB'; // Bright blue
            break;
        case 'Deep Learning':
          headerBackgroundColor = '#FF6B81'; // Pink
          break;
          case 'Full Stack':
            headerBackgroundColor = '#4682B4'; // SteelBlue
            break;
          case 'AI Foundations':
            headerBackgroundColor = '#DC143C'; // Crimson
            break;
          case 'ML Fundamentals':
            headerBackgroundColor = '#32CD32'; // LimeGreen
            break;
          case 'Learning Models':
            headerBackgroundColor = '#FF69B4'; // HotPink
            break;
          case 'Data Science':
            headerBackgroundColor = '#FFD700'; // Gold
            break;
          
      }
      
      navigation.setOptions({
        headerShown: true,
        title: `${category} Quizzes`,
        headerStyle: {
          backgroundColor: headerBackgroundColor,
        },
        headerTintColor: '#fff',
      });
    }
  }, [navigation, category]);

  const handleQuizPress = (quiz) => {
    // Navigate to specific screen based on quiz category
    if (quiz.category === 'Science') {
      navigation.navigate('SCIQuizScreen', { quiz });
    } else {
      navigation.navigate('TakeQuizScreen', { quiz });
    }
  };
  const handleSearch = (query, filters) => {
    setSearchQuery(query);
    setActiveFilters(filters);
    
    console.log("Search query entered:", query);
    console.log("Search active before:", searchActive);
    
    // Determine which quizzes to filter
    let quizzesToFilter = query.trim() ? allQuizzes : quizzes;
    
    // Apply text search if query exists
    if (query.trim()) {
      quizzesToFilter = quizzesToFilter.filter(quiz => {
        const titleMatch = quiz.title.toLowerCase().includes(query.toLowerCase());
        const descriptionMatch = quiz.description.toLowerCase().includes(query.toLowerCase());
        return titleMatch || descriptionMatch;
      });
      
      console.log("Filtered results count:", quizzesToFilter.length);
      setSearchActive(true);
    } else {
      setSearchActive(false);
    }
    
    console.log("Search active after:", searchActive);
    
    // Update search results and filtered quizzes
    if (query.trim()) {
      setSearchResults(quizzesToFilter);
    }
    
    setFilteredQuizzes(quizzesToFilter);
  };

  const handleFilterChange = (filters) => {
    // This function is called when filters change without search input
    handleSearch(searchQuery, filters);
  };

  const renderQuizItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.quizCard, { backgroundColor: item.bgColor }]}
      onPress={() => handleQuizPress(item)}
    >
      <View style={styles.quizCardContent}>
        <Ionicons name={item.iconName} size={40} color="#FFFFFF" style={styles.quizIcon} />
        <Text style={styles.quizTitle}>{item.title}</Text>
        <Text style={styles.quizDescription}>{item.description}</Text>
        
        <View style={styles.quizMetaContainer}>
          <View style={styles.quizMetaItem}>
            <Text style={styles.quizMetaText}>{item.questions} questions</Text>
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

  return (
    <View style={styles.container}>
      <SearchBar 
        onSearch={handleSearch} 
        onFilterChange={handleFilterChange}
      />
      
      {searchActive ? (
        <SearchResults 
          results={searchResults} 
          onQuizPress={handleQuizPress} 
          renderQuizItem={renderQuizItem}
        />
      ) : (
        <FlatList
          data={filteredQuizzes}
          renderItem={renderQuizItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.quizList}
          numColumns={1}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No quizzes match your filters</Text>
              <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  quizList: {
    padding: 16,
  },
  quizCard: {
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 16,
  },
  quizCardContent: {
    minHeight: 150,
  },
  quizIcon: {
    marginBottom: 12,
  },
  quizTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  quizDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 16,
  },
  quizMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  quizMetaItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 8,
  },
  quizMetaText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  difficultyBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  difficultyText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
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

export default CategoryQuizzesScreen;