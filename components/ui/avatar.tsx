import { Metrics } from "@/constants/theme";
import { useColor } from "@/hooks/useColor";
import React from "react";
import { Image, View, ViewProps } from "react-native";
import FlexBox from "./flexBox";
import Typography from "./typography";

interface Props extends ViewProps {
  src?: string;
  width?: number;
  height?: number;
  rounded?: boolean;
  name?: string;
}

function Avatar({
  src = "",
  width = 40,
  height = 40,
  rounded = false,
  name,
  ...props
}: Props) {
  const initials = name
    ? name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
    : "?";
  const backgroundColor = useColor("grey300");

  return (
    <View style={props.style}>
      {src ? (
        <Image
          source={{ uri: src }}
          style={[
            { backgroundColor: "#eee" },
            {
              width: width,
              height: height,
              borderRadius: rounded ? "50%" : Metrics.radius,
            },
          ]}
        />
      ) : (
        <FlexBox
          align="alignCenter"
          justify="justifyCenter"
          sx={{
            width: width,
            height: height,
            borderRadius: rounded ? "50%" : Metrics.radius,
            backgroundColor,
          }}
        >
          <Typography variant="body1">{initials}</Typography>
        </FlexBox>
      )}
    </View>
  );
}

export default Avatar;
