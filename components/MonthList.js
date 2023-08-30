import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const MonthList = ({
  onPressNextMonth,
  onPressPreviousMonth,
  nextMonth,
  previousMonth,
  currentMonth,
}) => {
  const handleNextMonth = () => {
    onPressNextMonth();
  };

  const handlePreviousMonth = () => {
    onPressPreviousMonth();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePreviousMonth} style={styles.button}>
        <Text style={styles.text}>{previousMonth}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.monthButton}>
        <Text style={styles.text}>{currentMonth}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNextMonth} style={styles.button}>
        <Text style={styles.text}>{nextMonth}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  button: {
    padding: 10,
    // backgroundColor: "lightgray",
    borderRadius: 5,
  },
  text: {
    color: "white",
  },
  monthButton: {
    padding: 10,
    backgroundColor: "#666",
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});

export default MonthList;
