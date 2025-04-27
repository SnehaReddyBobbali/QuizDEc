import React from 'react'; 
import { 
  View, 
  ScrollView, 
  Text, 
  StyleSheet 
} from 'react-native'; 
import Header from '../components/Header'; 
import ActionButtons from '../components/ActionButtons'; 
import FeaturedQuizzes from '../components/FeaturedQuizzes'; 
import Categories from '../components/Categories'; 
import TabBar from '../components/TabBar';
import UserQuizzes from './UserQuizzes';  

export default function HomeScreen({ navigation }) {   
  return (     
    <View style={styles.container}>       
      <ScrollView>         
        <Header />         
        <ActionButtons />             

        {/* Featured Quizzes Heading */}         
        <Text style={styles.heading}>Quick Starters!</Text>         
        <FeaturedQuizzes />          

        {/* User Quizzes Heading */}
        <Text style={styles.heading}>My Quizzes</Text>         
        <UserQuizzes navigation={navigation} />

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
  createdQuizzesContainer: {
    backgroundColor: '#f9f9f9',
    marginHorizontal: 15,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#888',
    fontSize: 16,
  }
});