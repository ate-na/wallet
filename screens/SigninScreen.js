import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Alert } from "react-native";
import { TouchableOpacity } from "react-native";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (!email || !password || password.length < 8) {
      if (!email || !password) {
        Alert.alert("Validation Error", "Please fill correct all fields");
      }
      // else if (password.length < 8) {
      //   Alert.alert("Validation Error", "Password can not be less than 3");
      // }
      // return;
    }
    console.log("signiin");
    try {
      const response = await fetch(
        "http://192.168.40.71:3000/api/auth/signin",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const res = await response.json();
      console.log("dataaaaaaaaaa", res);
      if (res.status === 200 || res.status === 201) {
        AsyncStorage.setItem("token", res.data.token);
        AsyncStorage.setItem("user", res.data.user);
      } else {
        Alert.alert("Validation Error", res.data);
      }
      // console.log("ssssssssssss", res);

      setEmail("");
      setPassword("");
      // navigation.navigate("tab");
    } catch (error) {
      console.log("errorrr", error.message);
      Alert.alert("Validation Error", error.message);
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
  },
});

export default SigninScreen;
