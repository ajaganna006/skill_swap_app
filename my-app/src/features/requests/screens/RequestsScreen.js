import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";

export default function RequestsScreen(){

 const [requests,setRequests] = useState([
   { id:"1", user:"John", skill:"React", status:"Pending" },
   { id:"2", user:"Alice", skill:"Python", status:"Pending" }
 ]);

 const updateStatus = (id,status)=>{

   const updated = requests.map(r =>
     r.id === id ? {...r,status} : r
   );

   setRequests(updated);
 };

 return(

  <View style={styles.container}>

   <FlatList
    data={requests}
    keyExtractor={(item)=>item.id}
    renderItem={({item})=>(
      <View style={styles.card}>

        <Text style={styles.title}>
          {item.user} requested {item.skill}
        </Text>

        <Text>Status: {item.status}</Text>

        {item.status === "Pending" && (

          <View style={styles.buttons}>
            <Button
             title="Accept"
             onPress={()=>updateStatus(item.id,"Accepted")}
            />

            <Button
             title="Reject"
             onPress={()=>updateStatus(item.id,"Rejected")}
            />
          </View>

        )}

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
  fontWeight:"bold",
  marginBottom:5
 },

 buttons:{
  flexDirection:"row",
  justifyContent:"space-between",
  marginTop:10
 }

});