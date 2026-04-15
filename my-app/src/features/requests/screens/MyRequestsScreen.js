import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getRequests } from "../../../services/requestService";

export default function MyRequestsScreen(){

 const [requests,setRequests] = useState([]);

 const loadRequests = async ()=>{
   const data = await getRequests();
   setRequests(data);
 };

 useEffect(()=>{
   loadRequests();
 },[]);

 return(

  <View style={styles.container}>

   <FlatList
    data={requests}
    keyExtractor={(item)=>item.id}
    ListEmptyComponent={<Text>No requests yet</Text>}
    renderItem={({item})=>(
      <View style={styles.card}>
        <Text style={styles.title}>{item.skill}</Text>
        <Text>Status: {item.status}</Text>
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
  marginBottom:10
 },

 title:{
  fontWeight:"bold"
 }

});