import AsyncStorage from "@react-native-async-storage/async-storage";

const PROFILE_KEY = "USER_PROFILE";

export const getProfile = async () => {
  try {
    const data = await AsyncStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log("Error loading profile", error);
    return null;
  }
};

export const saveProfile = async (profile) => {
  try {
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.log("Error saving profile", error);
  }
};
