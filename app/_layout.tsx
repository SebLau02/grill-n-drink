import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import Toasts from "@/components/toasts";
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
      "BricolageGrotesque-Bold": require("../assets/fonts/BricolageGrotesque-Bold.ttf"),
      "BricolageGrotesque-Medium": require("../assets/fonts/BricolageGrotesque-Medium.ttf"),
      "Raleway-Italic": require("../assets/fonts/Raleway-Italic.ttf"),
      "Raleway-Regular": require("../assets/fonts/Raleway-Regular.ttf"),
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
          <KeyboardAwareScrollView
            contentContainerStyle={{ flex: 1 }}
            enableOnAndroid
            extraScrollHeight={50}
            keyboardShouldPersistTaps="handled"
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
            <Toasts />
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
