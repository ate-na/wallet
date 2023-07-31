import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import IconButtonWithPlus from "../components/Button";
import MonthList from "../components/MonthList";
import Header from "../components/Header";
import Transactions from "./Transaction";

const Home = ({ navigation }) => {
  const handlePressBtn = () => {
    navigation.navigate("CategoryList");
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header greeting={"Good Morning"} name={"Guest"} />
      </View>
      <MonthList />
      <Transactions />
      <IconButtonWithPlus onPress={handlePressBtn} />
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    backgroundColor: "#555",
    // alignItems: "center",
    // justifyContent: "center",
  },
  header: {},
});
