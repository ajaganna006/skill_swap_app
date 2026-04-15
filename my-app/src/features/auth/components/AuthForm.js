import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

export default function AuthForm({ onSubmit, buttonTitle }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title={buttonTitle}
        onPress={() => onSubmit(email, password)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});