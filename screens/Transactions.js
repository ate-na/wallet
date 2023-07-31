import { StyleSheet, Text, View } from "react-native";
import TransactionItem from "../components/TransactionItems";
import { useState } from "react";

const TransactionList = [
  {
    date: "2023-07-31",
    money: 10000,
    category: { name: "sell", icon: "sell", type: "income" },
  },
  {
    date: "2023-07-31",
    money: -10000,
    category: { name: "food", icon: "food", type: "Expense" },
  },
  {
    date: "2023-07-30",
    money: -10000,
    category: { name: "loan", icon: "loan", type: "Expense" },
  },
  {
    date: "2023-07-30",
    money: 10000,
    category: { name: "gift", icon: "gift", type: "Expense" },
  },
  {
    date: "2023-07-28",
    money: 10000,
    category: { name: "food", icon: "food", type: "Expense" },
  },
];

const Transactions = ({ month, onPress }) => {
  let day = null;

  const onPressTransactionItem = (item) => {
    onPress(item)
  }

  const x = (e) => {
    return (
      <View>
        <Text style={styles.container}>{`${month} ${day}`}</Text>
        <TransactionItem item={e} />
      </View>
    );
  };

  const checkDay = (item) => {
    const dayOfItem = new Date(item.date).getDate();
    if (dayOfItem !== day) {
      day = dayOfItem;
      return false;
    }
    return true;
  };
  return (
    <View>
      {TransactionList.map((e) =>
        checkDay(e) ? (
          <View>
            <TransactionItem item={e} onPress={onPressTransactionItem} />
          </View>
        ) : (
          x(e)
        )
      )}
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingLeft: 5,
    fontWeight: "bold",
    color: "white",
  },
});
