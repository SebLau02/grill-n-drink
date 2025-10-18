import EventCard from "@/components/eventCard";
import FlexBox from "@/components/ui/flexBox";
import PageView from "@/components/ui/pageView";
import { useEvents } from "@/hooks/useEvents";

export default function Index() {
  const { data } = useEvents();

  if (!data) {
    return null;
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
        {data.record.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </FlexBox>
    </PageView>
  );
}
