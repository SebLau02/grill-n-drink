import { useColor } from "@/hooks/useColor";
import React from "react";
import { Pressable, PressableProps, StyleSheet } from "react-native";
import Typography from "./typography";

type ButtonVariant = "contained" | "outlined" | "text";
interface Props extends PressableProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  color?: "primary" | "primary" | "secondary" | "error" | "danger" | "success";
  size?: "small" | "medium" | "large";
  disableTouchEffect?: boolean;
}
function Button({
  children,
  variant = "contained",
  color = "primary",
  size = "medium",
  disableTouchEffect = false,
  ...props
}: Props) {
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
          <Typography
            variant="body2"
            style={{ textAlign: "center", color: disabledColor }}
          >
            {children}
          </Typography>
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
            pressed && !disableTouchEffect ? pressedColor : backgroundColor,
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
        <Typography variant="body2" style={{ textAlign: "center" }}>
          {children}
        </Typography>
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
