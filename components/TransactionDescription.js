import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Replace 'FontAwesome' with the icon library of your choice
import HeaderTransaction from "./HeaderTransaction";

const Transaction = ({ route, navigation }) => {
  const transaction = route.params;
  return (
    <View style={{ flex: 1 }}>
      <HeaderTransaction
        title={"Transaction"}
        getBack={navigation.goBack}
        item={transaction}
      />
      <View style={styles.container}>
        <View style={styles.items}>
          <View style={styles.icon}>
            <Icon color={"white"} size={20} name={transaction.category.icon} />
          </View>
          <View style={styles.description}>
            <Text style={styles.text}>Category</Text>
            <Text style={styles.text}>{transaction.category?.title}</Text>
          </View>
        </View>
        <View style={styles.items}>
          <View style={styles.icon}>
            <Icon color={"white"} size={20} name={"money"} />
          </View>
          <View>
            <Text style={styles.text}>Money</Text>
            <Text style={styles.text}>{transaction.money}</Text>
          </View>
        </View>
        <View style={styles.items}>
          <View style={styles.icon}>
            <Icon color={"white"} size={20} name={"calendar"} />
          </View>
          <View>
            <Text style={styles.text}>Date</Text>
            <Text style={styles.text}>{transaction.date}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Transaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#333",
  },
  items: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 15,
  },
  icon: {
    paddingVertical: 17,
    marginRight: 20,
  },
  text: {
    color: "white",
    paddingVertical: 3,
  },
  description: {},
});
