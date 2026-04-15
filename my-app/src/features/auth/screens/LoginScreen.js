import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator // Added for better loading UI
} from 'react-native';

// Correct hooks for Expo Router
import { useRouter } from "expo-router"; 
import { useTheme } from '../../../context/ThemeContext'; // Ensure this path is correct
import { loginUser } from '../services/authApi';

export default function LoginScreen({ navigation }) {
 
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

      console.log("LOGIN SUCCESS:", res);
      Alert.alert("Success", "Login Successful");

      // Expo Router navigation
      // router.replace("/home"); 
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Invalid credentials or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        
        <View style={styles.headerRow}>
          <Text style={[styles.brand, { color: colors.text }]}>MechaLink</Text>
          <TouchableOpacity onPress={toggleTheme} style={styles.toggleContainer}>
            <Text style={{ fontSize: 20 }}>
              {colors.isDarkMode ? '☀️' : '🌙'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.subtext, { color: colors.subtext }]}>Welcome back!</Text>

        <Text style={[styles.label, { color: colors.text }]}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={[styles.input, {
            backgroundColor: colors.inputBg,
            borderColor: colors.inputBorder,
            color: colors.text
          }]}
          placeholder="Enter Email"
          placeholderTextColor={colors.subtext}
          keyboardType="email-address" // Better UX
          autoCapitalize="none"        // Better UX for emails
        />

        <Text style={[styles.label, { color: colors.text }]}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={[styles.input, {
            backgroundColor: colors.inputBg,
            borderColor: colors.inputBorder,
            color: colors.text
          }]}
          placeholder="Enter Password"
          placeholderTextColor={colors.subtext}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.button, opacity: loading ? 0.7 : 1 }]}
          onPress={handleLogin}
          disabled={loading} // Prevent multiple clicks
        >
          {loading ? (
            <ActivityIndicator color={colors.buttonText} />
          ) : (
            <Text style={[styles.buttonText, { color: colors.buttonText }]}>Login</Text>
          )}
        </TouchableOpacity>

        <Text style={[styles.footerText, { color: colors.subtext }]}>
          {"Don't have an account? "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('SignUp')} // Match the name in your Stack Navigator
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

// Ensure styles match your theme requirements
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { width: '90%', padding: 25, borderRadius: 15, elevation: 5 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  brand: { fontSize: 24, fontWeight: 'bold' },
  subtext: { marginBottom: 20 },
  label: { fontWeight: '600', marginBottom: 5 },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 15 },
  button: { padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { fontWeight: 'bold', fontSize: 16 },
  footerText: { textAlign: 'center', marginTop: 20 },
  link: { fontWeight: 'bold', color: '#1E3E8A' }
});