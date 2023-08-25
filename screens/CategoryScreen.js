import { StyleSheet, View } from "react-native";
import CategoryTabItem from "../components/categoryTabItem";
import Category from "../components/Category";
import { useEffect, useState } from "react";
import { api } from "../constants";
import { useIsFocused } from "@react-navigation/native";

const CategoryPage = ({ route, navigation, setShowCaculatorHandler }) => {
  const [actionType, setActionType] = useState("Expense");
  const [categories, setCategories] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [category, setCategory] = useState();
  const isFocused = useIsFocused();

  const onActionChange = (action) => setActionType(action);

  const categoryOnPressHandler = (item, showCalculator) => {
    console.log("categoryOnPressHandler", item, showCalculator);
    setCategory(item);
    if (!isEdit) {
      setShowCaculatorHandler(showCalculator);
    }
    // setShowHandler(showCalculator);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("paramsss", route.params.isEdit);
        const response = await fetch(`http://${api}:3000/api/category`);
        const jsonData = await response.json();
        setCategories(jsonData.data);
        setIsEdit(route.params.isEdit);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isFocused]);

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
