import { useColor } from "@/hooks/useColor";
import React from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

export interface IconButtonProps extends PressableProps {
  children: React.ReactNode;
  color?: "primary" | "primary" | "secondary" | "error" | "danger" | "success";
  size?: "small" | "medium";
  active?: boolean;
  rounded?: boolean;
}
function IconButton({
  children,
  color = "primary",
  size = "medium",
  active,
  rounded = false,
  ...props
}: IconButtonProps) {
  const textColor = useColor(color);
  const borderColor = useColor("border");
  const pressedColor = useColor("pressed");
  const bgColor = useColor("contained");
  const disabledColor = useColor("disabled");

  if (props.disabled) {
    return (
      <Pressable
        {...props}
        style={[
          {
            alignSelf: "flex-start",
            borderRadius: 4,
          },
          sizeStyle[size],
        ]}
      >
        {typeof children === "string" ? (
          <Text style={{ color: disabledColor }}>{children}</Text>
        ) : (
          children
        )}
      </Pressable>
    );
  }

  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        {
          backgroundColor:
            active && !pressed
              ? bgColor
              : pressed
              ? pressedColor
              : "transparent",
          borderColor: borderColor,
          alignSelf: "flex-start",
          borderRadius: 4,
        },
        sizeStyle[size],
        rounded && {
          borderRadius: 999,
          borderWidth: 1,
          borderColor: borderColor,
        },
      ]}
    >
      {typeof children === "string" ? (
        <Text style={{ color: textColor }}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

export default IconButton;

const sizeStyle = StyleSheet.create({
  small: {
    padding: 8,
  },
  medium: {
    padding: 16,
  },
});
