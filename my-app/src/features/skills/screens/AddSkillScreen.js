import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button, Alert } from "react-native";
import { addSkill } from "../../../services/skillService";

export default function AddSkillScreen({ navigation }) {

  const [name,setName] = useState("");
  const [description,setDescription] = useState("");

  const saveSkill = async () => {

    if(!name || !description){
      Alert.alert("Error","Please fill all fields");
      return;
    }

    const skill = {
      id: Date.now().toString(),
      name,
      description
    };

    await addSkill(skill);

    Alert.alert("Success","Skill added successfully");

    setName("");
    setDescription("");

    navigation.navigate("My Skills");
  };

  return(

    <View style={styles.container}>

      <TextInput
        placeholder="Skill name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Description"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      <Button title="Save Skill" onPress={saveSkill} />

    </View>

  )

}

const styles = StyleSheet.create({

 container:{
  flex:1,
  padding:20
 },

 input:{
  borderWidth:1,
  borderColor:"#ccc",
  borderRadius:8,
  padding:12,
  marginBottom:15
 }

});