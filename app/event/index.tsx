import PageView from "@/components/ui/pageView";
import TopBarWrapper from "@/components/ui/topBarWrapper";
import Typography from "@/components/ui/typography";
import React from "react";

function Index() {
  return (
    <PageView>
      <TopBarWrapper title="Event Detail" />

      <Typography variant="h1">Event Detail</Typography>
    </PageView>
  );
}

export default Index;
