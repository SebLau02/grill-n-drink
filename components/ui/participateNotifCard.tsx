import { Check, X } from "lucide-react-native";
import React from "react";
import IconButton from "./iconButton";
import Typography from "./typography";
import { useColor } from "@/hooks/useColor";
import { View } from "react-native";

function ParticipateNotifCard() {
  const redColor = useColor("primary900");
  const successColor = useColor("success");

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
        <IconButton>
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
