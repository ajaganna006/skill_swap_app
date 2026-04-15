import React from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import SkillCard from "../../../components/SkillCard";
import { addRequest } from "../../../services/requestService";
const demoSkills = [
  { id: "1", name: "React Development", description: "Learn React step by step" },
  { id: "2", name: "Python Programming", description: "Learn Python for AI & ML" },
  { id: "3", name: "UI/UX Design", description: "Design modern mobile apps" },
];

export default function SkillListScreen({ navigation }) {

  const openSkill = (skill) => {
    navigation.navigate("SkillDetails", { skill });
  };

  const requestSkill = async (skill) => {

 const request = {
   id: Date.now().toString(),
   skill: skill.name,
   status: "Pending"
 };

 await addRequest(request);

 alert("Request sent successfully");

};
  
  return (
    <View style={styles.container}>
      <FlatList
        data={demoSkills}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SkillCard
            skill={item}
            onPress={openSkill}
            onRequest={requestSkill}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});