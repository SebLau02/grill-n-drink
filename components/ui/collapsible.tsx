import { PropsWithChildren, useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  Easing,
  View,
} from "react-native";
import FlexBox from "./flexBox";
import Typography from "./typography";
import { ChevronDown } from "lucide-react-native";
import { useColor } from "@/hooks/useColor";

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const lightColor = useColor("textLight");

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <FlexBox direction="column" align="stretch">
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((v) => !v)}
        activeOpacity={0.8}
      >
        <Typography variant="h6">{title}</Typography>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <ChevronDown color={lightColor} size={16} />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View style={[styles.animatedContainer, { height, opacity }]}>
        <View
          style={styles.content}
          onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}
        >
          {children}
        </View>
      </Animated.View>
    </FlexBox>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  animatedContainer: {
    overflow: "hidden",
  },
  content: {
    paddingVertical: 6,
    paddingLeft: 24,
  },
});
