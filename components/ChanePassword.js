import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { api } from "../constants";
import { getTokenData, getUserData } from "../services/tokenService";

const ChangePassword = ({ closeModal }) => {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handlePassword = async () => {
    if (!password || !confirmPassword || password !== confirmPassword) {
      return Alert.alert("Validation Error", "confirm not match");
    }

    const token = await getTokenData();
    const user = await getUserData();

    const respose = await fetch(`${api}/api/auth/change-password/${user._id}`, {
      method: "PATCH",
      body: JSON.stringify({
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await respose.json();
    if (res.status === 200 || res.status === 201) {
      Alert.alert("Succesfully");
      setConfirmPassword("");
      setPassword("");
      closeModal();
    } else {
      return Alert.alert("Error");
    }
  };

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Content of your half-opened modal goes here */}
      <Text style={{ color: "orange" }}>Change Password</Text>
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
      <TouchableOpacity onPress={handlePassword} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          closeModal();
        }}
        style={styles.closeButton}
      >
        <Text style={{ color: "white" }}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
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
  buttonContainer: {
    width: "80%",
    display: "flex",
    padding: 15,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "orange",
    borderRadius: 30,
    marginBottom: 13,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 12,
    color: "white",
  },
});
