import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* route "/" */}
        <Stack.Screen name="index" options={{ headerShown: false }} />

        {/* "/login" */}
        <Stack.Screen name="login" options={{ headerShown: false }} />

        {/* "/signup" */}
        <Stack.Screen name="signup" options={{ headerShown: false }} />

        {/* "/home" */}
        <Stack.Screen name="home" options={{ title: "Data Mahasiswa" }} />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}