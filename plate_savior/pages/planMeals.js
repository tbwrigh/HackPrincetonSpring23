import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Calendar from '../components/calendar';

const PlanMeals = () => {

  return (
    <View style={styles.container}>
      < Calendar />
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