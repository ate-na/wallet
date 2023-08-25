import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/home";
import CreateTransaction from "./screens/createTransaction";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Account from "./screens/account";
import Report from "./screens/Report";
import StackNavigator from "./components/stackNavigator";
import Icon from "react-native-vector-icons/FontAwesome"; // Replace 'FontAwesome' with the icon library of your choice
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SigninScreen from "./screens/SigninScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  const token = AsyncStorage.getItem("token");
  console.log("token", token);
  AsyncStorage.clear();
  console.log("token", token);

  const iconHomeTab = (name) => {
    return <Icon name="exchange" size={name.size} color={name.color} />;
  };

  const iconAccountTab = (name) => {
    return <Icon name="user" size={name.size} color={name.color} />;
  };

  const iconReportTab = (name) => {
    return <Icon name="pie-chart" size={name.size} color={name.color} />;
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        sceneContainerStyle={styles.container}
        screenOptions={{
          tabBarStyle: { backgroundColor: "#403e3e" },
          headerStyle: { backgroundColor: "#403e3e" },
          tabBarActiveTintColor: "#fc7f03",
          headerTintColor: "#fc7f03",
        }}
      >
        <Tab.Screen
          name="Home"
          component={StackNavigator}
          options={{
            headerShown: false,
            tabBarIcon: iconHomeTab,
          }}
        />
        <Tab.Screen
          name="Report"
          component={Report}
          options={{
            tabBarIcon: iconReportTab,
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{ tabBarIcon: iconAccountTab, headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    // backgroundColor: "red",
  },
});
