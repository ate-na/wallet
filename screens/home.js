import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import IconButtonWithPlus from "../components/Button";
import MonthList from "../components/MonthList";
import Header from "../components/Header";
import Transactions from "./Transactions";
import { getAllMonthsOfYear } from "../utils/AllMonthOfYear";
import { useEffect, useState } from "react";

const Home = ({ navigation }) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState();

  const allMonths = getAllMonthsOfYear();

  useEffect(() => {
    const month = new Date().toLocaleString("en-us", { month: "long" });
    const year = new Date().getFullYear();
    const Index = allMonths.findIndex((x) => x === `${month} ${year}`);
    setCurrentMonthIndex(Index);
  }, []);

  const onPressTransactionItem = (item) => {
    console.log("item", item);
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
        <Header greeting={"Good Morning"} name={"Guest"} />
      </View>
      <MonthList
        onPressNextMonth={handleNextMonth}
        onPressPreviousMonth={handlePreviousMonth}
        previousMonth={allMonths[currentMonthIndex + 1]}
        nextMonth={allMonths[currentMonthIndex - 1]}
        currentMonth={allMonths[currentMonthIndex]}
      />
      <Transactions
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
    backgroundColor: "#555",
    // alignItems: "center",
    // justifyContent: "center",
  },
  header: {},
});
