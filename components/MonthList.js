import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const getAllMonthsOfYear = () => {
  const months = [];
  const currentDate = new Date();

  for (let year = currentDate.getFullYear(); year >= 1970; year--) {
    for (let month = 11; month >= 0; month--) {
      const date = new Date(year, month, 1);
      const monthName = date.toLocaleString("en-us", { month: "long" });
      const yearMonth = `${monthName} ${year}`;

      months.push(yearMonth);
    }
  }

  return months;
};

const MonthList = () => {
  const allMonths = getAllMonthsOfYear();
  const [currentMonthIndex, setCurrentMonthIndex] = useState();

  useEffect(() => {
    const month = new Date().toLocaleString("en-us", { month: "long" });
    const year = new Date().getFullYear();
    const Index = allMonths.findIndex((x) => x === `${month} ${year}`);
    setCurrentMonthIndex(Index);
  }, []);

  const handleNextMonth = () => {
    setCurrentMonthIndex((prevIndex) => prevIndex - 1);
  };

  const handlePreviousMonth = () => {
    setCurrentMonthIndex((prevIndex) => prevIndex + 1);
  };

  const currentMonth = allMonths[currentMonthIndex];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePreviousMonth} style={styles.button}>
        <Text style={styles.text}>{allMonths[currentMonthIndex + 1]}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.monthButton}>
        <Text style={styles.text}>{currentMonth}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNextMonth} style={styles.button}>
        <Text style={styles.text}>{allMonths[currentMonthIndex - 1]}</Text>
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
