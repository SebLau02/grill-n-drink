import EventCard from "@/components/eventCard";
import Avatar from "@/components/ui/avatar";
import BottomBarWrapper from "@/components/ui/bottomBarWrapper";
import FlexBox from "@/components/ui/flexBox";
import PageView from "@/components/ui/pageView";
import Tabs from "@/components/ui/tabs";
import Typography from "@/components/ui/typography";
import { useUser } from "@/hooks/useUser";
import React from "react";

function Index() {
  const { data } = useUser();

  if (!data) {
    return null;
  }

  const user = data.record;

  const { upcomingEvents, pastEvents } = user;

  return (
    <PageView>
      <FlexBox
        direction="column"
        gap={2}
        sx={{
          padding: 16,
        }}
      >
        <Avatar name={user.pseudo} rounded width={100} height={100} />
        <Typography variant="body1">{user.pseudo}</Typography>
        <Typography variant="body1">{user.description}</Typography>
      </FlexBox>

      <Tabs
        tabs={["Grillades", "Grillades passées"]}
        slotProps={{
          tabPanel: {
            style: {
              padding: 16,
            },
          },
        }}
      >
        <FlexBox direction="column" gap={2} sx={{}}>
          {upcomingEvents.map(
            (event) =>
              event && <EventCard key={event.id} event={event} avatar={false} />
          )}
        </FlexBox>
        <FlexBox direction="column" gap={2}>
          {pastEvents.map(
            (event) =>
              event && <EventCard key={event.id} event={event} avatar={false} />
          )}
        </FlexBox>
      </Tabs>

      <BottomBarWrapper />
    </PageView>
  );
}

export default Index;
