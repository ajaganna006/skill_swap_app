import { Stack } from 'expo-router';
import { ThemeProvider } from '../src/context/ThemeContext'; // Check this path!

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" /> 
        <Stack.Screen name="auth/register" />
      </Stack>
    </ThemeProvider>
  );
}