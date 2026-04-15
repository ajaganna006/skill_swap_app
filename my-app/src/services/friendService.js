import AsyncStorage from "@react-native-async-storage/async-storage";

const FRIEND_KEY = "FRIENDS";

export const getFriends = async () => {
 const data = await AsyncStorage.getItem(FRIEND_KEY);
 return data ? JSON.parse(data) : [];
};

export const addFriend = async (user) => {

 const existing = await getFriends();

 const updated = [...existing, user];

 await AsyncStorage.setItem(FRIEND_KEY, JSON.stringify(updated));
};

export const removeFriend = async (id) => {

 const existing = await getFriends();

 const updated = existing.filter(friend => friend.id !== id);

 await AsyncStorage.setItem(FRIEND_KEY, JSON.stringify(updated));

};