import Button from "@/components/ui/button";
import FlexBox from "@/components/ui/flexBox";
import PageView from "@/components/ui/pageView";
import { TextField } from "@/components/ui/textField";
import TopBarWrapper from "@/components/ui/topBarWrapper";
import { SETTINGS_SECTIONS } from "@/constants/constants";
import { useUser } from "@/hooks/useUser";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ToastAndroid } from "react-native";

function Index() {
  const { data } = useUser();

  const [value, setValue] = useState<string>();
  const { slug } = useLocalSearchParams();

  useEffect(() => {
    if (data) setValue(data.record[slug as keyof typeof data.record] as string);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const label = SETTINGS_SECTIONS[slug as keyof typeof SETTINGS_SECTIONS];

  const handleSubmit = () => {
    ToastAndroid.show("Message rapide", ToastAndroid.SHORT);
  };

  if (!data) {
    return null;
  }

  return (
    <PageView>
      <TopBarWrapper title={label} />
      <FlexBox
        align="stretch"
        justify="center"
        direction="column"
        gap={2}
        sx={{ padding: 16 }}
      >
        <TextField
          label={label}
          value={value}
          onChangeText={(text) => setValue(text)}
          variant="text"
          style={{
            width: "100%",
          }}
        />
        <Button
          variant="contained"
          style={{
            alignSelf: "center",
          }}
          onPress={handleSubmit}
        >
          Valider
        </Button>
      </FlexBox>
    </PageView>
  );
}

export default Index;
