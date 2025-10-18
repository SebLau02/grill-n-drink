import { useColor } from "@/hooks/useColor";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Calendar, Plus, Settings } from "lucide-react-native";
import React from "react";
import FlexBox from "./flexBox";
import IconButton from "./iconButton";

function BottomBarWrapper() {
  const textLight = useColor("textLight");
  const background = useColor("background");
  const route = useRoute();
  const router = useRouter();

  return (
    <FlexBox
      direction="row"
      justify="between"
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: background,
      }}
    >
      <IconButton disabled> </IconButton>
      <FlexBox direction="row" justify="center">
        <IconButton
          active={route.name === "eventList" || route.name === "eventDetail"}
          onPress={() => router.push("/" as never)}
        >
          <Calendar size={21} color={textLight} />
        </IconButton>
        <IconButton
          active={route.name === "newEvent"}
          onPress={() => router.push("/create" as never)}
        >
          <Plus size={21} color={textLight} />
        </IconButton>
      </FlexBox>
      <IconButton
        active={route.name === "settings"}
        onPress={() => router.push("/settings" as never)}
      >
        <Settings size={21} color={textLight} />
      </IconButton>
    </FlexBox>
  );
}

export default BottomBarWrapper;
