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

  return (
    <PageView>
      <TopBarWrapper title={event.title} />

      <Typography variant="h1">{event.title}</Typography>
    </PageView>
  );
}

export default Index;
