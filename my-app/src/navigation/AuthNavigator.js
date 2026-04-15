import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../features/auth/screens/LoginScreen";
import RegisterScreen from "../features/auth/screens/RegisterScreen";
import OTPScreen from "../features/auth/screens/OTPScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {

  return (

    <Stack.Navigator screenOptions={{ headerShown:false }}>

      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />

      <Stack.Screen
        name="SignUp"   
        component={RegisterScreen}
      />

      <Stack.Screen
        name="OTP"
        component={OTPScreen}
      />

    </Stack.Navigator>

  );

}