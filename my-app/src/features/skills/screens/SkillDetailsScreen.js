import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SkillDetailsScreen({ route }) {

 const skill = route?.params?.skill;

 if(!skill){
  return(
    <View style={styles.container}>
      <Text>No skill selected</Text>
    </View>
  )
 }

 return(

   <View style={styles.container}>

     <Text style={styles.title}>{skill.name}</Text>

     <Text style={styles.desc}>
       {skill.description}
     </Text>

   </View>

 )

}

const styles = StyleSheet.create({

 container:{
  flex:1,
  padding:25
 },

 title:{
  fontSize:26,
  fontWeight:"bold"
 },

 desc:{
  marginTop:10,
  fontSize:16
 }

});
