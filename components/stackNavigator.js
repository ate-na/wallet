import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/home";
import CreateTransaction from "../screens/createTransaction";
import { createStackNavigator } from "@react-navigation/stack";
import CreateCategory from "../screens/createCategory";
import Transaction from "./Transaction";
import IconList from "./IconLists";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Good afternoon",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CategoryList"
        component={CreateTransaction}
        options={{
          title: "Add Transactions",
          headerStyle: { backgroundColor: "#77cc74" },
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="createCategory"
        component={CreateCategory}
        options={{
          title: "add Transaction",
          headerStyle: { backgroundColor: "orange" },
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="Transaction"
        component={Transaction}
        options={{
          title: "add Transaction",
          headerStyle: { backgroundColor: "#77cc74" },
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="Icons"
        component={IconList}
        options={{
          title: "Icons"
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default StackNavigator;
