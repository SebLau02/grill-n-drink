import PageView from "@/components/ui/pageView";
import Select from "@/components/ui/select";
import Typography from "@/components/ui/typography";
import { Event } from "@/config/types";
import { useEvent } from "@/hooks/useEvents";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";

function Index() {
  const [eventUpdating, setEventUpdating] = useState<Event>({
    id: 0,
    cover: "",
    name: "",
    date: new Date(),
    city: "",
    title: "",
    time: new Date(),
    location: "",
    conditions: [],
    roles: [],
    description: "",
    zipcode: "",
    location_details: "",
    status: "draft",
    status_value: 0,
  });
  const { id } = useLocalSearchParams();

  const { data } = useEvent(String(id));

  useEffect(() => {
    if (data) setEventUpdating(data);
  }, [data]);

  if (!eventUpdating) return null;

  return (
    <PageView
      style={{
        paddingHorizontal: 16,
      }}
    >
      <Typography variant="h5">{eventUpdating.title}</Typography>

      <Select
        label="Statut"
        options={[
          { label: "Brouillon", value: 0 },
          { label: "En ligne", value: 1 },
        ]}
        onChange={(value) =>
          setEventUpdating((prev) => ({
            ...prev,
            status_value: Number(value) as 0 | 1 | 2,
          }))
        }
        value={eventUpdating.status_value}
      />
    </PageView>
  );
}

export default Index;
