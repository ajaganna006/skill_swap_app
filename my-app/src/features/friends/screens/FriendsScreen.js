import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";

import { getFriends, addFriend, removeFriend } from "../../../services/friendService";

const mockUsers = [

 { id:"1", name:"John", skill:"React" },
 { id:"2", name:"Alice", skill:"Python" },
 { id:"3", name:"David", skill:"UI Design" }

];

export default function FriendsScreen(){

 const [friends,setFriends] = useState([]);

 const loadFriends = async () => {

  const data = await getFriends();

  setFriends(data);

 };

 useEffect(()=>{

  loadFriends();

 },[]);

 const handleAdd = async (user) => {

  await addFriend(user);

  loadFriends();

 };

 const handleRemove = async (id) => {

  await removeFriend(id);

  loadFriends();

 };

 const isFriend = (id) => friends.some(f => f.id === id);

 return(

  <View style={styles.container}>

   <FlatList

    data={mockUsers}

    keyExtractor={(item)=>item.id}

    renderItem={({item}) => (

     <View style={styles.card}>

      <Text style={styles.name}>{item.name}</Text>

      <Text>{item.skill}</Text>

      {isFriend(item.id) ?

       <Button
        title="Remove Friend"
        onPress={()=>handleRemove(item.id)}
       />

      :

       <Button
        title="Add Friend"
        onPress={()=>handleAdd(item)}
       />

      }

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
  padding:15,
  marginBottom:10,
  borderRadius:10
 },

 name:{
  fontSize:18,
  fontWeight:"bold"
 }

});