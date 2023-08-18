import { StyleSheet, Text } from "react-native";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Account = ({ navigation }) => {
  const user = AsyncStorage.getItem("token");

  const onPresCategoriesHandler = () => {
    console.log("onclick");
  };

  const logOutHandler = () => {
    AsyncStorage.removeItem("token");
    navigation.navigate("signin");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 30, color: "orange", fontWeight: "bold" }}>
          Account
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon name="user-circle" size={50} color="white" />
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 18 }}>
              {user?.name}
            </Text>
            <Text style={{ color: "#858c87", fontSize: 15 }}>
              {user?.email}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.header}>
        <Text style={{ fontSize: 20, color: "orange", fontWeight: "bold" }}>
          General
        </Text>
        <TouchableOpacity
          style={{ display: "flex", flexDirection: "row", paddingVertical: 15 }}
          onPress={onPresCategoriesHandler}
        >
          <Icon name="folder" size={20} color={"white"} />
          <Text style={{ color: "white", fontSize: 15, marginHorizontal: 20 }}>
            Categories
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Text style={{ fontSize: 20, color: "orange", fontWeight: "bold" }}>
          Security
        </Text>
        <TouchableOpacity style={{ paddingVertical: 15 }}>
          <Text style={{ color: "white", fontSize: 15, marginHorizontal: 20 }}>
            Change Password
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Text style={{ fontSize: 20, color: "orange", fontWeight: "bold" }}>
          About
        </Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Icon name="tag" color={"white"} size={25} />
          <View style={{ paddingVertical: 15 }}>
            <Text
              style={{ color: "white", fontSize: 15, marginHorizontal: 20 }}
            >
              Version
            </Text>
            <Text
              style={{ color: "#858c87", fontSize: 15, marginHorizontal: 20 }}
            >
              1.2.2
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.header}>
        <Text style={{ fontSize: 20, color: "orange", fontWeight: "bold" }}>
          Other
        </Text>
        <View
          style={{ display: "flex", flexDirection: "row", paddingVertical: 10 }}
        >
          <Icon name="sign-out" size={20} color={"white"} />
          <TouchableOpacity onPress={logOutHandler}>
            <Text
              style={{ color: "white", fontSize: 15, marginHorizontal: 20 }}
            >
              LogOut
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    paddingLeft: 30,
    display: "flex",
    paddingVertical: 50,
  },
  header: {
    marginVertical: 10,
  },
});
