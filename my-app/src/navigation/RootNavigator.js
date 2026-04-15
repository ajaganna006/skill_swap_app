import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthNavigator from "./AuthNavigator";
import DrawerNavigator from "./DrawerNavigator";

import SkillDetailsScreen from "../features/skills/screens/SkillDetailsScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {

  return (
    <Stack.Navigator screenOptions={{ headerShown:false }}>

      <Stack.Screen name="Auth" component={AuthNavigator} />

      <Stack.Screen name="Drawer" component={DrawerNavigator} />

      <Stack.Screen name="SkillDetails" component={SkillDetailsScreen} />

    </Stack.Navigator>
  );

}