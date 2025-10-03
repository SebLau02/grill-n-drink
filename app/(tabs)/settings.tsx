import { Fonts } from "@/constants/theme";
import React from "react";
import { Text, View } from "react-native";

function Settings() {
  return (
    <View>
      <Text style={{ fontFamily: Fonts.bricolage }}>Settings</Text>
    </View>
  );
}

export default Settings;
