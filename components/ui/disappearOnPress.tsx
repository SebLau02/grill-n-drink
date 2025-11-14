import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Animated, Pressable } from "react-native";

export interface DisappearOnPressRef {
  hide: () => void;
}

interface Props {
  children: React.ReactNode;
}

const DisappearOnPress = forwardRef(function DisappearOnPress(
  { children }: Props,
  ref
) {
  const opacity = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = useState(true);

  const hide = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: -200,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => setVisible(false));
  };

  useImperativeHandle(ref, () => ({
    hide,
  }));

  if (!visible) return null;

  return (
    <Pressable onPress={hide}>
      <Animated.View style={{ opacity, transform: [{ translateX }] }}>
        {children}
      </Animated.View>
    </Pressable>
  );
});

export default DisappearOnPress;
