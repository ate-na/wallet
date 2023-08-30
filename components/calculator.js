import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const Calculator = ({ onSubmit, loading }) => {
  const [expression, setExpression] = useState("");

  const handleButtonPress = (value) => {
    if (value === "c") return handleClear();
    setExpression((prevExpression) => prevExpression + value);
  };

  const handleClear = () => {
    setExpression("");
  };

  const handleCalculate = () => {
    try {
      const result = eval(expression);
      setExpression(result.toString());
    } catch (error) {
      setExpression("Error");
    }
  };

  onSubmitHandler = () => {
    onSubmit(expression);
  };

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.text}>{expression}</Text>
      </View>
      <View style={styles.row}>
        {[1, 2, 3, null].map((e) => (
          <TouchableOpacity
            key={e}
            onPress={() => handleButtonPress(`${e}`)}
            style={styles.button}
          >
            <Text numberOfLines={2} style={styles.buttonText}>
              {e}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row}>
        {[4, 5, 6, "+"].map((e) => (
          <TouchableOpacity
            key={e}
            onPress={() => handleButtonPress(`${e}`)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{e}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row}>
        {[7, 8, 9, "-"].map((e) => (
          <TouchableOpacity
            key={e}
            onPress={() => handleButtonPress(`${e}`)}
            style={styles.button}
          >
            <Text numberOfLines={2} style={styles.buttonText}>
              {e}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row}>
        {[0, "000", ".", "c"].map((e) => (
          <TouchableOpacity
            key={e}
            onPress={() => handleButtonPress(`${e}`)}
            style={styles.button}
          >
            <Text numberOfLines={2} style={styles.buttonText}>
              {e}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        onPress={/[+-]/.test(expression) ? handleCalculate : onSubmitHandler}
        disabled={loading}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>
          {loading && <ActivityIndicator color="#fff" />}
          {!loading && (/[+-]/.test(expression) ? "=" : "Done")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#403e3e",
  },
  display: {
    width: "100%",
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#5e5e5e",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: "#403e3e",
  },
  opereations: {
    flexDirection: "column",
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: "#403e3e",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  calculatorText: {
    fontSize: 34,
    color: "#fff",
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "90%",
    display: "flex",
    padding: 15,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#569c69",
    borderRadius: 30,
    marginBottom: 13,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
  },
});

export default Calculator;
