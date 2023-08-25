import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { TouchableOpacity } from "react-native";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { api } from "../constants";
import {
  getTokenData,
  storeToeknData,
  storeUserData,
} from "../services/tokenService";
import { useIsFocused } from "@react-navigation/native";

const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    const getToken = async () => {
      const token = await getTokenData();
      if (typeof token === "string") {
        navigation.navigate("tab");
      }
    };

    getToken().then();
  }, [isFocused]);

  const handleSignIn = async () => {
    console.log("condition", !email || !password);
    if (!email || !password || password.length < 8) {
      if (!email || !password) {
        console.log("hhhhhhhhhhhhhhhhhhh");
        return Alert.alert(
          "Validation Error",
          "Please fill correct all fields"
        );
      }
      // else if (password.length < 8) {
      //   Alert.alert("Validation Error", "Password can not be less than 3");
      // }
      // return;
    }
    try {
      const response = await fetch(`http://${api}:3000/api/auth/signin`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const res = await response.json();
      console.log("signiin", await getTokenData());
      console.log("dataaaaaaaaaa", res);
      if (res.status === 200 || res.status === 201) {
        await storeToeknData(res.data.token);
        await storeUserData(res.data.user);
        setEmail("");
        setPassword("");
        navigation.navigate("tab");
      } else {
        return Alert.alert("Validation Error", res.data);
      }
    } catch (error) {
      console.log("errorrr", error.message);
      return Alert.alert("Validation Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "orange" }}>Sign In</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor={"orange"}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholderTextColor={"orange"}
      />
      {/* <Button title="Sign In" onPress={handleSignIn} /> */}
      <TouchableOpacity
        onPress={handleSignIn}
        style={{
          backgroundColor: "orange",
          padding: 15,
          width: "50%",
          paddingHorizontal: 20,
          borderRadius: 30,
        }}
      >
        <Text style={{ textAlign: "center" }}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("signup")}>
        <Text style={{ color: "orange", paddingTop: 15 }}>
          Don't have an account?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#222",
    alignItems: "center",
  },
  input: {
    width: "80%",
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "orange",
    borderRadius: 20,
    color: "orange",
  },
});

export default SigninScreen;
