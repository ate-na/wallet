import { StyleSheet, Text, View } from "react-native";
import TransactionItem from "./TransactionItems";

const Transactions = ({ month, onPress, transactions }) => {
  let day = null;

  const onPressTransactionItem = (item) => {
    onPress(item);
  };

  const x = (e) => {
    return (
      <View>
        <Text style={styles.container}>{`${month} ${day}`}</Text>
        <TransactionItem
          item={e}
          onPress={onPressTransactionItem}
          key={e._id}
        />
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
      {transactions.map((e) =>
        checkDay(e) ? (
          <View>
            <TransactionItem
              item={e}
              onPress={onPressTransactionItem}
              key={e._id}
            />
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
