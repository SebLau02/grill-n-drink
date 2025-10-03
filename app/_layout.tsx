import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import * as Font from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      "BricolageGrotesque-Variable": require("../assets/fonts/BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf"),
      "Raleway-Variable": require("../assets/fonts/Raleway-VariableFont_wght.ttf"),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null; // ou un écran de chargement

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f31b1bff" }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DarkTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaView>
  );
}
