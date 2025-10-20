import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import BottomBarWrapper from "@/components/ui/bottomBarWrapper";
import TopBarWrapper from "@/components/ui/topBarWrapper";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot, Stack } from "expo-router";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const queryClient = new QueryClient();

  useEffect(() => {
    Font.loadAsync({
      "BricolageGrotesque-Variable": require("../assets/fonts/BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf"),
      "Raleway-Variable": require("../assets/fonts/Raleway-VariableFont_wght.ttf"),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DarkTheme}>
        <SafeAreaView
          style={{
            flex: 1,
          }}
        >
          <TopBarWrapper />
          <Stack
            screenOptions={{
              animation: "none",
              headerShown: false,
            }}
          >
            <Slot />
          </Stack>
          <BottomBarWrapper />
        </SafeAreaView>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
