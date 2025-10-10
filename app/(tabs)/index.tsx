import PageView from "@/components/ui/pageView";
import TopBarWrapper from "@/components/ui/topBarWrapper";
import { useState } from "react";

export default function HomeScreen() {
  const [formData, setFormData] = useState<{ [key: string]: string | number }>(
    {}
  );

  return (
    <PageView>
      <TopBarWrapper
        navigateBack={true}
        pageTitle="La Grill'Zone"
        showAvatar={true}
      ></TopBarWrapper>
    </PageView>
  );
}
