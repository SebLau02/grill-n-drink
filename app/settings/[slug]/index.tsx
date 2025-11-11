import Button from "@/components/ui/button";
import FlexBox from "@/components/ui/flexBox";
import PageView from "@/components/ui/pageView";
import { TextField } from "@/components/ui/textField";
import TopBarWrapper from "@/components/ui/topBarWrapper";
import { SETTINGS_SECTIONS } from "@/constants/constants";
import { useUpdateUser, useUser } from "@/hooks/useUser";
import { useToast } from "@/store/toast";
import { useAppStore } from "@/store/useStore";
import { Redirect, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";

function Index() {
  const { user } = useAppStore();
  const { data } = useUser();

  const [value, setValue] = useState<string>();
  const { slug } = useLocalSearchParams();
  const { addToast } = useToast();

  const { mutate } = useUpdateUser({
    onSuccess: () => {
      addToast({
        type: "success",
        message: `${
          SETTINGS_SECTIONS[slug as keyof typeof SETTINGS_SECTIONS]
        } mis à jour avec succès !`,
        duration: 3000,
      });
    },
    onError: (error) => {
      addToast({
        type: "danger",
        message: `Erreur lors de la mise à jour : ${error}`,
        duration: 3000,
      });
    },
  });

  useEffect(() => {
    if (data) setValue(data[slug as keyof typeof data] as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!user) {
    return <Redirect href="/authentication?tab=0" />;
  }

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
    mutate({ body: { user: { [slug as string]: value } }, id: user.id });
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
          value={value || ""}
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
