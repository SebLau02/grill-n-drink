import { useColor } from "@/hooks/useColor";
import { useRouter, useSegments } from "expo-router";
import { Calendar, Plus, Settings } from "lucide-react-native";
import React from "react";
import FlexBox from "./flexBox";
import IconButton from "./iconButton";

function BottomBarWrapper() {
  const textLight = useColor("textLight");
  const grey200 = useColor("grey200");
  const router = useRouter();
  const segments = useSegments();
  const currentRoute = segments[segments.length - 1];

  return (
    <FlexBox
      direction="row"
      justify="between"
      sx={{
        backgroundColor: grey200,
      }}
    >
      <IconButton disabled> </IconButton>
      <FlexBox direction="row" justify="center">
        <IconButton
          active={!currentRoute || currentRoute === "event"}
          onPress={() => router.push("/" as never)}
        >
          <Calendar size={21} color={textLight} />
        </IconButton>
        <IconButton
          active={currentRoute === "create"}
          onPress={() => router.push("/create" as never)}
        >
          <Plus size={21} color={textLight} />
        </IconButton>
      </FlexBox>
      <IconButton
        active={currentRoute === "settings"}
        onPress={() => router.push("/settings" as never)}
      >
        <Settings size={21} color={textLight} />
      </IconButton>
    </FlexBox>
  );
}

export default BottomBarWrapper;
