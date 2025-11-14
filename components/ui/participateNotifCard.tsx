import { Check, X } from "lucide-react-native";
import React from "react";
import IconButton from "./iconButton";
import Typography from "./typography";
import { useColor } from "@/hooks/useColor";
import { GestureResponderEvent, View } from "react-native";

interface Props {
  onClose?: () => void;
}
function ParticipateNotifCard({ onClose }: Props) {
  const redColor = useColor("primary900");
  const successColor = useColor("success");

  const handleClose = (e: GestureResponderEvent) => {
    e.stopPropagation();
    if (onClose) {
      onClose();
    }
  };

  return (
    <View
      style={{
        margin: "auto",
        flexDirection: "row",
        alignSelf: "flex-start",
        marginTop: 8,
        columnGap: 8,
      }}
    >
      <View>
        <IconButton>
          <Check color={successColor} />
        </IconButton>
        <Typography
          sx={{
            textAlign: "center",
          }}
          variant="caption"
        >
          Accepter
        </Typography>
      </View>
      <View>
        <IconButton onPress={handleClose}>
          <X color={redColor} />
        </IconButton>
        <Typography
          sx={{
            textAlign: "center",
          }}
          variant="caption"
        >
          Décliner
        </Typography>
      </View>
    </View>
  );
}

export default ParticipateNotifCard;
