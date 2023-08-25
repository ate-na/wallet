import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Category from "../components/category";
import Calculator from "../components/calculator";
import CategoryTabItem from "../components/categoryTabItem";
import { useIsFocused } from "@react-navigation/native";

const CreateTransaction = ({ route, navigation }) => {
  const [actionType, setActionType] = useState("Expense");
  const [category, setCategory] = useState({});
  const [showCalculator, setShowCalculator] = useState(false);
  const [categories, setCategories] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.21.71:3000/api/category");
        const jsonData = await response.json();
        setCategories(jsonData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isFocused]);

  const onActionChange = (action) => setActionType(action);

  const isExpenseTabActive = actionType === "Expense";

  const isIncomeTabActive = actionType === "Income";

  const onSubmitHandler = async (value) => {
    if (value && value > 0 && category._id) {
      const response = await fetch(
        "http://192.168.21.71:3000/api/transaction",
        {
          method: "POST",
          body: JSON.stringify({
            category: category._id,
            date: new Date(),
            money: value,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const res = await response.json();
    }
    navigation.navigate("Home", { money: value, category });
  };

  const categoryOnPressHandler = (item, showcalender) => {
    setCategory(item);
    setShowCalculator(showcalender);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({ tabBarVisible: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.containerBtn}>
        <CategoryTabItem
          isActive={isExpenseTabActive}
          onActionChange={onActionChange.bind(null, "Expense")}
        >
          Expense
        </CategoryTabItem>
        <CategoryTabItem
          isActive={isIncomeTabActive}
          onActionChange={onActionChange.bind(null, "Income")}
        >
          Income
        </CategoryTabItem>
      </View>
      <View style={styles.container}>
        <Category
          onPress={categoryOnPressHandler}
          choosen={category}
          categories={
            categories?.filter((e) =>
              isExpenseTabActive ? e.type === "Expense" : e.type === "Income"
            ) || []
          }
          navigation={navigation}
        />
        {showCalculator ? <Calculator onSubmit={onSubmitHandler} /> : null}
      </View>
    </View>
  );
};

export default CreateTransaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 10,
    backgroundColor: "#403e3e",
  },
  containerBtn: {
    paddingTop: 10,
    margin: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonContainer: {
    width: "30%",
    display: "flex",
    padding: 15,
    alignContent: "center",
    justifyContent: "center",
    marginBottom: 13,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
  },
});
