import Button from "@/components/ui/button";
import FlexBox from "@/components/ui/flexBox";
import PageView from "@/components/ui/pageView";
import { TextField } from "@/components/ui/textField";
import TopBarWrapper from "@/components/ui/topBarWrapper";
import { SETTINGS_SECTIONS } from "@/constants/constants";
import { useUser } from "@/hooks/useUser";
import { useToast } from "@/store/toast";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";

function Index() {
  const { data } = useUser();

  const [value, setValue] = useState<string>();
  const { slug } = useLocalSearchParams();
  const { addToast } = useToast();

  useEffect(() => {
    if (data) setValue(data.record[slug as keyof typeof data.record] as string);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const label = SETTINGS_SECTIONS[slug as keyof typeof SETTINGS_SECTIONS];

  const handleSubmit = () => {
    if (!value || value.length === 0 || value === "") {
      addToast({
        type: "danger",
        message: `Le champ ne peut pas être vide`,
        duration: 3000,
      });
      return;
    }
    addToast({
      type: "success",
      message: `${label} mis à jour avec succès !`,
      duration: 3000,
    });
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
