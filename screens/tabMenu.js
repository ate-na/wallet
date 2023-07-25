import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Account from "./account";
import Report from "./Report";
import Home from "./home";
import { StyleSheet, View } from "react-native";

const TabMenu = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator sceneContainerStyle={styles.container}>
      <Tab.Screen name="Account" component={Account} />
      {/* <Tab.Screen name="Wallet" component={Home} /> */}
      <Tab.Screen name="Report" component={Report} />
    </Tab.Navigator>
  );
};

export default TabMenu;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
  },
});
