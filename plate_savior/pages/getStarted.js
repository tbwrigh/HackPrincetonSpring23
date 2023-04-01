import React, { useState } from 'react';
import { StyleSheet, Text, View, Slider, Button, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';


const GetStartedPage = () => {
  const navigation = useNavigation();

  const [price, setPrice] = useState(1);
  const [skillLevel, setSkillLevel] = useState(1);
  const [timeToCook, setTimeToCook] = useState(0);
  const [noneChecked, setNoneChecked] = useState(false);
  const [dairyChecked, setDairyChecked] = useState(false);
  const [eggsChecked, setEggsChecked] = useState(false);
  const [fishChecked, setFishChecked] = useState(false);
  const [glutenChecked, setGlutenChecked] = useState(false);
  const [peanutsChecked, setPeanutsChecked] = useState(false);
  const [shellfishChecked, setShellfishChecked] = useState(false);
  const [soyChecked, setSoyChecked] = useState(false);
  const [treeChecked, setTreeChecked] = useState(false);
  const [wheatChecked, setWheatChecked] = useState(false);

  const handleSetUpPress = async () => {
    try {
      // Save values to async storage
      await AsyncStorage.setItem('price', price.toString());
      await AsyncStorage.setItem('skillLevel', skillLevel.toString());
      await AsyncStorage.setItem('timeToCook', timeToCook.toString());
      await AsyncStorage.setItem('setup', 'true');

      // build list of all allergens set to true
      let allergens = [];
      if (noneChecked) {
        allergens.push('none');
      }
      if (dairyChecked) {
        allergens.push('dairy');
      }
      if (eggsChecked) {
        allergens.push('eggs');
      }
      if (fishChecked) {
        allergens.push('fish');
      }
      if (glutenChecked) {
        allergens.push('gluten');
      }
      if (peanutsChecked) {
        allergens.push('peanuts');
      }
      if (shellfishChecked) {
        allergens.push('shellfish');
      }
      if (soyChecked) {
        allergens.push('soy');
      }
      if (treeChecked) {
        allergens.push('tree nuts');
      }
      if (wheatChecked) {
        allergens.push('wheat');
      }

      // Save list of allergens to async storage
      await AsyncStorage.setItem('allergens', JSON.stringify(allergens));

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
          maximumValue={4}
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
        <View>
        <Text style={styles.pickerLabel}>Common Allergens:</Text>
        </View>
      </View>

      <View style={styles.check_contain}>
        <View style={styles.column}>
          <View style={styles.row}>
            <View style={styles.left}></View>
            <Checkbox style={styles.checkbox} value={noneChecked} onValueChange={setNoneChecked} />
            <Text>None</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.left}></View>
            <Checkbox style={styles.checkbox} value={dairyChecked} onValueChange={setDairyChecked} />
            <Text>Dairy</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.left}></View>
            <Checkbox style={styles.checkbox} value={eggsChecked} onValueChange={setEggsChecked} />
            <Text>Eggs</Text>
          </View>
    
          <View style={styles.row}>
            <View style={styles.left}></View>
            <Checkbox style={styles.checkbox} value={fishChecked} onValueChange={setFishChecked} />
            <Text>Fish</Text>
          </View>
        
          <View style={styles.row}>
            <View style={styles.left}></View>
            <Checkbox style={styles.checkbox} value={glutenChecked} onValueChange={setGlutenChecked} />
            <Text>Gluten</Text>
          </View>
        </View>
          <View style={styles.column}>

          <View style={styles.row}>
            <View style={styles.right}></View>
            <Checkbox style={styles.checkbox} value={peanutsChecked} onValueChange={setPeanutsChecked} />
            <Text>Peanuts</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.right}></View>
            <Checkbox style={styles.checkbox} value={shellfishChecked} onValueChange={setShellfishChecked} />
            <Text>Shellfish</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.right}></View>
            <Checkbox style={styles.checkbox} value={soyChecked} onValueChange={setSoyChecked} />
            <Text>Soy</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.right}></View>
            <Checkbox style={styles.checkbox} value={treeChecked} onValueChange={setTreeChecked} />
            <Text>Tree Nuts</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.right}></View>
            <Checkbox style={styles.checkbox} value={wheatChecked} onValueChange={setWheatChecked} />
            <Text>Wheat</Text>
          </View>
      </View>
    </View>

      <Button title="Set Up" onPress={handleSetUpPress} />

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
    contain: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    check_contain: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    column: {
      flex: 1,
      padding: 0,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    left: {
      flex: 1,
    },
    right: {
      flex: 1,
    },
    checkbox: {
      marginRight: 10,
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


