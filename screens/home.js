import { StyleSheet, View } from "react-native";
import IconButtonWithPlus from "../components/Button";
import TabMenu from "./tabMenu";

const Home = ({ navigation }) => {
  const handlePressBtn = () => {
    navigation.navigate("CategoryList");
  };
  return (
    <View style={styles.container}>
      <IconButtonWithPlus onPress={handlePressBtn} />
      <TabMenu />
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
