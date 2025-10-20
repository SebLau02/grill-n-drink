import EventCard from "@/components/eventCard";
import Avatar from "@/components/ui/avatar";
import ClickableRow from "@/components/ui/clickableRow";
import FlexBox from "@/components/ui/flexBox";
import PageView from "@/components/ui/pageView";
import Tabs from "@/components/ui/tabs";
import Typography from "@/components/ui/typography";
import { useColor } from "@/hooks/useColor";
import { useUser } from "@/hooks/useUser";
import { Plus } from "lucide-react-native";
import React from "react";

function Index() {
  const { data } = useUser();
  const textLight = useColor("textLight");

  if (!data) {
    return null;
  }

  const user = data.record;

  const { upcomingEvents, pastEvents } = user;

  return (
    <PageView scrollable={false}>
      <FlexBox
        direction="column"
        sx={{
          padding: 16,
          paddingTop: 0,
        }}
      >
        <Avatar
          name={`${user.firstname} ${user.lastname}`}
          src={user.avatar}
          rounded
          width={100}
          height={100}
          style={{
            marginBottom: 8,
          }}
        />
        <Typography variant="body1">{user.pseudo}</Typography>
        <Typography variant="body1">{user.description}</Typography>
      </FlexBox>

      {!user.phone && (
        <ClickableRow
          label="Ajoute ton numéro pour être joignable"
          value={<Plus color={textLight} />}
          path="settings/phone"
          sx={{
            marginVertical: 8,
          }}
          slotProps={{
            label: {
              variant: "body2",
            },
          }}
        />
      )}

      <Tabs
        tabs={["Grillades", "Grillades passées"]}
        slotProps={{
          tabPanel: {
            style: {
              marginTop: 16,
              paddingHorizontal: 16,
            },
          },
        }}
      >
        <FlexBox direction="column" gap={2}>
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
    </PageView>
  );
}

export default Index;
