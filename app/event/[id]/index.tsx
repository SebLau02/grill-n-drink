import Avatar from "@/components/ui/avatar";
import Carousel from "@/components/ui/carrousel";
import FlexBox from "@/components/ui/flexBox";
import LabeledTypo from "@/components/ui/labeledTypo";
import PageView from "@/components/ui/pageView";
import TopBarWrapper from "@/components/ui/topBarWrapper";
import Typography from "@/components/ui/typography";
import { useEvent } from "@/hooks/useEvents";
import { useLocalSearchParams } from "expo-router";
import React from "react";

function Index() {
  const { id } = useLocalSearchParams();
  const { data } = useEvent(id as string);

  if (!data) {
    return null;
  }

  const event = data?.record;

  console.log(event);

  return (
    <PageView>
      <TopBarWrapper title={event.title} />

      <FlexBox direction="row" align="center" columnGap={1}>
        <Avatar
          src={event.user.avatar}
          name={`${event.user.firstname} ${event.user.lastname}`}
          rounded
        />
        <Typography variant="body1">{event.user.pseudo}</Typography>
      </FlexBox>
      <LabeledTypo
        sx={{
          marginTop: 16,
        }}
        label="Titre"
      >
        {event.title}
      </LabeledTypo>

      <Carousel
        slotProps={{
          paper: {
            style: {
              padding: 16,
              margin: 16,
            },
          },
        }}
        sections={[
          <LabeledTypo key={1} label="Description">
            {event.description}
          </LabeledTypo>,
          <LabeledTypo key={2} label="Date & heure">
            {event.date} à {event.time}
          </LabeledTypo>,
          <LabeledTypo key={3} label="Lieu">
            {event.location}
          </LabeledTypo>,
          <LabeledTypo key={4} label="Conditions">
            <FlexBox direction="column">
              {event.conditions.map((cond, i) => (
                <Typography variant="body1" key={i}>
                  {cond.condition}
                </Typography>
              ))}
            </FlexBox>
          </LabeledTypo>,
          <LabeledTypo key={5} label="Rôles">
            <FlexBox direction="column">
              {event.roles.map((role, i) => (
                <Typography variant="body2" key={i}>
                  {role.role}
                </Typography>
              ))}
            </FlexBox>
          </LabeledTypo>,
        ]}
      />
    </PageView>
  );
}

export default Index;
