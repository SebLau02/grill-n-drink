import { useColor } from "@/hooks/useColor";
import React from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

type ButtonVariant = "contained" | "outlined" | "text";
interface Props extends PressableProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  color?: "primary" | "primary" | "secondary" | "error" | "danger" | "success";
  size?: "small" | "medium" | "large";
}
function Button({
  children,
  variant = "contained",
  color = "primary",
  size = "medium",
  ...props
}: Props) {
  const textColor = useColor(color);
  const backgroundColor = useColor(variant);
  const borderColor = useColor("border");
  const pressedColor = useColor("pressed");
  const disabledColor = useColor("disabled");

  if (props.disabled) {
    return (
      <Pressable
        {...props}
        style={[
          {
            backgroundColor:
              variant === "contained" ? disabledColor : "transparent",
            borderColor: variant === "outlined" ? disabledColor : "transparent",
            alignSelf: "flex-start",
            borderRadius: 4,
          },
          variantStyle[variant],
          sizeStyle[size],
          props.style,
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
          backgroundColor: pressed ? pressedColor : backgroundColor,
          borderColor: borderColor,
          alignSelf: "flex-start",
          borderRadius: 4,
        },
        variantStyle[variant],
        sizeStyle[size],
        props.style,
      ]}
    >
      {typeof children === "string" ? (
        <Text style={{ color: textColor, textAlign: "center" }}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

export default Button;

const variantStyle = StyleSheet.create({
  contained: {},
  outlined: {
    borderWidth: 1,
  },
  text: {},
});
const sizeStyle = StyleSheet.create({
  small: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  medium: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  large: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
});
