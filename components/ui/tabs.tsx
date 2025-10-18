import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Dimensions, View } from "react-native";
import Button from "./button";
import FlexBox from "./flexBox";

const screenWidth = Dimensions.get("window").width;

interface Props {
  tabs: string[];
  children: React.ReactNode;
  slotProps?: {
    tabPanel?: React.ComponentProps<any>;
  };
}

function Tabs({ tabs, children, slotProps }: Props) {
  const router = useRouter();
  const { tab = "0" } = useLocalSearchParams();

  const panels = React.Children.toArray(children);

  return (
    <>
      <FlexBox
        direction="row"
        justify="between"
        sx={{
          alignItems: "stretch",
        }}
      >
        {tabs.map((t, i) => (
          <Button
            key={i}
            variant={tab === i.toString() ? "contained" : "text"}
            style={[{ width: screenWidth / tabs.length, alignSelf: "stretch" }]}
            onPress={() => router.replace(`/profile?tab=${i}` as never)}
          >
            {t}
          </Button>
        ))}
      </FlexBox>

      {panels.map((panel, i) =>
        tab === i.toString() ? (
          <View style={[slotProps?.tabPanel.style]} key={i}>
            {panel}
          </View>
        ) : null
      )}
    </>
  );
}

export default Tabs;
