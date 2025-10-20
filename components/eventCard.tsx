import { Event } from "@/config/types";
import { useRouter } from "expo-router";
import React from "react";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import Avatar from "./ui/avatar";
import FlexBox from "./ui/flexBox";
import Paper from "./ui/paper";
import Typography from "./ui/typography";

interface Props {
  event: Event;
  avatar?: boolean;
}
function EventCard({ event, avatar = true }: Props) {
  const router = useRouter();

  return (
    <Paper
      variant="outlined"
      style={{
        marginBottom: 16,
        width: "100%",
        overflow: "hidden",
      }}
    >
      {avatar && (
        <FlexBox
          direction="row"
          align="center"
          sx={{
            padding: 8,
          }}
        >
          <Pressable onPress={() => router.push("/profile" as never)}>
            <Avatar
              src={event.user.avatar}
              name={`${event.user.firstname} ${event.user.lastname}`}
              rounded
              style={{ marginRight: 16 }}
            />
          </Pressable>

          <Typography variant="h2">{event.name}</Typography>
        </FlexBox>
      )}

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
            sx={{ padding: 8 }}
          >
            <FlexBox direction="column">
              <Typography variant="body1">{event.date}</Typography>
              <Typography variant="body1">{event.city}</Typography>
            </FlexBox>
            <FlexBox direction="row">
              {event.participation.map((participant, index) => (
                <Avatar key={index} src={participant.avatar} rounded />
              ))}
            </FlexBox>
          </FlexBox>
        </ImageBackground>
      </Pressable>
    </Paper>
  );
}

export default EventCard;
