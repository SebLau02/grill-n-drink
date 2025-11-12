import React, { useEffect, useState } from "react";
import IconButton, { IconButtonProps } from "./iconButton";
import { Bell } from "lucide-react-native";
import { useColor } from "@/hooks/useColor";
import CustomModal from "./modal";
import Typography from "./typography";
import { useAppStore } from "@/store/useStore";
import Button from "./button";
import { View } from "react-native";
import usePushNotifications from "@/hooks/usePushNotifications";
import { useUpdateUser } from "@/hooks/useUser";

interface Props {
  buttonProps?: IconButtonProps;
}
function NotificationMenu({ buttonProps }: Props) {
  const { user, setUser } = useAppStore();
  const { expoPushToken, requestPermission } = usePushNotifications();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const textColor = useColor("textLight");

  const { mutate } = useUpdateUser({
    onSuccess: (data) => {
      setUser(data);
    },
  });

  useEffect(() => {
    if (expoPushToken) {
      mutate({
        body: { user: { expo_push_token: expoPushToken } },
        id: user?.id as number,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expoPushToken]);

  return (
    <>
      <IconButton
        size={"small"}
        {...buttonProps}
        onPress={() => setOpenModal(true)}
      >
        <Bell color={textColor} />
      </IconButton>
      <CustomModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        backdropProps={{
          style: {
            justifyContent: "flex-end",
          },
        }}
        bodyProps={{
          style: {
            height: "95%",
            width: "100%",
          },
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
          }}
          variant="h3"
        >
          Centre de notifications
        </Typography>

        <View
          style={{
            marginTop: 24,
          }}
        >
          {user?.expo_push_token ? (
            <>
              <Typography variant="h4">
                Aucune notification pour le moment !
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h4">
                Tu {"n'as"} pas encore activé les notifications.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginTop: 16,
                }}
              >
                Sans cela tu ne recevras pas les alertes de tes invités !
              </Typography>

              <Button
                variant="contained"
                style={{
                  marginHorizontal: "auto",
                  marginTop: 32,
                }}
                onPress={requestPermission}
              >
                Activer les notifications
              </Button>
            </>
          )}
        </View>
      </CustomModal>
    </>
  );
}

export default NotificationMenu;
