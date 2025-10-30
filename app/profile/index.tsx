import EventCard from "@/components/eventCard";
import Avatar from "@/components/ui/avatar";
import ClickableRow from "@/components/ui/clickableRow";
import FlexBox from "@/components/ui/flexBox";
import PageView from "@/components/ui/pageView";
import Tabs from "@/components/ui/tabs";
import Typography from "@/components/ui/typography";
import { useColor } from "@/hooks/useColor";
import { useUserProfile } from "@/hooks/useUser";
import { useAppStore } from "@/store/useStore";
import { Plus } from "lucide-react-native";
import React, { useEffect } from "react";

function Index() {
  const { data: user, refetch } = useUserProfile();
  const textLight = useColor("textLight");
  const { shouldRefreshPage, setShouldRefreshPage } = useAppStore();

  useEffect(() => {
    if (shouldRefreshPage) {
      refetch();
      setShouldRefreshPage(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRefreshPage]);

  if (!user) {
    return null;
  }

  const { upcoming_events, past_events, draft_events } = user;

  if (!upcoming_events || !past_events || !draft_events) {
    return null;
  }

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
        <Typography variant="body1">{user.username}</Typography>
        {user.description !== "" ? (
          <Typography variant="body1">{user.description}</Typography>
        ) : (
          <ClickableRow
            label="Ajoute une description pour que les gens te connaissent mieux"
            value={<Plus color={textLight} />}
            path="settings/description"
            sx={{
              marginVertical: 8,
            }}
            columnGap={0}
            slotProps={{
              label: {
                variant: "body2",
              },
            }}
          />
        )}
      </FlexBox>

      {!user.phone_number && (
        <ClickableRow
          label="Ajoute ton numéro pour être joignable"
          value={<Plus color={textLight} />}
          path="settings/phone_number"
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
        tabs={["Grillades", "Grillades brouillons"]}
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
          {upcoming_events.map(
            (event) =>
              event && <EventCard key={event.id} event={event} avatar={false} />
          )}
        </FlexBox>
        <FlexBox
          direction="column"
          gap={2}
          sx={{
            alignItems: "stretch",
          }}
        >
          {draft_events.map(
            (event) =>
              event && <EventCard key={event.id} event={event} avatar={false} />
          )}
        </FlexBox>
      </Tabs>
    </PageView>
  );
}

export default Index;
