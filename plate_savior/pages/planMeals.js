import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlanMeals = () => {
  return (
    <View style={styles.container}>
      <Text>plan your meals</Text>
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
  
  export default PlanMeals;