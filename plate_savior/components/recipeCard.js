import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RecipeCard = ({ recipe }) => {
  const {
    cuisine,
    meal,
    name,
    total_time,
    serving,
    rating,
    ingredients,
    steps,
    calories
  } = recipe;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.subtitle}>{cuisine} {meal}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Total Time:</Text>
          <Text style={styles.infoText}>{total_time}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Serving:</Text>
          <Text style={styles.infoText}>{serving}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Rating:</Text>
          <Text style={styles.infoText}>{rating}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Calories:</Text>
          <Text style={styles.infoText}>{calories}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#808080',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  info: {
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
  },
});

export default RecipeCard;
