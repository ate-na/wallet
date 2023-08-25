import { View } from "react-native";
import IconCategory from "./IconCategory";
import { StyleSheet } from "react-native";
import { Text } from "react-native";

const TotalReport = ({ title, amount }) => {
  return (
    <View style={styles.container}>
      <IconCategory
        name={title === "Income" ? "arrow-down" : "arrow-up"}
        size={20}
        color={title === "Income" ? "green" : "red"}
      />
      <View style={{ paddingTop: 20 }}>
        <Text style={{ color: "#858c87", fontSize: 15 }}>{title}</Text>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          ${amount}
        </Text>
      </View>
    </View>
  );
};
export default TotalReport;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "44%",
    backgroundColor: "#555",
    borderRadius: 20,
    padding: 20,
    justifyContent: "space-around",
  },
});
