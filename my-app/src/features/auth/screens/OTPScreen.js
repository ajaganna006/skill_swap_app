import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";

import OTPInput from "../components/OTPInput";
import { verifyOTP } from "../services/authApi";

export default function OTPScreen({ route, navigation }) {

  const { email } = route.params;

  const [otp,setOtp] = useState("");

 const handleVerify = async () => {

  if(otp.length !== 6){
    Alert.alert("Invalid OTP","Enter 6 digit OTP");
    return;
  }

  try{

    console.log("EMAIL:", email);
    console.log("OTP:", otp);

    await verifyOTP(email, otp);

    Alert.alert("Success","OTP Verified");

    navigation.replace("Login");

  }catch(error){

    console.log("VERIFY ERROR:", error.response?.data);

    Alert.alert(
      "Error",
      error.response?.data?.detail || "OTP verification failed"
    );

  }

};

  return(

    <View style={styles.container}>

      <Text style={styles.title}>Verify OTP</Text>

      <Text style={styles.subtitle}>
        Enter the OTP sent to {email}
      </Text>

      <OTPInput otp={otp} setOtp={setOtp} />

      <Button
        title="Verify OTP"
        onPress={handleVerify}
      />

    </View>

  );

}

const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent:"center",
    padding:20
  },

  title:{
    fontSize:26,
    fontWeight:"bold",
    textAlign:"center"
  },

  subtitle:{
    textAlign:"center",
    marginVertical:15
  }

});