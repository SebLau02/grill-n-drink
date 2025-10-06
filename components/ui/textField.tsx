import { useColor } from "@/hooks/useColor";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

interface TextFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  size?: "small" | "medium" | "large";
  sx?: StyleProp<ViewStyle>;
  name?: string;
}

const labelMarginLeft = {
  small: 12,
  medium: 16,
  large: 20,
};
const labelPosition = {
  small: 6,
  medium: 12,
  large: 16,
};

export const TextField: React.FC<TextFieldProps> = ({
  label = "",
  error,
  size = "small",
  name = "",
  sx,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const backgroundColor = useColor("background");
  const borderColor = useColor("border");
  const borderActiveColor = useColor("borderActive");
  const textActiveColor = useColor("textActive");
  const textLightColor = useColor("textLight");

  const labelAnim = useRef(new Animated.Value(0)).current; // 0 = position initiale
  const hasValue = !!props.value;

  useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: isFocused || hasValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, hasValue]);

  const translateY = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [labelPosition[size], -8], // 12 = milieu du TextInput, -8 = top
  });

  const fontSize = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 12], // réduit la taille quand flottant
  });

  return (
    <View style={[styles.container, sx]}>
      <Animated.Text
        style={[
          styles.label,
          {
            transform: [{ translateY }],
            fontSize,
            color: isFocused ? textActiveColor : textLightColor,
            backgroundColor:
              isFocused || hasValue ? backgroundColor : "transparent",
            paddingHorizontal: 4,
            left: labelMarginLeft[size] - 4,
          },
        ]}
      >
        {label}
      </Animated.Text>

      <TextInput
        {...props}
        style={[
          styles.input,
          {
            borderColor: isFocused ? borderActiveColor : borderColor,
            paddingHorizontal: labelMarginLeft[size],
          },
          sizeStyle[size],
        ]}
        placeholderTextColor={"transparent"}
        placeholder={label}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    minWidth: 100,
  },
  label: {
    position: "absolute",
    top: 0,
    fontSize: 14,
    marginBottom: 4,
    zIndex: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 16,
    maxWidth: "100%",
    overflow: "hidden",
  },
  error: {
    color: "#ff0015ff",
    fontSize: 12,
    marginTop: 4,
  },
});

const sizeStyle = StyleSheet.create({
  small: {
    height: 36,
  },
  medium: {
    height: 48,
  },
  large: {
    height: 56,
  },
});
