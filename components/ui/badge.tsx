import React from "react";
import { View } from "react-native";
import Typography from "./typography";
import FlexBox from "./flexBox";
import { useColor } from "@/hooks/useColor";

interface Props {
  count: number;
  children: React.ReactNode;
  color: "primary" | "secondary" | "danger" | "warning" | "success" | "info";
}
function Badge({ count, color = "primary", children }: Props) {
  const backgroundColor = useColor(badgeColorKeys[color]);
  return (
    <View
      style={{
        position: "relative",
      }}
    >
      <FlexBox
        justify="center"
        align="center"
        sx={{
          position: "absolute",
          backgroundColor: backgroundColor,
          borderColor: backgroundColor,
          borderWidth: 1,
          width: 18,
          height: 18,
          borderRadius: 8,
          zIndex: 10,
        }}
      >
        <Typography variant="caption">{count}</Typography>
      </FlexBox>
      {children}
    </View>
  );
}

const badgeColorKeys: Record<
  Props["color"],
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "info"
  | "pressed"
  | "grey300"
> = {
  primary: "pressed",
  secondary: "grey300",
  danger: "danger",
  warning: "info",
  success: "success",
  info: "info",
};

export default Badge;
