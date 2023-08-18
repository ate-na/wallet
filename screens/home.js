import { StyleSheet, View } from "react-native";
import IconButtonWithPlus from "../components/Button";
import MonthList from "../components/MonthList";
import Header from "../components/Header";
import Transactions from "./Transactions";
import { getAllMonthsOfYear } from "../utils/AllMonthOfYear";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { Animated } from "react-native";
import TotalMoney from "../components/TotalMoney";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation }) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState();
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const isFocused = useIsFocused();

  const allMonths = getAllMonthsOfYear();

  useEffect(() => {
    const month = new Date().toLocaleString("en-us", { month: "long" });
    const year = new Date().getFullYear();
    const Index = allMonths.findIndex((x) => x === `${month} ${year}`);
    setCurrentMonthIndex(Index);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = AsyncStorage.getItem("token");
        console.log("token", token);
        const response = await fetch(
          `http://192.168.40.71:3000/api/transaction/total`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const jsonData = await response.json();
        setTotal(jsonData.data || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [isFocused]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = AsyncStorage.getItem("token");
        const response = await fetch(
          `http://192.168.40.71:3000/api/transaction?year=${
            allMonths[currentMonthIndex]?.split(" ")[1]
          }&month=${allMonths[currentMonthIndex]?.split(" ")[0]}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const jsonData = await response.json();
        setTransactions(jsonData.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [isFocused, currentMonthIndex]);

  const scrollY = new Animated.Value(0);

  const monthListHeight = scrollY.interpolate({
    inputRange: [0, 10], // Adjust the values based on your preference.
    outputRange: [150, 100], // Adjust the heights as needed
    extrapolate: "clamp",
  });

  const onPressTransactionItem = (item) => {
    navigation.navigate("Transaction", item);
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex((prevIndex) => prevIndex - 1);
  };

  const handlePreviousMonth = () => {
    setCurrentMonthIndex((prevIndex) => prevIndex + 1);
  };

  const handlePressBtn = () => {
    navigation.navigate("CategoryList");
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header greeting={"Good Morning"} name={"Guest"} total={total} />
        <View
          style={{
            paddingTop: 10,
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TotalMoney money={total} />
        </View>
        <MonthList
          onPressNextMonth={handleNextMonth}
          onPressPreviousMonth={handlePreviousMonth}
          previousMonth={allMonths[currentMonthIndex + 1]}
          nextMonth={allMonths[currentMonthIndex - 1]}
          currentMonth={allMonths[currentMonthIndex]}
        />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Transactions
          transactions={transactions}
          month={
            allMonths[currentMonthIndex]?.split(" ")[0]
              ? allMonths[currentMonthIndex]?.split(" ")[0]
              : new Date().toLocaleString("en-us", { month: "long" })
          }
          onPress={onPressTransactionItem}
        />
      </ScrollView>
      <IconButtonWithPlus onPress={handlePressBtn} />
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    backgroundColor: "#333",
  },
  header: {},
});
