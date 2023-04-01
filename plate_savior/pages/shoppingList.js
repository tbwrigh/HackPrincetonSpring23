import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ShoppingList = () => {
  return (
    <View style={styles.container}>
      <Text>Weekly Shopping List</Text>
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
  
  export default ShoppingList;