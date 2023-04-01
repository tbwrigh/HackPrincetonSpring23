import React, { useState } from 'react';
import { StyleSheet, Text, View, Slider, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const GetStartedPage = () => {
  const navigation = useNavigation();

  const [price, setPrice] = useState(1);
  const [skillLevel, setSkillLevel] = useState(1);
  const [timeToCook, setTimeToCook] = useState(0);
  const [allergen, setAllergen] = useState('none');

  const handleSetUpPress = async () => {
    try {
      // Save values to async storage
      await AsyncStorage.setItem('price', price.toString());
      await AsyncStorage.setItem('skillLevel', skillLevel.toString());
      await AsyncStorage.setItem('timeToCook', timeToCook.toString());
      await AsyncStorage.setItem('allergen', allergen);
      await AsyncStorage.setItem('setup', 'true');

      navigation.navigate('Main');
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Get Started</Text>
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Price Range:</Text>
        <Slider
          value={price}
          onValueChange={(value) => setPrice(value)}
          minimumValue={1}
          maximumValue={4}
          step={1}
          thumbStyle={styles.thumbStyle}
          minimumTrackTintColor="#007aff"
          maximumTrackTintColor="#b7b7b7"
          trackStyle={styles.trackStyle}
          thumbTintColor="#007aff"
        />
        <View style={styles.sliderLabelsContainer}>
          <Text>$</Text>
          <Text>$$$</Text>
        </View>
      </View>
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Skill Level:</Text>
        <Slider
          value={skillLevel}
          onValueChange={(value) => setSkillLevel(value)}
          minimumValue={1}
          maximumValue={5}
          step={1}
          thumbStyle={styles.thumbStyle}
          minimumTrackTintColor="#007aff"
          maximumTrackTintColor="#b7b7b7"
          trackStyle={styles.trackStyle}
          thumbTintColor="#007aff"
        />
        <View style={styles.sliderLabelsContainer}>
          <Text>Beginner</Text>
          <Text>Expert</Text>
        </View>
      </View>
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Time to Cook:</Text>
        <Slider
          value={timeToCook}
          onValueChange={(value) => setTimeToCook(value)}
          minimumValue={0}
          maximumValue={120}
          step={5}
          thumbStyle={styles.thumbStyle}
          minimumTrackTintColor="#007aff"
          maximumTrackTintColor="#b7b7b7"
          trackStyle={styles.trackStyle}
          thumbTintColor="#007aff"
        />
        <View style={styles.sliderLabelsContainer}>
          <Text>0 min</Text>
          <Text>120+ min</Text>
        </View>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Common Allergens:</Text>
        <Picker
          selectedValue={allergen}
          onValueChange={(itemValue, itemIndex) => setAllergen(itemValue)}
            style={styles.picker}
        >
            <Picker.Item label="None" value="none" />
            <Picker.Item label="Dairy" value="dairy" />
            <Picker.Item label="Eggs" value="eggs" />

            <Picker.Item label="Fish" value="fish" />
            <Picker.Item label="Gluten" value="gluten" />
            <Picker.Item label="Peanuts" value="peanuts" />
            <Picker.Item label="Shellfish" value="shellfish" />
            <Picker.Item label="Soy" value="soy" />
            <Picker.Item label="Tree Nuts" value="tree nuts" />
            <Picker.Item label="Wheat" value="wheat" />
        </Picker>

        <Button title="Set Up" onPress={handleSetUpPress} />

        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    sliderContainer: {
        width: '80%',
        marginBottom: 20,
    },
    sliderLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sliderLabelsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    thumbStyle: {
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: '#007aff',
    },

    trackStyle: {
        height: 10,
        borderRadius: 10,
    },
    pickerContainer: {
        width: '80%',
        marginBottom: 20,
    },
    pickerLabel: {

        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: 150,
    },
});

export default GetStartedPage;


