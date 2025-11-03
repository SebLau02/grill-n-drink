import { Event } from "@/config/types";
import { useRouter } from "expo-router";
import React from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Avatar from "./ui/avatar";
import FlexBox from "./ui/flexBox";
import Paper, { PaperProps } from "./ui/paper";
import Typography from "./ui/typography";
import { Pen } from "lucide-react-native";
import { useColor } from "@/hooks/useColor";

interface Props extends PaperProps {
  event: Event;
  avatar?: boolean;
}
function EventCard({ event, avatar = true, style }: Props) {
  const router = useRouter();
  const textColor = useColor("textLight");

  return (
    <Paper
      variant="outlined"
      style={[
        {
          marginBottom: 16,
          width: "100%",
          overflow: "hidden",
        },
        style,
      ]}
    >
      <FlexBox
        direction="row"
        align="center"
        justify="between"
        sx={{
          padding: 8,
        }}
      >
        <FlexBox
          direction="row"
          align="center"
          sx={{
            padding: 8,
          }}
        >
          {event.user && avatar && (
            <Pressable onPress={() => router.push("/profile" as never)}>
              <Avatar
                src={event.user.avatar}
                name={`${event.user.firstname} ${event.user.lastname}`}
                rounded
                style={{ marginRight: 16 }}
              />
            </Pressable>
          )}

          <Typography variant="h2">{event.title}</Typography>
        </FlexBox>
        {event.status === "draft" && (
          <TouchableOpacity
            style={{ marginLeft: "auto" }}
            onPress={() => router.push(`/event/${event.id}/edit` as never)}
          >
            <Typography variant="body1">
              <Pen color={textColor} />
            </Typography>
          </TouchableOpacity>
        )}
      </FlexBox>

      <Pressable onPress={() => router.push(`/event/${event.id}` as never)}>
        <ImageBackground
          source={{ uri: event.cover }}
          style={{
            height: 150,
            width: "100%",
            justifyContent: "flex-end",
          }}
          imageStyle={{ padding: 16 }}
        >
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
            pointerEvents="none"
          />
          <FlexBox
            direction="row"
            justify="between"
            align="end"
            sx={{
              padding: 8,
            }}
          >
            <FlexBox direction="column">
              <Typography variant="body1">
                {String(event.formated_date)}
              </Typography>
              <Typography variant="body1">{event.city}</Typography>
            </FlexBox>
            {event.participation && (
              <FlexBox direction="row">
                {event.participation.map((participant, index) => (
                  <Avatar
                    key={index}
                    src={participant.avatar}
                    rounded
                    name={`${participant.firstname} ${participant.lastname}`}
                  />
                ))}
              </FlexBox>
            )}
          </FlexBox>
        </ImageBackground>
      </Pressable>
    </Paper>
  );
}

export default EventCard;
