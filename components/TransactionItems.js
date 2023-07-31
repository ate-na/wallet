import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Replace 'FontAwesome' with the icon library of your choice
import IconCategory from "./IconCategory";
import { useEffect, useState } from "react";

const TransactionItem = ({ item }) => {
  // const [day, setDay] = useState(null);
  // let content;
  // useEffect(() => {
  //   const dayOfItem = new Date(item.date).getDate();
  //   console.log("dayOfItem", dayOfItem, dayOfItem !== day, day);

  //   if (dayOfItem !== day) {
  //     setDay(dayOfItem);
  //     content = <Text>{dayOfItem}</Text>;
  //     console.log("content", content);
  //   }
  // }, [item]);

  return (
    <TouchableOpacity style={styles.container}>
      <IconCategory name={"gift"} size={20} color={"white"} />
      <View style={styles.category}>
        <Text style={styles.categoryText}>{item.category.name}</Text>
      </View>
      <View style={styles.money}>
        <Text
          style={[
            styles.moneyText,
            item.money > 0 ? styles.incomeMoney : styles.expenseMoney,
          ]}
        >
          {item.money}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    paddingLeft: 5,
    borderColor: "white",
  },
  category: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  categoryText: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },
  money: {
    justifyContent: "flex-end", // Align money text to the end
  },
  moneyText: {
    fontWeight: "bold",
  },
  incomeMoney: {
    color: "green",
  },
  expenseMoney: {
    color: "red",
  },
});
