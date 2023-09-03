import { Alert } from "react-native";

const {
  default: AsyncStorage,
} = require("@react-native-async-storage/async-storage");

export const TOKEN_KEY = "TOKEN";
export const USER_KEY = "USER";

exports.storeUserData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(USER_KEY, jsonValue);
    return;
  } catch (e) {
    // saving error
  }
};

exports.storeToeknData = async (value) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, value);
    return;
  } catch (e) {
    // saving error
    console.log("error", e);
  }
};

export const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log("error", e);
  }
};

exports.getTokenData = async () => {
  try {
    const value = await AsyncStorage.getItem(TOKEN_KEY);
    return value;
  } catch (e) {
    // error reading value
    console.log("error", e);
  }
};

export const clearData = async () => {
  await AsyncStorage.clear(async (error) => {
    if (error) {
      Alert.alert("Error", error);
    }
  });
  return;
};

var Buffer = require("buffer/").Buffer;
function atob(str) {
  return Buffer.from(str, "base64").toString("binary");
}

exports.checkTokenExpirationMiddleware = async (token) => {
  const parseJwt = JSON.parse(atob(token.split(".")[1]));
  return parseJwt.exp * 1000 < Date.now();
};
