import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Category from "../components/category";
import Calculator from "./calculator";

const exposecategories = [
  { name: "food", id: 1, icon: null },
  { name: "a", id: 2, icon: null },
  { name: "b", id: 3, icon: null },
  { name: "c", id: 4, icon: null },
  { name: "d", id: 5, icon: null },
  { name: "e", id: 6, icon: null },
  { name: "c", id: 7, icon: null },
  { name: "d", id: 8, icon: null },
  { name: "e", id: 9, icon: null },
];

const incomecategories = [
  { name: "gift", id: 11, icon: null },
  { name: "work", id: 12, icon: null },
  { name: "sell", id: 13, icon: null },
];

const CreateTransaction = ({ navigation }) => {
  const [exposeBtn, setExposeBtn] = useState(true);
  const [incomeBtn, setIncomeBtn] = useState(null);
  const [category, setCategory] = useState({});
  const [showCalculator, setShowCalculator] = useState(false);

  const exposeBtnPressHandler = (e) => {
    if (incomeBtn) {
      setIncomeBtn(false);
    }
    setExposeBtn((pre) => !pre);
  };

  const onSubmitHandler = (value) => {
    console.log("value", value);
    console.log("category", category);
    navigation.navigate("Home");
  };

  const categoryOnPressHandler = (item) => {
    setCategory(item);
    setShowCalculator(true);
  };

  const incomeBtnPressHandler = (e) => {
    if (exposeBtn) {
      setExposeBtn(false);
    }
    setIncomeBtn((pre) => !pre);
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerBtn}>
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            exposeBtn
              ? { borderBottomWidth: 5, borderBottomColor: "orange" }
              : {},
          ]}
          onPress={exposeBtnPressHandler}
        >
          <Text
            style={[styles.buttonText, exposeBtn ? { color: "orange" } : {}]}
          >
            Expose
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            incomeBtn
              ? { borderBottomWidth: 5, borderBottomColor: "orange" }
              : {},
          ]}
          onPress={incomeBtnPressHandler}
        >
          <Text
            style={[styles.buttonText, incomeBtn ? { color: "orange" } : {}]}
          >
            Income
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Category
          onPress={categoryOnPressHandler}
          categories={
            exposeBtn ? exposecategories : incomeBtn ? incomecategories : []
          }
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
