import { StyleSheet, View } from "react-native";
import CategoryTabItem from "../components/categoryTabItem";
import Category from "../components/category";
import { useState } from "react";
import { api } from "../constants";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "react-query";

const fetchCategory = () => {
  return fetch(`${api}/api/category`)
    .then((res) => res.json())
    .then(({ data }) => data);
};

const CategoryPage = ({ navigation, setShowCaculatorHandler }) => {
  const [actionType, setActionType] = useState("Expense");
  const [isEdit, setIsEdit] = useState(true);
  const [category, setCategory] = useState();
  const isFocused = useIsFocused();
  const { data: categories } = useQuery("category", fetchCategory, {
    enabled: isFocused,
    placeholderData: [],
  });

  const onActionChange = (action) => setActionType(action);

  const categoryOnPressHandler = (item, showCalculator) => {
    setCategory(item);
    // if (!isEdit) {
    //   setShowCaculatorHandler(showCalculator);
    // }
  };

  const isExpenseTabActive = actionType === "Expense";

  const isIncomeTabActive = actionType === "Income";
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
          isEdit={isEdit}
          actionType={actionType}
          choosen={category}
          categories={
            categories?.filter((e) =>
              isExpenseTabActive ? e.type === "Expense" : e.type === "Income"
            ) || []
          }
          navigation={navigation}
        />
      </View>
    </View>
  );
};

export default CategoryPage;
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
