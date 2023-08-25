import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Category from "../components/Category";
import Calculator from "../components/calculator";
import CategoryTabItem from "../components/categoryTabItem";
import { useIsFocused } from "@react-navigation/native";
import { api } from "../constants";
import {
  getToeknData,
  getTokenData,
  getUserData,
} from "../services/tokenService";

const CreateTransaction = ({ route, navigation }) => {
  const [actionType, setActionType] = useState("Expense");
  const [category, setCategory] = useState({});
  const [showCalculator, setShowCalculator] = useState(false);
  const [categories, setCategories] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api}/api/category`);
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
      const token = await getTokenData();
      console.log("tokenis", token);
      const response = await fetch(`${api}/api/transaction`, {
        method: "POST",
        body: JSON.stringify({
          category: category._id,
          date: new Date(),
          money: value,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await response.json();
      console.log("response", res);
      setActionType("Expense");
      setCategory({});
      setShowCalculator(false);
      setCategories([]);

      navigation.navigate("Home", { money: value, category });
      navigation.navigate("tab", {});
    }
  };

  const categoryOnPressHandler = (item, showcalender) => {
    setCategory(item);
    setShowCalculator(showcalender);
  };

  const setShowCaculatorHandler = (showcalender) => {
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
          {console.log("actionType96", actionType)}
        </CategoryTabItem>
      </View>
      <View style={styles.container}>
        <Category
          onPress={categoryOnPressHandler}
          choosen={category}
          actionType={actionType}
          categories={
            categories?.filter((e) =>
              isExpenseTabActive ? e.type === "Expense" : e.type === "Income"
            ) || []
          }
          navigation={navigation}
        />
      </View>
      {showCalculator ? <Calculator onSubmit={onSubmitHandler} /> : null}
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
