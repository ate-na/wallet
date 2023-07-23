import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/home";
import CreateTransaction from "./screens/createTransaction";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Good afternoon" }}
        />
        <Stack.Screen
          name="CategoryList"
          component={CreateTransaction}
          options={{ title: "Add Transactions" }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6b6a68",
    alignItems: "center",
    justifyContent: "center",
  },
});
