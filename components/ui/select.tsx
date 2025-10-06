import { useBackdropStore } from "@/app/store/backdrop";
import { SizeProps } from "@/config/types";
import { Metrics } from "@/constants/theme";
import { useColor } from "@/hooks/useColor";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  PressableProps,
  StyleSheet,
  View,
} from "react-native";
import Backdrop from "./backdrop";
import Paper from "./paper";
import Typography from "./typography";

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
}

const Select = ({
  label,
  options,
  value,
  onChange,
  variant = "outlined",
  size = "medium",
  ...props
}: SelectProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const { setOpen, setClose, open } = useBackdropStore();

  const labelAnim = useRef(new Animated.Value(0)).current; // 0 = position initiale

  const grey700 = useColor("grey700");
  const borderActiveColor = useColor("borderActive");

  const translateY = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [12, -10], // 12 = milieu du TextInput, -8 = top
  });

  useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  useEffect(() => {
    if (!open) {
      setIsFocused(false);
    }
  }, [open]);

  return (
    <>
      {isFocused && <Backdrop opacity={0.3} color="red" />}
      <View style={[styles.container]}>
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
        <Pressable
          onPress={(e) => {
            setIsFocused(!isFocused);
            setOpen();
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
              opacity: value ? 1 : 0,
            }}
          >
            {value ? value : label}
          </Typography>
        </Pressable>

        {isFocused && (
          <Paper variant="outlined" style={[styles.options]}>
            {options.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => {
                  onChange(option.value);
                  setIsFocused(false);
                  setClose();
                }}
                style={[
                  {
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                  },
                ]}
              >
                <Typography variant={"body2"}>{option.label}</Typography>
              </Pressable>
            ))}
          </Paper>
        )}
      </View>
    </>
  );
};

export default Select;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    borderWidth: 1,
    borderColor: "#ff0000ff",
    borderStyle: "solid",
  },
  options: {
    position: "absolute",
    top: "100%",
    left: 0,
    zIndex: 10,
    marginTop: 4,
    padding: 8,
    width: "100%",
  },
});

const pressableStyle = StyleSheet.create({
  outlined: {
    borderWidth: 1,
    maxWidth: "100%",
    width: 200,
    overflow: "hidden",
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
