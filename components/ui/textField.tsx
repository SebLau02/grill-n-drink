import { useColor } from "@/hooks/useColor";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface TextFieldProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const backgroundColor = useColor("background");

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
    outputRange: [12, -8], // 12 = milieu du TextInput, -8 = top
  });

  const fontSize = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 12], // réduit la taille quand flottant
  });

  return (
    <View style={styles.container}>
      {label && (
        <Animated.Text
          style={[
            styles.label,
            {
              transform: [{ translateY }],
              fontSize,
              color: isFocused ? "#6200ee" : "#777",
              backgroundColor: isFocused ? backgroundColor : "transparent",
              paddingHorizontal: 2,
            },
          ]}
        >
          {label}
        </Animated.Text>
      )}
      <TextInput
        {...props}
        style={[styles.input, { borderColor: isFocused ? "#6200ee" : "#ccc" }]}
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
  },
  label: {
    position: "absolute",
    top: 0,
    left: 10,
    fontSize: 14,
    marginBottom: 4,
    zIndex: 1,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    // paddingVertical: 8,
    fontSize: 16,
  },
  error: {
    color: "#b00020",
    fontSize: 12,
    marginTop: 4,
  },
});
