import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';

import { useTheme } from '../../../context/ThemeContext';
import { registerUser } from '../services/authApi';

export default function SignUpScreen({ navigation }) {

  const { colors } = useTheme();

  const [role, setRole] = useState('USER');

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [loading, setLoading] = useState(false);

  // 🔥 Generate captcha
  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // 🔥 Handle input change
  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  // 🔥 Validation
  const validateForm = () => {

    if (!form.name || !form.email || !form.phone || !form.password) {
      Alert.alert("Error", "Please fill all fields");
      return false;
    }

    if (!form.email.includes("@")) {
      Alert.alert("Error", "Enter valid email");
      return false;
    }

    if (form.phone.length < 10) {
      Alert.alert("Error", "Enter valid phone number");
      return false;
    }

    if (form.password.length < 4) {
      Alert.alert("Error", "Password too short");
      return false;
    }

    if (captchaInput.toUpperCase() !== captcha) {
      Alert.alert("Error", "Invalid Captcha");
      return false;
    }

    return true;
  };

  // 🔥 Signup API call
  const handleSignup = async () => {

    if (!validateForm()) return;

    try {
      setLoading(true);

      const res = await registerUser({
        email: form.email,
        password: form.password
      });

      console.log("REGISTER RESPONSE:", res);

      Alert.alert("Success", `OTP: ${res.otp}`);

      navigation.navigate("OTP", {
        email: form.email
      });

    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.bg }]}>

      <View style={[styles.card, { backgroundColor: colors.card }]}>

        <Text style={[styles.brand, { color: colors.text }]}>MechaLink</Text>
        <Text style={[styles.subtext, { color: colors.subtext }]}>Create your account</Text>

        {/* ROLE */}
        <View style={[styles.toggleContainer, { backgroundColor: colors.inputBg }]}>
          <TouchableOpacity
            style={[styles.toggleBtn, role === 'USER' && { backgroundColor: colors.inputBorder }]}
            onPress={() => setRole('USER')}
          >
            <Text style={[styles.toggleText, { color: colors.text }]}>USER</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleBtn, role === 'PARTNER' && { backgroundColor: colors.inputBorder }]}
            onPress={() => setRole('PARTNER')}
          >
            <Text style={[styles.toggleText, { color: colors.text }]}>SERVICE PARTNER</Text>
          </TouchableOpacity>
        </View>

        {/* NAME */}
        <Text style={[styles.label, { color: colors.text }]}>Name</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.text }]}
          placeholder="Enter Name"
          placeholderTextColor={colors.subtext}
          onChangeText={(v) => updateField("name", v)}
        />

        {/* EMAIL */}
        <Text style={[styles.label, { color: colors.text }]}>Email</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.text }]}
          placeholder="Enter Email"
          placeholderTextColor={colors.subtext}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(v) => updateField("email", v)}
        />

        {/* PHONE */}
        <Text style={[styles.label, { color: colors.text }]}>Phone</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.text }]}
          placeholder="Enter Phone"
          keyboardType="phone-pad"
          placeholderTextColor={colors.subtext}
          onChangeText={(v) => updateField("phone", v)}
        />

        {/* PASSWORD */}
        <Text style={[styles.label, { color: colors.text }]}>Password</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.text }]}
          placeholder="Enter Password"
          secureTextEntry
          placeholderTextColor={colors.subtext}
          onChangeText={(v) => updateField("password", v)}
        />

        {/* CAPTCHA */}
        <Text style={[styles.label, { color: colors.text }]}>Captcha</Text>

        <TouchableOpacity style={styles.captchaDisplay} onPress={generateCaptcha}>
          <Text style={styles.captchaText}>{captcha} ↻</Text>
        </TouchableOpacity>

        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.text }]}
          placeholder="Enter Captcha"
          placeholderTextColor={colors.subtext}
          value={captchaInput}
          onChangeText={setCaptchaInput}
        />

        {/* BUTTON */}
        <TouchableOpacity
          style={[styles.signUpBtn, { backgroundColor: colors.button }]}
          onPress={handleSignup}
          disabled={loading}
        >
          <Text style={[styles.signUpText, { color: colors.buttonText }]}>
            {loading ? "Please wait..." : "SIGN UP"}
          </Text>
        </TouchableOpacity>

        {/* LOGIN */}
        <Text style={{ textAlign: 'center', marginTop: 15, color: colors.subtext }}>
          Already have an account?{" "}
          <Text
            style={{ color: '#2b6cb0', fontWeight: 'bold' }}
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Text>
        </Text>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  card: {
    width: '100%',
    padding: 25,
    borderRadius: 15,
    elevation: 5
  },
  brand: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtext: {
    textAlign: 'center',
    marginBottom: 20
  },
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 5,
    marginBottom: 20
  },
  toggleBtn: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 8
  },
  toggleText: {
    fontWeight: 'bold',
    fontSize: 12
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15
  },
  captchaDisplay: {
    backgroundColor: '#1a365d',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10
  },
  captchaText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 5
  },
  signUpBtn: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  signUpText: {
    fontWeight: 'bold'
  }
});