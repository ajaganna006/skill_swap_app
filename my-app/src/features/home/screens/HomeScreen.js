import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, ImageBackground } from "react-native";

export default function HomeScreen(){

 const fadeAnim = useRef(new Animated.Value(0)).current;

 useEffect(()=>{

   Animated.timing(fadeAnim,{
     toValue:1,
     duration:2000,
     useNativeDriver:true
   }).start();

 },[]);

 return(

  <View style={styles.container}>
  
  <ImageBackground
    source={require("../../../../assets/1.png")}
    style={{width:"100%",height:750,marginTop:-50}}
    imageStyle={{borderRadius:10}}
   />
    
   

  </View>

 )
}

const styles = StyleSheet.create({

 container:{
  flex:1,
  justifyContent:"center",
  alignItems:"center",
  backgroundColor:"#f5f6fa"
 },

 title:{
  fontSize:32,
  fontWeight:"bold",
  color:"#2e86de"
 },

 subtitle:{
  fontSize:18,
  marginTop:10,
  color:"#555"
 }

});
