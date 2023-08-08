import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    // Implement your sign-in logic here
    // For example, send the email and password to a server
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "orange" }}>Sign In</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
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
