import PageView from "@/components/ui/pageView";
import Tabs from "@/components/ui/tabs";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import Login from "./login";
import Signup from "./signup";

function Index() {
  const { tab } = useLocalSearchParams();

  return (
    <PageView>
      <Tabs
        currentTab={tab as string}
        tabs={["Se connecter", "S'inscrire"]}
        slotProps={{
          tabPanel: {
            style: {
              marginTop: 16,
            },
          },
          tabs: {
            sx: {
              borderTopWidth: 0,
              borderBottomWidth: 0,
            },
          },
        }}
      >
        <Login />
        <Signup />
      </Tabs>
    </PageView>
  );
}

export default Index;
