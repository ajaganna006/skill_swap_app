import AsyncStorage from "@react-native-async-storage/async-storage";

const REQUEST_KEY = "USER_REQUESTS";

export const getRequests = async () => {
  try {
    const data = await AsyncStorage.getItem(REQUEST_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const addRequest = async (request) => {
  const existing = await getRequests();
  const updated = [...existing, request];
  await AsyncStorage.setItem(REQUEST_KEY, JSON.stringify(updated));
};