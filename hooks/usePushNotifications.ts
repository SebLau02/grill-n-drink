import { useState } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

/**
 * Hook pour gérer les notifications push Expo
 *
 * Usage :
 * const { permissionStatus, expoPushToken, requestPermission } = usePushNotifications()
 *
 * - permissionStatus : 'granted' | 'denied' | 'undetermined' | null
 * - expoPushToken : string | null
 * - requestPermission : fonction pour déclencher la demande de permission manuellement
 */
export default function usePushNotifications() {
  const [permissionStatus, setPermissionStatus] =
    useState<Notifications.PermissionStatus | null>(null);
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  /**
   * Fonction pour demander la permission et récupérer le token Expo
   */
  async function requestPermission() {
    if (!Device.isDevice) return;

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus: Notifications.PermissionStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    setPermissionStatus(finalStatus);

    if (finalStatus === "granted") {
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      setExpoPushToken(token);
    }
  }

  return { permissionStatus, expoPushToken, requestPermission };
}
