import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Header = ({ name, greeting }) => {
  return (
    <View style={styles.container}>
      <Icon name="user-circle" size={35} color="white" />
      <View style={styles.textContainer}>
        <Text style={styles.greeting}>{greeting}</Text>
        <Text style={styles.userName}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#333",
  },
  textContainer: {
    marginLeft: 10,
  },
  greeting: {
    fontSize: 16,
    color: "white",
  },
  userName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
});

export default Header;
