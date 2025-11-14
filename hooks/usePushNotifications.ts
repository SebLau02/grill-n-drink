import { useState, useEffect } from "react";
import { Platform, Alert } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function useNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
    []
  );

  useEffect(() => {
    registerForPushNotificationsAsync().then(
      (token) => token && setExpoPushToken(token)
    );

    if (Platform.OS === "android") {
      Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? [])
      );
    }

    const notificationListener =
      Notifications.addNotificationReceivedListener(setNotification);
    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  async function scheduleNotification(
    title: string,
    body: string,
    data?: Record<string, unknown>
  ) {
    const trigger: Notifications.TimeIntervalTriggerInput = {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 2,
      repeats: false,
    };

    await Notifications.scheduleNotificationAsync({
      content: { title, body, data },
      trigger,
    });
  }

  async function registerForPushNotificationsAsync(): Promise<string | null> {
    let token: string | null = null;
    Alert.alert("début du processus d'obtention du token");

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("myNotificationChannel", {
        name: "Default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (!Device.isDevice) {
      Alert.alert("Must use physical device for Push Notifications");
      return null;
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    Alert.alert("Statut des permissions : " + existingStatus);

    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      Alert.alert("Nouveau statut des permissions : " + status);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      Alert.alert("Failed to get push token for push notification!");
      return null;
    }

    Alert.alert("suite du processus d'obtention du token");

    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;

      Alert.alert("Project ID: " + projectId);

      if (!projectId) throw new Error("Project ID not found");

      Alert.alert("Obtaining token...");

      token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;

      Alert.alert("Token obtenu : " + token);

      console.log(token);
    } catch (e) {
      console.log(e);
      Alert.alert("Erreur merde : " + e);
    }

    return token;
  }

  return { expoPushToken, notification, channels, scheduleNotification };
}
