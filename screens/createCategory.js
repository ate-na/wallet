import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { RadioButton } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import IconCategory from "../components/IconCategory";
import { useContext } from "react";

const CreateCategory = ({ route, navigation }) => {
  const [type, setType] = useState("Expense");
  const [icon, setIcon] = useState("question");
  const [category, setCategory] = useState(null);

  const handleRadioPress = (option) => {
    setType(option);
  };

  const onPress = () => {
    navigation.navigate("Icons");
  };

  useEffect(() => {
    setIcon(route?.params?.item || "question");
  }, [route?.params]);

  // Handle form submission here
  const submitHandlerBtn = async () => {
    try {
      const response = await fetch("http://192.168.21.71:3000/api/category", {
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
      const res = await response.json();
      navigation.navigate("CategoryList", { category: res.data });
    } catch (error) {
      console.log("error", error);
    }

    navigation.navigate("CategoryList");
  };

  return (
    <View style={styles.container}>
      {/* Type */}
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

      {/* Category */}
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

      {/* Save Button */}
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
