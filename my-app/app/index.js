import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, 
  StyleSheet, SafeAreaView, Alert, ActivityIndicator
} from 'react-native';
import { useRouter } from "expo-router"; 
import { useTheme } from '../src/context/ThemeContext'; // Check this path!
import { loginUser } from '../src/features/auth/services/authApi'; // Check this path!

export default function LoginScreen() {
  const router = useRouter(); 
  const { colors, toggleTheme } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }
    try {
      setLoading(true);
      const res = await loginUser({ email, password });
      Alert.alert("Success", "Login Successful");
      // router.replace("/home"); 
    } catch (err) {
      Alert.alert("Error", "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        
        <View style={styles.headerRow}>
          <Text style={[styles.brand, { color: colors.text }]}>MechaLink</Text>
          <TouchableOpacity onPress={toggleTheme}>
            <Text style={{ fontSize: 20 }}>{colors.isDarkMode ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.subtext, { color: colors.subtext }]}>Welcome back!</Text>

        <Text style={[styles.label, { color: colors.text }]}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.text }]}
          placeholder="Enter Email"
          placeholderTextColor={colors.subtext}
          autoCapitalize="none"
        />

        <Text style={[styles.label, { color: colors.text }]}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.text }]}
          placeholder="Enter Password"
          placeholderTextColor={colors.subtext}
        />

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.button }]} 
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
        </TouchableOpacity>

        <Text style={[styles.footerText, { color: colors.subtext }]}>
          Don't have an account?{" "}
          <Text style={styles.link} onPress={() => router.push("/auth/register")}>
            Sign Up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { width: '90%', padding: 25, borderRadius: 15, elevation: 5 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  brand: { fontSize: 24, fontWeight: 'bold' },
  subtext: { marginBottom: 20 },
  label: { fontWeight: '600', marginBottom: 5 },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 15 },
  button: { padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { fontWeight: 'bold', color: '#fff' },
  footerText: { textAlign: 'center', marginTop: 20 },
  link: { fontWeight: 'bold', color: '#1E3E8A' }
});