import Home from "../screens/home";
import CreateTransaction from "../screens/createTransaction";
import { createStackNavigator } from "@react-navigation/stack";
import CreateCategory from "../screens/createCategory";
import Transaction from "./Transaction";
import IconList from "./IconLists";
import SigninScreen from "../screens/SigninScreen";
import SignupScreen from "../screens/SignupScreen";
import App from "../App";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="signin">
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
          title: "add Category",
          headerStyle: { backgroundColor: "orange" },
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="Transaction"
        component={Transaction}
        options={{
          headerShown: false,
          // title: "Transaction",
          // header: ({ scene, previous, navigation }) => {

          //   return <DropTransactions title={"Transaction"} getBack={navigation.goBack} />
          // },
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="Icons"
        component={IconList}
        options={{
          title: "Icons",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="signin"
        component={SigninScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="app"
        component={App}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
