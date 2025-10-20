import { useColor } from "@/hooks/useColor";
import React from "react";
import { ScrollView, ScrollViewProps, View } from "react-native";

function PageView({
  children,
  scrollable = true,
  ...props
}: { children?: React.ReactNode; scrollable?: boolean } & ScrollViewProps) {
  const backgroundColor = useColor("background");

  if (!scrollable) {
    return (
      <View
        style={[
          {
            flex: 1,
            backgroundColor,
          },
          props.style,
        ]}
      >
        {children}
      </View>
    );
  }

  return (
    <View style={[{ flex: 1, backgroundColor }, props.style]}>
      <ScrollView
        contentContainerStyle={[
          { flexGrow: 1, backgroundColor },
          props.contentContainerStyle,
        ]}
        {...props}
      >
        {children}
      </ScrollView>
    </View>
  );
}

export default PageView;
