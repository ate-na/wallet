import { StyleSheet, View, Text } from "react-native";
import IconButtonWithPlus from "../components/Button";
import MonthList from "../components/MonthList";
import Header from "../components/Header";
import Transactions from "../components/Transactions";
import { getAllMonthsOfYear } from "../utils/AllMonthOfYear";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import TotalMoney from "../components/TotalMoney";
import { api } from "../constants";
import { getTokenData, getUserData } from "../services/tokenService";
import { useQuery } from "react-query";
import { useMemo } from "react";
import { useIsFocused } from "@react-navigation/native";

const fetchTotalTransaction = async () => {
  const token = await getTokenData();
  return fetch(`${api}/api/transaction/total`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((data) => data.json())
    .then(({ data }) => data);
};

const fetchTransactions = async (year, month) => {
  const token = await getTokenData();
  return fetch(`${api}/api/transaction?year=${year}&month=${month}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((data) => data.json())
    .then(({ data }) => data);
};

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState({});
  const { data: transactionAmount, isLoading: transactionAmountLoading } =
    useQuery("transaction-amount", fetchTotalTransaction, {
      placeholderData: 0,
      enabled: isFocused,
    });

  const isFocused = useIsFocused();

  const [currentMonthIndex, setCurrentMonthIndex] = useState();
  const allMonths = useMemo(() => {
    return getAllMonthsOfYear();
  }, []);

  useEffect(() => {
    const month = new Date().toLocaleString("en-us", { month: "long" });
    const year = new Date().getFullYear();
    const Index = allMonths.findIndex((x) => x === `${month} ${year}`);
    setCurrentMonthIndex(Index);
    getUserData().then((res) => setUser(res));
  }, []);

  const selectedDate = useMemo(() => {
    return {
      year: allMonths[currentMonthIndex]?.split(" ")[1],
      month: allMonths[currentMonthIndex]?.split(" ")[0],
    };
  }, [currentMonthIndex]);

  const { data: transactionData, isLoading: transactionLoading } = useQuery(
    [`transaction-${selectedDate.year}-${selectedDate.month}`],
    fetchTransactions.bind(null, selectedDate.year, selectedDate.month),
    { placeholderData: [], enabled: isFocused }
  );

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
        <Header
          greeting={"Good Morning"}
          name={user?.name || "Guest"}
          total={transactionAmount}
        />
        <View
          style={{
            paddingTop: 10,
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TotalMoney
            money={transactionAmountLoading ? 0 : transactionAmount}
          />
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
          transactions={transactionData || []}
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
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    backgroundColor: "#333",
  },
  header: {},
});
