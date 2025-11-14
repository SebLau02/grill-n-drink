import React, { useRef } from "react";
import DisappearOnPress, { DisappearOnPressRef } from "./disappearOnPress";
import Paper from "./paper";
import Typography from "./typography";
import ParticipateNotifCard from "./participateNotifCard";
import { View } from "react-native";
import IconButton from "./iconButton";
import { X } from "lucide-react-native";
import { useColor } from "@/hooks/useColor";
import { NotificationType } from "@/config/types";
import { useReadNotification } from "@/hooks/useNotifications";
import { useAppStore } from "@/store/useStore";

interface Props {
  notification: NotificationType;
}
function NotificationCard({ notification }: Props) {
  const { setNotifications } = useAppStore();
  const refDisparition = useRef<DisappearOnPressRef>(null);

  const redColor = useColor("primary900");

  const { mutate } = useReadNotification({
    onSuccess: (data) => {
      setNotifications(data.notifications);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const fermer = () => {
    refDisparition.current?.hide();
    mutate({ id: notification.id });
  };

  return (
    <DisappearOnPress ref={refDisparition}>
      <Paper
        style={{
          padding: 8,
          width: "100%",
          position: "relative",
        }}
      >
        <Typography variant="h6">{notification.title}</Typography>
        <Typography variant="body2">{notification.content}</Typography>
        {notification.notification_type === "participation" ? (
          <ParticipateNotifCard onClose={fermer} />
        ) : (
          <View
            style={{
              position: "absolute",
              top: -16,
              right: -16,
            }}
          >
            <IconButton rounded size="small" active onPress={() => fermer()}>
              <X color={redColor} size={14} />
            </IconButton>
          </View>
        )}
      </Paper>
    </DisappearOnPress>
  );
}

export default NotificationCard;
