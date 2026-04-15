import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";

export default function SkillCard({ skill, onPress, onRequest }) {

  return (
    <View style={styles.card}>

      <TouchableOpacity onPress={() => onPress && onPress(skill)}>
        <Text style={styles.title}>{skill?.name}</Text>
        <Text style={styles.desc}>{skill?.description}</Text>
      </TouchableOpacity>

      {onRequest && (
        <Button title="Request Skill" onPress={() => onRequest(skill)} />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  card:{ padding:16, backgroundColor:"#fff", marginBottom:10, borderRadius:10 },
  title:{ fontSize:18, fontWeight:"bold" },
  desc:{ color:"#666", marginTop:5 }
});