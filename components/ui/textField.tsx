import { Metrics } from "@/constants/theme";
import { useColor } from "@/hooks/useColor";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import Typography, { textVariants } from "./typography";

interface TextFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  size?: "small" | "medium" | "large";
  sx?: StyleProp<ViewStyle>;
  name?: string;
  rowsCount?: number;
  variant?: "outlined" | "filled" | "text";
  labelBg?: boolean;
  fullWidth?: boolean;
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

export const TextField = forwardRef<TextInput, TextFieldProps>(
  (
    {
      label = "",
      error,
      size = "small",
      name = "",
      rowsCount = 0,
      variant = "outlined",
      labelBg = false,
      fullWidth = false,
      sx,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const backgroundColor = useColor("background");
    const inputBackground = useColor("grey500");
    const grey700 = useColor("grey700");
    const grey200 = useColor("grey200");
    const borderColor = useColor("border");
    const borderActiveColor = useColor("borderActive");
    const textActiveColor = useColor("textActive");
    const textLightColor = useColor("textLight");

    const labelAnim = useRef(new Animated.Value(0)).current;
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
      outputRange: [labelPosition[size], -10],
    });

    const labelBgColor = labelBg ? grey200 : backgroundColor;

    return (
      <View style={[styles.container, sx, fullWidth ? { width: "100%" } : {}]}>
        <Animated.Text
          style={[
            styles.label,
            {
              transform: [{ translateY }],
              color: isFocused ? textActiveColor : textLightColor,
              backgroundColor:
                variant === "outlined" && (isFocused || hasValue)
                  ? labelBgColor
                  : "transparent",
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

        <TextInput
          ref={ref}
          {...props}
          multiline={rowsCount > 0}
          style={[
            styles.input,
            {
              borderColor: isFocused ? borderActiveColor : borderColor,
              paddingHorizontal: labelMarginLeft[size],
              borderRadius: Metrics.radius,
              textAlignVertical: "center",
            },
            sizeStyle[size],
            size === "small" ? textVariants.body2 : textVariants.body1,
            rowsCount > 0
              ? {
                  height: sizeHeight[size] + 16 * rowsCount,
                  textAlignVertical: "top",
                }
              : {},
            variant === "outlined"
              ? {}
              : variant === "filled"
              ? {
                  backgroundColor: inputBackground,
                  ...variantStyle[variant],
                  borderBottomColor: isFocused ? borderActiveColor : grey700,
                }
              : {
                  ...variantStyle[variant],
                  borderBottomColor: isFocused ? borderActiveColor : grey700,
                },
            fullWidth ? { width: "100%" } : {},
            props.style,
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

        {error && (
          <Typography variant="caption" color="danger">
            {error}
          </Typography>
        )}
      </View>
    );
  }
);

TextField.displayName = "TextField";

// export const TextField = ({
//   label = "",
//   error,
//   size = "small",
//   name = "",
//   rowsCount = 0,
//   variant = "outlined",
//   labelBg = false,
//   fullWidth = false,
//   sx,
//   ...props
// }: TextFieldProps) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const backgroundColor = useColor("background");
//   const inputBackground = useColor("grey500");
//   const grey700 = useColor("grey700");
//   const grey200 = useColor("grey200");
//   const borderColor = useColor("border");
//   const borderActiveColor = useColor("borderActive");
//   const textActiveColor = useColor("textActive");
//   const textLightColor = useColor("textLight");

//   const labelAnim = useRef(new Animated.Value(0)).current; // 0 = position initiale
//   const hasValue = !!props.value;

//   useEffect(() => {
//     Animated.timing(labelAnim, {
//       toValue: isFocused || hasValue ? 1 : 0,
//       duration: 200,
//       useNativeDriver: false,
//     }).start();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isFocused, hasValue]);

//   const translateY = labelAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [labelPosition[size], -10], // 12 = milieu du TextInput, -8 = top
//   });

//   const labelBgColor = labelBg ? grey200 : backgroundColor;

//   return (
//     <View style={[styles.container, sx, fullWidth ? { width: "100%" } : {}]}>
//       <Animated.Text
//         style={[
//           styles.label,
//           {
//             transform: [{ translateY }],
//             color: isFocused ? textActiveColor : textLightColor,
//             backgroundColor:
//               variant === "outlined" && (isFocused || hasValue)
//                 ? labelBgColor
//                 : "transparent",
//             paddingHorizontal: 4,
//             left: labelMarginLeft[size] - 4,
//           },
//         ]}
//       >
//         <Typography
//           color={isFocused ? "secondary" : "primary"}
//           variant={"body2"}
//           sx={{}}
//         >
//           {label}
//         </Typography>
//       </Animated.Text>

//       <TextInput
//         {...props}
//         multiline={rowsCount > 0}
//         style={[
//           styles.input,
//           {
//             borderColor: isFocused ? borderActiveColor : borderColor,
//             paddingHorizontal: labelMarginLeft[size],
//             borderRadius: Metrics.radius,
//             textAlignVertical: "center",
//           },
//           sizeStyle[size],
//           size === "small" ? textVariants.body2 : textVariants.body1,
//           rowsCount > 0
//             ? {
//                 height: sizeHeight[size] + 16 * rowsCount,
//                 textAlignVertical: "top",
//               }
//             : {},

//           variant === "outlined"
//             ? {}
//             : variant === "filled"
//             ? {
//                 backgroundColor: inputBackground,
//                 ...variantStyle[variant],
//                 borderBottomColor: isFocused ? borderActiveColor : grey700,
//               }
//             : {
//                 ...variantStyle[variant],
//                 borderBottomColor: isFocused ? borderActiveColor : grey700,
//               },
//           fullWidth ? { width: "100%" } : {},
//           props.style,
//         ]}
//         placeholderTextColor={"transparent"}
//         placeholder={label}
//         onFocus={(e) => {
//           setIsFocused(true);
//           props.onFocus?.(e);
//         }}
//         onBlur={(e) => {
//           setIsFocused(false);
//           props.onBlur?.(e);
//         }}
//       />

//       {error && (
//         <Typography variant="caption" color="danger">
//           {error}
//         </Typography>
//       )}
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    position: "relative",
    minWidth: 100,
    marginTop: 10,
  },
  label: {
    position: "absolute",
    zIndex: 1,
  },
  input: {
    borderWidth: 1,
    maxWidth: "100%",
    width: 200,
    overflow: "hidden",
  },
});

const variantStyle = StyleSheet.create({
  text: {
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  filled: {
    borderWidth: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomWidth: 1,
  },
});
const sizeStyle = StyleSheet.create({
  small: {
    height: 38,
    paddingVertical: 8,
  },
  medium: {
    height: 48,
    paddingVertical: 12,
  },
  large: {
    height: 56,
    paddingVertical: 18,
  },
});
const sizeHeight = {
  small: 38,
  medium: 48,
  large: 56,
};
