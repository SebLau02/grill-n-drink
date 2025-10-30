import { useColor } from "@/hooks/useColor";
import { Toast, useToast } from "@/store/toast";
import { useEffect, useRef } from "react";
import { Animated, PanResponder, View } from "react-native";
import Paper from "./ui/paper";
import Typography from "./ui/typography";

function ToastItem({
  toast,
  removeToast,
}: {
  toast: Toast;
  removeToast: (id: string) => void;
}) {
  const backgroundColor = useColor(toast.type || "info");

  const translateY = useRef(new Animated.Value(-40)).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy < 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -50) {
          Animated.timing(translateY, {
            toValue: -100,
            duration: 200,
            useNativeDriver: true,
          }).start(() => removeToast(toast.id));
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    // Animation d'apparition
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    // Timeout auto-dismiss avec animation de sortie
    const timer = setTimeout(() => {
      Animated.timing(translateY, {
        toValue: -40,
        duration: 200,
        useNativeDriver: true,
      }).start(() => removeToast(toast.id));
    }, toast.duration);
    return () => clearTimeout(timer);
  }, [toast.id, removeToast, translateY, toast.duration]);

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        width: "80%",
        marginBottom: 8,
      }}
      {...panResponder.panHandlers}
    >
      <Paper
        variant="elevation"
        elevation={24}
        style={{ padding: 16, borderColor: backgroundColor, borderWidth: 2 }}
      >
        <Typography variant="h6">{toast.message}</Typography>
        {toast.submessage && (
          <Typography variant="body2" style={{ marginTop: 4 }}>
            {toast.submessage}
          </Typography>
        )}
      </Paper>
    </Animated.View>
  );
}

function Toasts() {
  const { toasts, removeToast } = useToast();
  return (
    <View
      style={{
        position: "absolute",
        top: 32,
        left: 0,
        right: 0,
        alignItems: "center",
        zIndex: 999,
      }}
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} removeToast={removeToast} />
      ))}
    </View>
  );
}

export default Toasts;
