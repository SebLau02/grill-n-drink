import { useColor } from "@/hooks/useColor";
import React from "react";
import { ScrollView, ScrollViewProps } from "react-native";

function PageView({
  children,
  ...props
}: { children: React.ReactNode } & ScrollViewProps) {
  const backgroundColor = useColor("background");

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: backgroundColor }}
      {...props}
    >
      {children}
    </ScrollView>
  );
}

export default PageView;
