import React, { useEffect } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import Calendar from '../components/calendar';

const PlanMeals = () => {

  return (
    <ScrollView style={styles.container} 
    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
    >
      < Calendar />
    </ScrollView>

  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:30,
      width: '100%',
    },

  });
  
  export default PlanMeals;