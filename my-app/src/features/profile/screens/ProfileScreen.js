import React, { useState, useRef, useEffect } from "react";
import {
 View,
 Text,
 StyleSheet,
 Image,
 TouchableOpacity,
 Animated
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen() {
 const navigation = useNavigation();
 const [image,setImage] = useState(null)
 const handleLogout = () => {
 navigation.replace("Auth");
};
 const fadeAnim = useRef(new Animated.Value(0)).current

 useEffect(()=>{
  Animated.timing(fadeAnim,{
   toValue:1,
   duration:1200,
   useNativeDriver:true
  }).start()
 },[])

 const pickImage = async () => {

  const result = await ImagePicker.launchImageLibraryAsync({
   mediaTypes:['images'],
   quality:1
  })

  if(!result.canceled){
   setImage(result.assets[0].uri)
  }

 }

 return(

  <View style={styles.container}>

   <Animated.View style={{opacity:fadeAnim}}>

    <View style={styles.header}>

     <TouchableOpacity onPress={pickImage}>

      <Image
  source={require("../../../../assets/13640.png")}
  style={{ width:120, height:120,borderRadius:60, borderWidth:3, borderColor:"#0d0d0e" }}
/>

     </TouchableOpacity>

     <Text style={styles.name}>Ajaganna</Text>
     <Text style={styles.email}>pasargiajaganna@gmail.com</Text>

    </View>

   </Animated.View>

   <Animated.View style={[styles.stats,{opacity:fadeAnim}]}>

    <View style={styles.statCard}>
     <Text style={styles.number}>4</Text>
     <Text style={styles.label}>Skills</Text>
    </View>

    <View style={styles.statCard}>
     <Text style={styles.number}>2</Text>
     <Text style={styles.label}>Requests</Text>
    </View>

    <View style={styles.statCard}>
     <Text style={styles.number}>5</Text>
     <Text style={styles.label}>Completed</Text>
    </View>

   </Animated.View>

   <View style={styles.buttons}>

    <TouchableOpacity style={styles.btn}>
     <Text style={styles.btnText}>Edit Profile</Text>
    </TouchableOpacity>

    <TouchableOpacity
 style={styles.logoutBtn}
 onPress={handleLogout}
>
     <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>

   </View>

  </View>

 )

}

const styles = StyleSheet.create({

 container:{
  flex:1,
  backgroundColor:"#f5f6fa",
  alignItems:"center",
  paddingTop:60
 },

 header:{
  alignItems:"center"
 },

 avatar:{
  width:130,
  height:130,
  borderRadius:65,
  borderWidth:4,
  borderColor:"#4A90E2",
  marginBottom:10
 },

 name:{
  fontSize:24,
  fontWeight:"bold"
 },

 email:{
  color:"#777",
  marginBottom:20
 },

 stats:{
  flexDirection:"row",
  justifyContent:"space-around",
  width:"90%",
  marginTop:20
 },

 statCard:{
  backgroundColor:"#fff",
  padding:20,
  borderRadius:10,
  alignItems:"center",
  elevation:3,
  width:90
 },

 number:{
  fontSize:20,
  fontWeight:"bold"
 },

 label:{
  color:"#666"
 },

 buttons:{
  marginTop:40,
  width:"80%"
 },

 btn:{
  backgroundColor:"#4A90E2",
  padding:14,
  borderRadius:10,
  alignItems:"center",
  marginBottom:15
 },

 btnText:{
  color:"#fff",
  fontWeight:"bold"
 },

 logoutBtn:{
  borderWidth:1,
  borderColor:"#e74c3c",
  padding:14,
  borderRadius:10,
  alignItems:"center"
 },

 logoutText:{
  color:"#e74c3c",
  fontWeight:"bold"
 }

})