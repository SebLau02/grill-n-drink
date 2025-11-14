import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "./typography";
import FlexBox from "./flexBox";
import { useColor } from "@/hooks/useColor";

interface Props {
  count: number;
  children: React.ReactNode;
  color?: "primary" | "secondary" | "danger" | "warning" | "success" | "info";
  anchor?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  showEmpty?: boolean;
}
function Badge({
  count,
  color = "primary",
  anchor = "top-right",
  children,
  showEmpty = false,
}: Props) {
  const backgroundColor = useColor(badgeColorKeys[color]);
  return (
    <View
      style={{
        position: "relative",
      }}
    >
      {(showEmpty || count > 0) && (
        <FlexBox
          justify="center"
          align="center"
          sx={[
            {
              position: "absolute",
              backgroundColor: backgroundColor,
              borderColor: backgroundColor,
              borderWidth: 1,
              width: 18,
              height: 18,
              borderRadius: 8,
              zIndex: 10,
            },
            ,
            anchorPositionStyles[anchor],
          ]}
        >
          <Typography variant="caption">{count}</Typography>
        </FlexBox>
      )}
      {children}
    </View>
  );
}

const anchorPositionStyles = StyleSheet.create({
  "top-left": {
    top: 0,
    left: 0,
  },
  "top-right": {
    top: 0,
    right: 0,
  },
  "bottom-left": {
    bottom: 0,
    left: 0,
  },
  "bottom-right": {
    bottom: 0,
    right: 0,
  },
});
const badgeColorKeys: Record<
  "primary" | "secondary" | "danger" | "warning" | "success" | "info",
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
