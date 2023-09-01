import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { RadioButton } from "react-native-paper";
import IconCategory from "../components/IconCategory";
import { api } from "../constants";

const CreateCategory = ({ route, navigation }) => {
  const [type, setType] = useState("Expense");
  const [icon, setIcon] = useState("question");
  const [category, setCategory] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleRadioPress = (option) => {
    setType(option);
  };

  const onPress = () => {
    navigation.navigate(
      "Icons",
      route.params.category ? { category: route.params.category } : {}
    );
  };

  useEffect(() => {
    setCategory(route?.params?.category || null);
    if (route?.params?.category?.type) {
      setType(route?.params?.category?.type);
    }
    if (route?.params?.isEdit) {
      setIsEdit(true);
    }
    if (!!route?.params?.category?.title) {
      setIsEdit(true);
      setType(route?.params?.category?.type);
      setCategory(route?.params?.category?.title);
    }
    setIcon(
      route?.params?.item?.item || route?.params?.category?.icon || "question"
    );
  }, [route?.params]);

  const submitHandlerBtn = async () => {
    let response;
    try {
      if (isEdit && route?.params?.category?.title) {
        response = await fetch(
          `${api}/api/category/${route.params.category._id}`,
          {
            method: "PATCH",
            body: JSON.stringify({
              title: category,
              type: type,
              icon,
            }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
      } else {
        response = await fetch(`${api}/api/category`, {
          method: "POST",
          body: JSON.stringify({
            title: category,
            type: type,
            icon,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
      }
      const res = await response.json();
      navigation.navigate(!isEdit ? "CategoryList" : "CategoryPage", {
        category: res.data,
        isEdit,
      });
      setCategory("");
      setIcon("");
      setIsEdit(false);
      setType("Expense");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Type</Text>
      <RadioButton.Group
        onValueChange={handleRadioPress}
        value={type}
        uncheckedColor="red"
      >
        <View style={styles.rowContainer}>
          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="Expense"
              color="#569c69"
              uncheckedColor="white"
            />
            <Text style={styles.radioButtonLabel}>Expense</Text>
          </View>
          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="Income"
              color="#569c69"
              uncheckedColor="white"
            />
            <Text style={styles.radioButtonLabel}>Income</Text>
          </View>
        </View>
      </RadioButton.Group>

      <View style={styles.categoryContainer}>
        <Text style={styles.label}>Category</Text>
        <View style={styles.inputContainer}>
          <IconCategory
            isActive={true}
            name={icon}
            color={"white"}
            size={24}
            isTouchable={true}
            onPress={onPress}
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            onChangeText={(text) => setCategory(text)}
            value={category}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={submitHandlerBtn}
      >
        <Text style={styles.buttonText}>SAVE CATEGORY</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#444",
  },
  label: {
    color: "white",
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButtonLabel: {
    color: "white",
    marginLeft: 5,
  },
  categoryContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#777",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 15,
    color: "white",
  },
  buttonContainer: {
    width: "100%",
    padding: 15,
    alignItems: "center",
    backgroundColor: "#569c69",
    borderRadius: 30,
    marginVertical: 30,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
});

export default CreateCategory;
