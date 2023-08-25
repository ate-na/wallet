import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Alert } from "react-native";
import { TouchableOpacity } from "react-native";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { api } from "../constants";
import { storeToeknData, storeUserData } from "../services/tokenService";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (!email || !password) {
      return Alert.alert("Validation Error", "Please fill in all fields");
    }

    if (password !== confirmPassword) {
      return Alert.alert(
        "Validation Error",
        "password and confirm password are not match"
      );
    }

    try {
      const response = await fetch(`http://${api}:3000/api/auth/signup`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          name,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const res = await response.json();
      console.log("response is", res);
      if (res.status === 200 || res.status === 201) {
        await storeToeknData(res.data.token);
        await storeUserData(res.data.user);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setName("");
        navigation.navigate("app");
      } else {
        return Alert.alert("Validation Error", res.data);
      }
    } catch (error) {
      return Alert.alert("Validation Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "orange" }}>Sign Up</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor={"orange"}
      />
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
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

      <TextInput
        placeholder="confirmPassword"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        placeholderTextColor={"orange"}
      />
      <TouchableOpacity
        onPress={handleSignUp}
        style={{
          backgroundColor: "orange",
          padding: 15,
          width: "50%",
          paddingHorizontal: 20,
          borderRadius: 30,
        }}
      >
        <Text style={{ textAlign: "center" }}>Sign Up</Text>
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

export default SignupScreen;
