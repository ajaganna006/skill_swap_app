import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../features/home/screens/HomeScreen";
import SkillListScreen from "../features/skills/screens/SkillListScreen";
import MySkillsScreen from "../features/skills/screens/MySkillsScreen";
import RequestsScreen from "../features/requests/screens/RequestsScreen";
import MyRequestsScreen from "../features/requests/screens/MyRequestsScreen";
import FriendsScreen from "../features/friends/screens/FriendsScreen";
import ProfileScreen from "../features/profile/screens/ProfileScreen";
import AddSkillScreen from "../features/skills/screens/AddSkillScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        drawerActiveBackgroundColor: "#2e86de",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#444",

        drawerIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "Skills") iconName = "book-outline";
          else if (route.name === "My Skills") iconName = "library-outline";
          else if (route.name === "Requests") iconName = "mail-outline";
          else if (route.name === "My Requests") iconName = "notifications-outline";
          else if (route.name === "Friends") iconName = "people-outline";
          else if (route.name === "Profile") iconName = "person-outline";
          else if (route.name === "Add Skill") iconName = "add-circle-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Skills" component={SkillListScreen} />
      <Drawer.Screen name="My Skills" component={MySkillsScreen} />
      <Drawer.Screen name="Add Skill" component={AddSkillScreen} />
      <Drawer.Screen name="Requests" component={RequestsScreen} />
      <Drawer.Screen name="My Requests" component={MyRequestsScreen} />
      <Drawer.Screen name="Friends" component={FriendsScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}