import PageView from "@/components/ui/pageView";
import Typography from "@/components/ui/typography";
import { Fonts } from "@/constants/theme";
import React from "react";

function Index() {
  return (
    <PageView>
      <Typography variant="h1" style={{ fontFamily: Fonts.bricolage }}>
        Index
      </Typography>
    </PageView>
  );
}

export default Index;
