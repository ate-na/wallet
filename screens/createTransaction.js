import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Category from "../components/category";
import Calculator from "./calculator";
import CategoryTabItem from "../components/categoryTabItem";
import CategoryItem from "../components/categoryItem";

const FAKE_DATA = [
  { name: "Food", id: 1, icon: "home", type: "income" },
  { name: "Hobby", id: 2, icon: "home", type: "income" },
  { name: "Clothes", id: 3, icon: "home", type: "income" },
  { name: "Game", id: 4, icon: "home", type: "income" },
  { name: "Study", id: 5, icon: "home", type: "income" },
  { name: "University", id: 6, icon: "home", type: "income" },
  { name: "Gym", id: 7, icon: "home", type: "income" },
  { name: "Swim", id: 8, icon: "home", type: "income" },
  { name: "Travel", id: 9, icon: "home", type: "income" },
  { name: "gift", id: 11, icon: "home", type: "expense" },
  { name: "work", id: 12, icon: "home", type: "expense" },
  { name: "sell", id: 13, icon: "home", type: "expense" },
];

const CreateTransaction = ({ navigation }) => {
  const [actionType, setActionType] = useState("expense");
  const [category, setCategory] = useState({});
  const [showCalculator, setShowCalculator] = useState(false);

  const onActionChange = (action) => setActionType(action);

  const isExpenseTabActive = actionType === "expense";

  const isIncomeTabActive = actionType === "income";

  const onSubmitHandler = (value) => {
    navigation.navigate("Home");
  };

  const categoryOnPressHandler = (item) => {
    setCategory(item);
    setShowCalculator(true);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({ tabBarVisible: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.containerBtn}>
        <CategoryTabItem
          isActive={isExpenseTabActive}
          onActionChange={onActionChange.bind(null, "expense")}
        >
          Expense
        </CategoryTabItem>
        <CategoryTabItem
          isActive={isIncomeTabActive}
          onActionChange={onActionChange.bind(null, "income")}
        >
          Income
        </CategoryTabItem>
      </View>
      <View style={styles.container}>
        <Category
          onPress={categoryOnPressHandler}
          choosen={category}
          categories={FAKE_DATA.filter((e) =>
            isExpenseTabActive ? e.type === "expense" : e.type === "income"
          )}
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
