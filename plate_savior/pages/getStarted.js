import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Slider, Button, StatusBar, SafeAreaView, ScrollView } from 'react-native';
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

  const [mexicanChecked, setMexicanChecked] = useState(false);
  const [italianChecked, setItalianChecked] = useState(false);
  const [chineseChecked, setChineseChecked] = useState(false);
  const [indianChecked, setIndianChecked] = useState(false);
  const [germanChecked, setGermanChecked] = useState(false);
  const [greekChecked, setGreekChecked] = useState(false);
  const [filipinoChecked, setFilipinoChecked] = useState(false);
  const [japaneseChecked, setJapaneseChecked] = useState(false);
  const [amishChecked, setAmishChecked] = useState(false);
  const [argentinianChecked, setArgentinianChecked] = useState(false);
  const [ausnzChecked, setAusnzChecked] = useState(false);
  const [austrianChecked, setAustrianChecked] = useState(false);
  const [bangladeshiChecked, setBangladeshiChecked] = useState(false);
  const [belgianChecked, setBelgianChecked] = useState(false);
  const [brazilianChecked, setBrazilianChecked] = useState(false);
  const [cajunChecked, setCajunChecked] = useState(false);
  const [canadianChecked, setCanadianChecked] = useState(false);
  const [chileanChecked, setChileanChecked] = useState(false);
  const [colombianChecked, setColombianChecked] = useState(false);
  const [cubanChecked, setCubanChecked] = useState(false);
  const [danishChecked, setDanishChecked] = useState(false);
  const [dutchChecked, setDutchChecked] = useState(false);
  const [finnishChecked, setFinnishChecked] = useState(false);
  const [frenchChecked, setFrenchChecked] = useState(false);
  const [indonesianChecked, setIndonesianChecked] = useState(false);
  const [israeliChecked, setIsraeliChecked] = useState(false);
  const [jamaicanChecked, setJamaicanChecked] = useState(false);
  const [jewishChecked, setJewishChecked] = useState(false);
  const [koreanChecked, setKoreanChecked] = useState(false);
  const [lebaneseChecked, setLebaneseChecked] = useState(false);
  const [malaysianChecked, setMalaysianChecked] = useState(false);
  const [norwegianChecked, setNorwegianChecked] = useState(false);
  const [pakistaniChecked, setPakistaniChecked] = useState(false);
  const [persianChecked, setPersanChecked] = useState(false);
  const [peruvianChecked, setPeruvianChecked] = useState(false);
  const [polishChecked, setPolishChecked] = useState(false);
  const [portugueseChecked, setPortugueseChecked] = useState(false);
  const [puertoChecked, setPuertoChecked] = useState(false);
  const [russianChecked, setRussianChecked] = useState(false);
  const [scandinavianChecked, setScandinavianChecked] = useState(false);
  const [soulChecked, setSoulChecked] = useState(false);
  const [safricanChecked, setSAfricanChecked] = useState(false);
  const [southernChecked, setSouthernChecked] = useState(false);
  const [spanishChecked, setSpanishChecked] = useState(false);
  const [swedishChecked, setSwedishChecked] = useState(false);
  const [swissChecked, setSwissChecked] = useState(false);
  const [texChecked, setTexChecked] = useState(false);
  const [thaiChecked, setThaiChecked] = useState(false);
  const [turkishChecked, setTurkishChecked] = useState(false);
  const [vietnameseChecked, setVietnameseChecked] = useState(false);

  const [breakfastChecked, setBreakfastChecked] = useState(false);
  const [lunchChecked, setLunchChecked] = useState(false);
  const [dinnerChecked, setDinnerChecked] = useState(false);
  const [appsChecked, setAppsChecked] = useState(false);
  const [sidesChecked, setSidesChecked] = useState(false);
  const [dessertChecked, setDessertChecked] = useState(false);

  const [text, setText] = useState('');

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
    <SafeAreaView style={styles.cont}>
       <ScrollView style={styles.scrollView}>
      <View style={styles.top}>
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

      <View style={styles.pickerContainer}>
          <View>
          <Text style={styles.pickerLabel}>Cuisine Type:</Text>
          </View>
        </View>

        <View style={styles.check_contain}>
          <View style={styles.column}>
            <View style={styles.row}>
              <View style={styles.left}></View>
              <Checkbox style={styles.checkbox} value={mexicanChecked} onValueChange={setMexicanChecked} />
              <Text>Mexican</Text>
              </View>

            <View style={styles.row}>
              <View style={styles.left}></View>
              <Checkbox style={styles.checkbox} value={italianChecked} onValueChange={setItalianChecked} />
              <Text>Italian</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.left}></View>
              <Checkbox style={styles.checkbox} value={chineseChecked} onValueChange={setChineseChecked} />
              <Text>Chinese</Text>
              </View>

            <View style={styles.row}>
              <View style={styles.left}></View>
              <Checkbox style={styles.checkbox} value={indianChecked} onValueChange={setIndianChecked} />
              <Text>Indian</Text>
              </View>

            <View style={styles.row}>
              <View style={styles.left}></View>
              <Checkbox style={styles.checkbox} value={germanChecked} onValueChange={setGermanChecked} />
              <Text>German</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.left}></View>
              <Checkbox style={styles.checkbox} value={greekChecked} onValueChange={setGreekChecked} />
              <Text>Greek</Text>
              </View>

            <View style={styles.row}>
              <View style={styles.left}></View>
              <Checkbox style={styles.checkbox} value={filipinoChecked} onValueChange={setFilipinoChecked} />
              <Text>Filipino</Text>
              </View>

            <View style={styles.row}>
              <View style={styles.left}></View>
              <Checkbox style={styles.checkbox} value={japaneseChecked} onValueChange={setJapaneseChecked} />
              <Text>Japanese</Text>
              </View>

            <View style={styles.row}>
              <View style={styles.left}></View>
              <Checkbox style={styles.checkbox} value={amishChecked} onValueChange={setAmishChecked} />
              <Text>Amish/Mennonite</Text>
              </View>

            <View style={styles.row}>
              <View style={styles.left}></View>
              <Checkbox style={styles.checkbox} value={argentinianChecked} onValueChange={setArgentinianChecked} />
              <Text>Argentinian</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.left}></View>
              <Checkbox style={styles.checkbox} value={ausnzChecked} onValueChange={setAusnzChecked} />
              <Text>Australian</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.left}></View>
              <Checkbox style={styles.checkbox} value={austrianChecked} onValueChange={setAustrianChecked} />
              <Text>Austrian</Text>
              </View>

            <View style={styles.row}>
              <View style={styles.left}></View>
              <Checkbox style={styles.checkbox} value={bangladeshiChecked} onValueChange={setBangladeshiChecked} />
              <Text>Bangladeshi</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.left}></View>
              <Checkbox style={styles.checkbox} value={belgianChecked} onValueChange={setBelgianChecked} />
              <Text>Belgian</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.left}></View>
              <Checkbox style={styles.checkbox} value={brazilianChecked} onValueChange={setBrazilianChecked} />
              <Text>Brazilian</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.left}></View>
              <Checkbox style={styles.checkbox} value={cajunChecked} onValueChange={setCajunChecked} />
              <Text>Cajun/Creole</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.left}></View>
              <Checkbox style={styles.checkbox} value={canadianChecked} onValueChange={setCanadianChecked} />
              <Text>Canadian</Text>
              </View>

            <View style={styles.row}>
              <View style={styles.left}></View>
              <Checkbox style={styles.checkbox} value={chileanChecked} onValueChange={setChileanChecked} />
              <Text>Chilean</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.left}></View>
              <Checkbox style={styles.checkbox} value={colombianChecked} onValueChange={setColombianChecked} />
              <Text>Colombian</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.left}></View>
              <Checkbox style={styles.checkbox} value={cubanChecked} onValueChange={setCubanChecked} />
              <Text>Cuban</Text>
              </View>

            <View style={styles.row}>
              <View style={styles.left}></View>
              <Checkbox style={styles.checkbox} value={danishChecked} onValueChange={setDanishChecked} />
              <Text>Danish</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.left}></View>
              <Checkbox style={styles.checkbox} value={dutchChecked} onValueChange={setDutchChecked} />
              <Text>Dutch</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.left}></View>
              <Checkbox style={styles.checkbox} value={finnishChecked} onValueChange={setFinnishChecked} />
              <Text>Finnish</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.left}></View>
              <Checkbox style={styles.checkbox} value={frenchChecked} onValueChange={setFrenchChecked} />
              <Text>French</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.left}></View>
              <Checkbox style={styles.checkbox} value={indonesianChecked} onValueChange={setIndonesianChecked} />
              <Text>Indonesian</Text>
              </View>
            
            </View>
            <View style={styles.column}>

            <View style={styles.row}>
              <View style={styles.right}></View>
              <Checkbox style={styles.checkbox} value={israeliChecked} onValueChange={setIsraeliChecked} />
              <Text>Israeli</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.right}></View>
              <Checkbox style={styles.checkbox} value={jamaicanChecked} onValueChange={setJamaicanChecked} />
              <Text>Jamaican</Text>
              </View>

            <View style={styles.row}>
              <View style={styles.right}></View>
              <Checkbox style={styles.checkbox} value={jewishChecked} onValueChange={setJewishChecked} />
              <Text>Jewish</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.right}></View>
              <Checkbox style={styles.checkbox} value={koreanChecked} onValueChange={setKoreanChecked} />
              <Text>Korean</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.right}></View>
              <Checkbox style={styles.checkbox} value={lebaneseChecked} onValueChange={setLebaneseChecked} />
              <Text>Lebanese</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.right}></View>
              <Checkbox style={styles.checkbox} value={malaysianChecked} onValueChange={setMalaysianChecked} />
              <Text>Malaysian</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.right}></View>
              <Checkbox style={styles.checkbox} value={norwegianChecked} onValueChange={setNorwegianChecked} />
              <Text>Norwegian</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.right}></View>
              <Checkbox style={styles.checkbox} value={pakistaniChecked} onValueChange={setPakistaniChecked} />
              <Text>Pakistani</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.right}></View>
              <Checkbox style={styles.checkbox} value={persianChecked} onValueChange={setPersanChecked} />
              <Text>Persian</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.right}></View>
              <Checkbox style={styles.checkbox} value={peruvianChecked} onValueChange={setPeruvianChecked} />
              <Text>Peruvian</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.right}></View>
              <Checkbox style={styles.checkbox} value={polishChecked} onValueChange={setPolishChecked} />
              <Text>Polish</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.right}></View>
              <Checkbox style={styles.checkbox} value={portugueseChecked} onValueChange={setPortugueseChecked} />
              <Text>Portuguese</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.right}></View>
              <Checkbox style={styles.checkbox} value={puertoChecked} onValueChange={setPuertoChecked} />
              <Text>Puerto Rican</Text>
              </View>

            <View style={styles.row}>
              <View style={styles.right}></View>
              <Checkbox style={styles.checkbox} value={russianChecked} onValueChange={setRussianChecked} />
              <Text>Russian</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.right}></View>
              <Checkbox style={styles.checkbox} value={scandinavianChecked} onValueChange={setScandinavianChecked} />
              <Text>Scandinavian</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.right}></View>
              <Checkbox style={styles.checkbox} value={soulChecked} onValueChange={setSoulChecked} />
              <Text>Soul Food</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.right}></View>
              <Checkbox style={styles.checkbox} value={safricanChecked} onValueChange={setSAfricanChecked} />
              <Text>South African</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.right}></View>
              <Checkbox style={styles.checkbox} value={southernChecked} onValueChange={setSouthernChecked} />
              <Text>Southern Recipes</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.right}></View>
              <Checkbox style={styles.checkbox} value={spanishChecked} onValueChange={setSpanishChecked} />
              <Text>Spanish</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.right}></View>
              <Checkbox style={styles.checkbox} value={swedishChecked} onValueChange={setSwedishChecked} />
              <Text>Swedish</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.right}></View>
              <Checkbox style={styles.checkbox} value={swissChecked} onValueChange={setSwissChecked} />
              <Text>Swiss</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.right}></View>
              <Checkbox style={styles.checkbox} value={texChecked} onValueChange={setTexChecked} />
              <Text>Tex-Mex</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.right}></View>
              <Checkbox style={styles.checkbox} value={thaiChecked} onValueChange={setThaiChecked} />
              <Text>Thai</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.right}></View>
              <Checkbox style={styles.checkbox} value={turkishChecked} onValueChange={setTurkishChecked} />
              <Text>Turkish</Text>
              </View>
            
            <View style={styles.row}>
              <View style={styles.right}></View>
              <Checkbox style={styles.checkbox} value={vietnameseChecked} onValueChange={setVietnameseChecked} />
              <Text>Vietnamese</Text>
              </View>
            </View>
          </View>
        
        <View style={styles.pickerContainer}>
            <View>
            <Text style={styles.pickerLabel}>Meal Type:</Text>
            </View>
          </View>
        
        <View style={styles.check_contain}>
        <View style={styles.column}>
          <View style={styles.row}>
            <View style={styles.left}></View>
            <Checkbox style={styles.checkbox} value={breakfastChecked} onValueChange={setBreakfastChecked} />
            <Text>Breakfast</Text>
            </View>
          
          <View style={styles.row}>
            <View style={styles.left}></View>
            <Checkbox style={styles.checkbox} value={lunchChecked} onValueChange={setLunchChecked} />
            <Text>Lunch</Text>
            </View>
          
          <View style={styles.row}>
            <View style={styles.left}></View>
            <Checkbox style={styles.checkbox} value={dinnerChecked} onValueChange={setDinnerChecked} />
            <Text>Dinner</Text>
            </View>
          
          </View>
          <View style={styles.column}>

          <View style={styles.row}>
            <View style={styles.right}></View>
            <Checkbox style={styles.checkbox} value={appsChecked} onValueChange={setAppsChecked} />
            <Text>Appetizers</Text>
            </View>

          <View style={styles.row}>
            <View style={styles.right}></View>
            <Checkbox style={styles.checkbox} value={sidesChecked} onValueChange={setSidesChecked} />
            <Text>Sides</Text>
            </View>
          
          <View style={styles.row}>
            <View style={styles.right}></View>
            <Checkbox style={styles.checkbox} value={dessertChecked} onValueChange={setDessertChecked} />
            <Text>Dessert</Text>
            </View>
          </View>
        </View>

        <View style={styles.pickerContainer}>
            <View>
            <Text style={styles.pickerLabel}>On average, how many people do you feed at a meal?</Text>
            </View>
          </View>
        
        <View style={{marginBottom: 20}}>
        <TextInput
          style={{height: 10}}
          maxLength = {2}
          placeholder="Enter Here"
          onChangeText={newText => setText(newText)}
          defaultValue={text}
        />
        </View>
      
          <Button title="Set Up" onPress={handleSetUpPress} />

          </View>
        </ScrollView>
      </SafeAreaView>
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
    cont: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    top: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 11,
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
      flex: -0.5,
      marginRight: 70,
    },
    right: {
      flex: 0,
      marginRight: 30,
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


