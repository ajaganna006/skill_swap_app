import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "USER_SKILLS";

export const getSkills = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.log("Error loading skills", e);
    return [];
  }
};

export const addSkill = async (skill) => {
  try {
    const existing = await getSkills();
    const updated = [...existing, skill];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.log("Error saving skill", e);
  }
};
export const removeSkill = async (id) => {

 const existing = await getSkills();

 const updated = existing.filter(skill => skill.id !== id);

 await AsyncStorage.setItem("USER_SKILLS", JSON.stringify(updated));

};