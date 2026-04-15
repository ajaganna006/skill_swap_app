import React, { useState, useCallback } from "react";
import { View, FlatList, Text, StyleSheet, Button, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { getSkills, removeSkill } from "../../../services/skillService";

export default function MySkillsScreen(){

 const [skills,setSkills] = useState([]);

 const loadSkills = async () => {
   const data = await getSkills();
   setSkills(data);
 };

 // reload skills every time screen opens
 useFocusEffect(
  useCallback(() => {
    loadSkills();
  }, [])
 );

 const confirmDelete = (id) => {

  Alert.alert(
    "Delete Skill",
    "Are you sure you want to remove this skill?",
    [
      { text: "Cancel", style: "cancel" },
      { text: "Delete",
        style: "destructive",
        onPress: async () => {
          await removeSkill(id);
          loadSkills();
        }
      }
    ]
  );

 };

 return(

  <View style={styles.container}>

   <FlatList
    data={skills}
    keyExtractor={(item)=>item.id}
    ListEmptyComponent={<Text>No skills added yet</Text>}
    renderItem={({item})=>(
      <View style={styles.card}>

        <Text style={styles.title}>{item.name}</Text>
        <Text>{item.description}</Text>

        <View style={styles.button}>
          <Button
           title="Remove Skill"
           color="red"
           onPress={()=>confirmDelete(item.id)}
          />
        </View>

      </View>
    )}
   />

  </View>

 )

}

const styles = StyleSheet.create({

 container:{
  flex:1,
  padding:20
 },

 card:{
  backgroundColor:"#fff",
  padding:16,
  borderRadius:10,
  marginBottom:12,
  elevation:2
 },

 title:{
  fontSize:18,
  fontWeight:"bold"
 },

 button:{
  marginTop:10
 }

});