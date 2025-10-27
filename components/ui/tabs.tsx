import { Metrics } from "@/constants/theme";
import { useColor } from "@/hooks/useColor";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, ScrollView } from "react-native";
import Button from "./button";
import FlexBox, { FlexBoxProps } from "./flexBox";

const screenWidth = Dimensions.get("window").width;

interface Props {
  tabs: string[];
  children?: React.ReactNode;
  slotProps?: {
    tabPanel?: React.ComponentProps<any>;
    tabs?: FlexBoxProps;
  };
  currentTab?: string;
}

function Tabs({ tabs, children, slotProps, currentTab = "0" }: Props) {
  const [activeTab, setActiveTab] = useState(currentTab);

  const borderColor = useColor("border");

  const panels = React.Children.toArray(children);

  const labelAnim = useRef(new Animated.Value(Number(activeTab))).current;

  useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: Number(activeTab),
      duration: 200,
      useNativeDriver: true,
    }).start();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const translateX = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, screenWidth / tabs.length],
  });

  return (
    <>
      <FlexBox
        direction="row"
        justify="center"
        align="center"
        sx={[
          {
            position: "relative",
            alignItems: "stretch",
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: borderColor,
          },
          slotProps?.tabs?.sx,
        ]}
      >
        <Animated.View
          style={[
            {
              position: "absolute",
              top: 0,
              left: 0,
              transform: [{ translateX }],
              backgroundColor: useColor("contained"),
              width: screenWidth / tabs.length,
              borderRadius: Metrics.radius,
              height: "100%",
            },
          ]}
        >
          <Button variant={"text"}> </Button>
        </Animated.View>

        {tabs.map((t, i) => (
          <Button
            key={i}
            variant={"text"}
            style={[
              {
                width: screenWidth / tabs.length,
                marginVertical: "auto",
              },
            ]}
            onPress={() => setActiveTab(i.toString())}
          >
            {t}
          </Button>
        ))}
      </FlexBox>

      {panels.map((panel, i) =>
        activeTab === i.toString() ? (
          <ScrollView style={[slotProps?.tabPanel.style]} key={i}>
            {panel}
          </ScrollView>
        ) : null
      )}
    </>
  );
}

export default Tabs;
