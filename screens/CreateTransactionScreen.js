import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Category from "../components/Category";
import Calculator from "../components/calculator";
import CategoryTabItem from "../components/categoryTabItem";
import { useIsFocused } from "@react-navigation/native";
import { api } from "../constants";
import { getTokenData } from "../services/tokenService";
import { useQuery } from "react-query";

const fetchCategory = () => {
  return fetch(`${api}/api/category`)
    .then((res) => res.json())
    .then(({ data }) => data);
};

const CreateTransaction = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState("Expense");
  const [category, setCategory] = useState({});
  const [showCalculator, setShowCalculator] = useState(false);
  const isFocused = useIsFocused();
  const { data: categories } = useQuery("category", fetchCategory, {
    enabled: isFocused,
    placeholderData: [],
  });

  const onActionChange = (action) => setActionType(action);

  const isExpenseTabActive = actionType === "Expense";

  const isIncomeTabActive = actionType === "Income";

  const onSubmitHandler = async (value) => {
    if (value && value > 0 && category._id) {
      setLoading(true);
      const token = await getTokenData();
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
      await response.json();
      setLoading(false);
      navigation.navigate("Home", {});
      navigation.navigate("tab", {});
    }
  };

  const categoryOnPressHandler = (item, showcalender) => {
    setCategory(item);
    setShowCalculator(showcalender);
  };

  if (!isFocused) return <></>;

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
          actionType={actionType}
          categories={
            categories?.filter((e) =>
              isExpenseTabActive ? e.type === "Expense" : e.type === "Income"
            ) || []
          }
          navigation={navigation}
        />
      </View>
      {showCalculator ? (
        <Calculator loading={loading} onSubmit={onSubmitHandler} />
      ) : null}
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
