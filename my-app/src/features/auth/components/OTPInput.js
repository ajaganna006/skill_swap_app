import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

export default function OTPInput({ otp, setOtp }) {

  const handleChange = (text, index) => {
    let newOtp = otp.split("");
    newOtp[index] = text;
    setOtp(newOtp.join(""));
  };

  return (
    <View style={styles.container}>

      {[0,1,2,3,4,5].map((i) => (
        <TextInput
          key={i}
          style={styles.input}
          keyboardType="number-pad"
          maxLength={1}
          value={otp[i] || ""}
          onChangeText={(text) => handleChange(text, i)}
        />
      ))}

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginVertical:20
  },

  input:{
    borderWidth:1,
    borderColor:"#ccc",
    width:45,
    height:50,
    textAlign:"center",
    fontSize:20,
    borderRadius:8
  }

});