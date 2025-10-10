import { useColor } from "@/hooks/useColor";
import React from "react";
import { ScrollView, ScrollViewProps, View } from "react-native";

function PageView({
  children,
  ...props
}: { children: React.ReactNode } & ScrollViewProps) {
  const backgroundColor = useColor("background");

  return (
    <View style={{ flex: 1, backgroundColor, paddingTop: 10 }}>
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
