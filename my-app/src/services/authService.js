import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "REGISTERED_USER";

export const registerUser = async (user) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.log("Register error:", error);
  }
};

export const getRegisteredUser = async () => {
  try {
    const data = await AsyncStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log("Fetch user error:", error);
    return null;
  }
};