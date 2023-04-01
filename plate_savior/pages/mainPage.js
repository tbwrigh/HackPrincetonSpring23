import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from "@react-navigation/native";

export default function MainPage() {
    const navigation = useNavigation();
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Plate Savior!</Text>
      <Text style={styles.subtitle}>Your personalized meal planning assistant</Text>
      <View style={styles.content}>
        <Text style={styles.text}>Here are your meal suggestions for the week:</Text>
        {/* List of meal suggestions would go here */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  content: {
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

