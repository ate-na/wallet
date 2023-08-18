import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native";
import { View } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Replace 'FontAwesome' with the icon library of your choice

const HeaderTransaction = ({ title, getBack, item }) => {
  const deleteTransaction = async () => {
    try {
      const token = AsyncStorage.getItem("token");
      const response = await fetch(
        `http://192.168.40.71:3000/api/transaction/${item._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const res = await response.json();
      getBack();
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={getBack}>
          <Icon
            name="angle-left"
            color={"white"}
            size={25}
            style={{ paddingLeft: 8 }}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <TouchableOpacity onPress={deleteTransaction}>
        <Icon name="trash" color={"white"} size={25} />
      </TouchableOpacity>
    </View>
  );
};
export default HeaderTransaction;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#77cc74",
    padding: 12,
    paddingTop: 30,
    height: 100,

    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margins: 5,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 25,
  },
});
