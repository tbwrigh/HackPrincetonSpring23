import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Day = (date) => {
    console.log("Day")
    console.log(date)
    return (
        <View>
        <Text>{date}</Text>
        </View>
    );
}

export default Day;