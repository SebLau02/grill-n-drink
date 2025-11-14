import React, { useEffect, useState } from "react";
import IconButton, { IconButtonProps } from "./iconButton";
import { Bell, Check, X } from "lucide-react-native";
import { useColor } from "@/hooks/useColor";
import CustomModal from "./modal";
import Typography from "./typography";
import { useAppStore } from "@/store/useStore";
import Button from "./button";
import { Dimensions, View } from "react-native";
import { useMyNotifications, useUpdateUser } from "@/hooks/useUser";
import { NotificationType } from "@/config/types";
import Paper from "./paper";
import { useToast } from "@/store/toast";
import Badge from "./badge";
import FlexBox from "./flexBox";
import ParticipateNotifCard from "./participateNotifCard";
// import useNotifications from "@/hooks/usePushNotifications";

const screenHeight = Dimensions.get("window").height;

interface Props {
  buttonProps?: IconButtonProps;
}
function NotificationMenu({ buttonProps }: Props) {
  const { user, setUser, notifications, setNotifications } = useAppStore();
  const { addToast } = useToast();
  // const { expoPushToken } = useNotifications();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const textColor = useColor("textLight");
  const redColor = useColor("primary900");
  const border = useColor("border");

  const { mutate } = useUpdateUser({
    onSuccess: (data) => {
      setUser(data);
    },
  });
  const { data } = useMyNotifications(user?.id as number);

  // useEffect(() => {
  //   if (expoPushToken) {
  //     console.log("******", expoPushToken);
  //     addToast({
  //       message: "Push token obtenu : " + expoPushToken,
  //       type: "success",
  //     });
  //     mutate({
  //       body: { user: { expo_push_token: expoPushToken } },
  //       id: user?.id as number,
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [expoPushToken]);

  useEffect(() => {
    if (data) setNotifications(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <Badge count={notifications.length}>
        <IconButton
          size={"small"}
          {...buttonProps}
          onPress={() => setOpenModal(true)}
        >
          <Bell color={textColor} />
        </IconButton>
      </Badge>

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
            height: screenHeight * 0.95,
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
              {notifications ? (
                <FlexBox
                  direction="column"
                  rowGap={1}
                  sx={{
                    maxWidth: "100%",
                  }}
                  align="stretch"
                >
                  {notifications.map((notification, i) => (
                    <Paper
                      key={i}
                      style={{
                        padding: 8,
                        width: "100%",
                        position: "relative",
                      }}
                    >
                      <Typography variant="h6">{notification.title}</Typography>
                      <Typography variant="body2">
                        {notification.content}
                      </Typography>
                      {notification.notification_type === "participation" ? (
                        <ParticipateNotifCard />
                      ) : (
                        <View
                          style={{
                            position: "absolute",
                            top: -16,
                            right: -16,
                          }}
                        >
                          <IconButton rounded size="small" active>
                            <X color={redColor} size={14} />
                          </IconButton>
                        </View>
                      )}
                    </Paper>
                  ))}
                </FlexBox>
              ) : (
                <Typography variant="h4">
                  Aucune notification pour le moment !
                </Typography>
              )}
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
