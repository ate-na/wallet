import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Replace 'FontAwesome' with the icon library of your choice

const IconButtonWithPlus = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Icon name="plus" size={20} color="#fff" />
      <Text style={styles.buttonText}>Transaction</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 20, // Adjust the vertical position as needed
    right: 20, // Adjust the horizontal position as needed
    flexDirection: "row",
    backgroundColor: "#de7812", // Replace with your desired background color
    borderRadius: 30,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    marginLeft: 8, // Adjust the spacing between the icon and the text as needed
    fontSize: 18,
    color: "#fff",
  },
});

export default IconButtonWithPlus;
