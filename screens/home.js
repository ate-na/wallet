import {
  StyleSheet,
  View,
} from "react-native";
import IconButtonWithPlus from "../components/Button";
import MonthList from "../components/MonthList";
import Header from "../components/Header";
import Transactions from "./Transactions";
import { getAllMonthsOfYear } from "../utils/AllMonthOfYear";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import TotalMoney from "../components/TotalMoney";

const Home = ({ navigation }) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState();
  const [transactions, setTransactions] = useState([])
  const [total, setTotal] = useState(0)
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
        const response = await fetch(`http://192.168.138.71:3000/api/transaction/total`);
        const jsonData = await response.json();
        setTotal(jsonData.data || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [isFocused])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.138.71:3000/api/transaction?year=${allMonths[currentMonthIndex]?.split(' ')[1]}&month=${allMonths[currentMonthIndex]?.split(' ')[0]}`);
        const jsonData = await response.json();
        setTransactions(jsonData.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [isFocused, currentMonthIndex]);

  const onPressTransactionItem = (item) => {
    navigation.navigate("Transaction", item)
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
      </View>
      <MonthList
        onPressNextMonth={handleNextMonth}
        onPressPreviousMonth={handlePreviousMonth}
        previousMonth={allMonths[currentMonthIndex + 1]}
        nextMonth={allMonths[currentMonthIndex - 1]}
        currentMonth={allMonths[currentMonthIndex]}
      />
      <Transactions
        transactions={transactions}
        month={
          allMonths[currentMonthIndex]?.split(" ")[0]
            ? allMonths[currentMonthIndex]?.split(" ")[0]
            : new Date().toLocaleString("en-us", { month: "long" })
        }
        onPress={onPressTransactionItem}
      />
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
    // alignItems: "center",
    // justifyContent: "center",
  },
  header: {},
});
