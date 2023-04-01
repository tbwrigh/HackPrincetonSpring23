import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AddRecipes = () => {
  return (
    <View style={styles.container}>
      <Text>Add Recipes to Menu</Text>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
  export default AddRecipes;