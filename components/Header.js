import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import TotalMoney from "./TotalMoney";

const Header = ({ name, greeting, total }) => {

  const greetBasedOnTime = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  }
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Icon name="user-circle" size={35} color="white" />
        <View style={styles.textContainer}>
          <Text style={styles.greeting}>{greetBasedOnTime()}</Text>
          <Text style={styles.userName}>{name}</Text>
        </View>
      </View>
      <View style={styles.total}>
        <TotalMoney money={total} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: "100%",
    padding: 10,
    backgroundColor: "#333",
    display: "flex",


  },
  container: {
    flexDirection: "row",
    alignItems: "center",
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
  total: {
    paddingTop: 10,
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
  }
});

export default Header;
