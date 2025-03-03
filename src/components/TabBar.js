import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
const TabBar = () => {
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity style={styles.tabItem}>
        <FontAwesome name="home" size={24} color="gold" />
        <Text style={styles.tabText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem}>
        <FontAwesome name="search" size={24} color="#666" />
        <Text style={styles.tabText}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.createTab}>
        <View style={styles.createButton}>
          <MaterialIcons name="add-circle" size={40} color="#666" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem}>
        <FontAwesome name="trophy" size={24} color="#666" />
        <Text style={styles.tabText}>Leaderboard</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem}>
        <FontAwesome name="user" size={24} color="#666" />
        <Text style={styles.tabText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10,
  },
  tabItem: {
    alignItems: 'center',
  },
  createTab: {
    position: 'relative',
    bottom: 20,
  },
  createButton: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 5,
  },
  tabText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
});

export default TabBar;
