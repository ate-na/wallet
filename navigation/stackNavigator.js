import HomeScreen from "../screens/HomeScreen";
import CreateTransaction from "../screens/CreateTransactionScreen";
import { createStackNavigator } from "@react-navigation/stack";
import CreateCategory from "../screens/CreateCategoryScreen";
import Transaction from "../components/TransactionDescription";
import IconList from "../components/IconLists";
import SigninScreen from "../screens/SigninScreen";
import SignupScreen from "../screens/SignupScreen";
import App from "../App";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import TabNavigation from "./TabNavigation";
import CategoryScreen from "../screens/CategoryScreen";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer independent="true">
        <Stack.Navigator initialRouteName="signin">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
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
            name="CategoryPage"
            component={CategoryScreen}
            options={{
              title: "Category",
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
            name="tab"
            component={TabNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="app"
            component={App}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default StackNavigator;
