import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CategoryTabItem = ({ isActive, children, onActionChange }) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        isActive ? { borderBottomWidth: 5, borderBottomColor: "orange" } : {},
      ]}
      onPress={onActionChange.bind(null, "expense")}
    >
      <Text style={[styles.buttonText, isActive ? { color: "orange" } : {}]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryTabItem;

const styles = StyleSheet.create({
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
