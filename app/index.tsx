import EventCard from "@/components/eventCard";
import FlexBox from "@/components/ui/flexBox";
import PageView from "@/components/ui/pageView";
import Typography from "@/components/ui/typography";
import { useEvents } from "@/hooks/useEvents";

export default function Index() {
  const { data } = useEvents();

  if (!data) {
    return null;
  }

  if (data.length === 0) {
    return (
      <PageView>
        <Typography
          variant="h5"
          sx={{
            marginTop: 64,
            marginHorizontal: "auto",
            maxWidth: "80%",
          }}
        >
          Aucun événement {"n'est"} disponible pour le moment. Revenez plus tard
          !
        </Typography>
      </PageView>
    );
  }

  return (
    <PageView>
      <FlexBox
        direction="column"
        sx={{
          alignItems: "stretch",
          paddingHorizontal: 16,
        }}
      >
        {data.map((event) => (
          <EventCard key={event.id} event={event} avatar={true} />
        ))}
      </FlexBox>
    </PageView>
  );
}
