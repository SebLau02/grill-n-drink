import { SizeProps } from "@/config/types";
import { Metrics } from "@/constants/theme";
import { useColor } from "@/hooks/useColor";
import React, { ComponentProps, useEffect, useRef, useState } from "react";
import {
  Animated,
  Modal,
  PressableProps,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Paper from "./paper";
import Typography from "./typography";
import Button from "./button";

const isValidValue = (value: string | number | undefined) => {
  return value !== undefined && value !== null;
};
interface Option {
  label: string;
  value: string | number;
}

interface SelectProps extends PressableProps, SizeProps {
  label: string;
  options: Option[];
  value?: string | number;
  onChange: (value: string | number) => void;
  variant?: "outlined" | "filled";
  sx?: ComponentProps<typeof View>["style"];
}

const Select = ({
  label,
  options,
  value,
  onChange,
  variant = "outlined",
  size = "medium",
  sx,
  ...props
}: SelectProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const labelAnim = useRef(new Animated.Value(0)).current; // 0 = position initiale

  const grey700 = useColor("grey700");
  const borderActiveColor = useColor("borderActive");

  const translateY = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [12, -10], // 12 = milieu du TextInput, -8 = top
  });

  useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: isFocused || isValidValue(value) ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <>
      <View style={[styles.container, sx]}>
        <Animated.Text
          style={[
            {
              transform: [{ translateY }],
              position: "absolute",
              zIndex: 4,
              backgroundColor: useColor("background"),
              paddingHorizontal: 4,
              left: labelMarginLeft[size] - 4,
            },
          ]}
        >
          <Typography
            color={isFocused ? "secondary" : "primary"}
            variant={"body2"}
          >
            {label}
          </Typography>
        </Animated.Text>
        <TouchableOpacity
          onPress={(e) => {
            setIsFocused(!isFocused);
            props.onPress?.(e);
          }}
          style={[
            pressableStyle[variant],
            {
              borderColor: isFocused ? borderActiveColor : grey700,
              borderRadius: Metrics.radius,
            },
            sizeStyle[size],
          ]}
        >
          <Typography
            color={"primary"}
            variant={"body2"}
            style={{
              opacity: isValidValue(value) ? 1 : 0,
            }}
          >
            {isValidValue(value)
              ? options.find((option) => option.value === value)?.label
              : label}
          </Typography>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isFocused}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsFocused(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <Paper variant="outlined" style={[styles.options]}>
            {options &&
              options.map((option) => (
                <Button
                  active={option.value === value}
                  key={option.value}
                  onPress={() => {
                    onChange(option.value);
                    setIsFocused(false);
                  }}
                  variant="text"
                  style={[
                    {
                      width: "100%",
                    },
                  ]}
                >
                  <Typography variant={"body2"}>{option.label}</Typography>
                </Button>
              ))}
          </Paper>
        </View>
      </Modal>
    </>
  );
};

export default Select;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginTop: 7,
  },
  options: {
    width: "90%",
  },
});

const pressableStyle = StyleSheet.create({
  outlined: {
    borderWidth: 1,
    maxWidth: "100%",
    width: 200,
  },

  filled: {
    borderWidth: 0,
    borderBottomWidth: 1,
  },
});

const sizeStyle = StyleSheet.create({
  small: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
});

// const sizeHeight = {
//   small: 8,
//   medium: 12,
//   large: 16,
// };

const labelMarginLeft = {
  small: 12,
  medium: 16,
  large: 20,
};
