import EventCard from "@/components/eventCard";
import Avatar from "@/components/ui/avatar";
import Button from "@/components/ui/button";
import ClickableRow from "@/components/ui/clickableRow";
import FlexBox from "@/components/ui/flexBox";
import PageView from "@/components/ui/pageView";
import Paper from "@/components/ui/paper";
import Tabs from "@/components/ui/tabs";
import Typography from "@/components/ui/typography";
import { UserProfile } from "@/config/types";
import { AVATARS } from "@/constants/constants";
import { useColor } from "@/hooks/useColor";
import { useUpdateUser, useUserProfile } from "@/hooks/useUser";
import { useToast } from "@/store/toast";
import { useAppStore } from "@/store/useStore";
import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";

function Index() {
  const { data: user, refetch } = useUserProfile({
    staleTime: 0,
    cacheTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
  const textLight = useColor("textLight");
  const { shouldRefreshPage, setShouldRefreshPage, setUser } = useAppStore();
  const { addToast } = useToast();

  const [profilUser, setProfilUser] = useState<UserProfile>();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { mutate } = useUpdateUser({
    onSuccess: (data) => {
      setOpenModal(false);
      setUser(data);
      setProfilUser(
        (prev) => ({ ...prev, avatar_url: data.avatar_url } as UserProfile)
      );
      addToast({
        type: "success",
        message: `Avatar mis à jour avec succès !`,
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
    if (shouldRefreshPage) {
      refetch();
      setShouldRefreshPage(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRefreshPage]);

  useEffect(() => {
    if (user) setProfilUser(user);
  }, [user]);

  if (!profilUser) {
    return null;
  }

  const { upcoming_events, past_events, draft_events } = profilUser;

  if (!upcoming_events || !past_events || !draft_events) {
    return null;
  }

  return (
    <PageView scrollable={false}>
      <FlexBox
        direction="column"
        sx={{
          padding: 16,
          paddingTop: 0,
        }}
      >
        <TouchableOpacity onPress={() => setOpenModal(true)}>
          <Avatar
            name={`${profilUser.firstname} ${profilUser.lastname}`}
            src={profilUser.avatar_url}
            rounded
            width={100}
            height={100}
            style={{
              marginBottom: 8,
            }}
          />
        </TouchableOpacity>
        <Typography variant="body1">{profilUser.username}</Typography>
        {profilUser.description !== "" ? (
          <Typography variant="body1">{profilUser.description}</Typography>
        ) : (
          <ClickableRow
            label="Ajoute une description pour que les gens te connaissent mieux"
            value={<Plus color={textLight} />}
            path="settings/description"
            sx={{
              marginVertical: 8,
            }}
            columnGap={0}
            slotProps={{
              label: {
                variant: "body2",
              },
            }}
          />
        )}
      </FlexBox>

      {!profilUser.phone_number && (
        <ClickableRow
          label="Ajoute ton numéro pour être joignable"
          value={<Plus color={textLight} />}
          path="settings/phone_number"
          sx={{
            marginVertical: 8,
          }}
          slotProps={{
            label: {
              variant: "body2",
            },
          }}
        />
      )}

      <Tabs
        tabs={["Grillades", "Grillades brouillons"]}
        slotProps={{
          tabPanel: {
            style: {
              marginTop: 16,
              paddingHorizontal: 16,
            },
          },
        }}
      >
        <FlexBox direction="column" gap={2} align="stretch">
          {upcoming_events.map(
            (event) =>
              event && <EventCard key={event.id} event={event} avatar={false} />
          )}
          {upcoming_events.length === 0 && (
            <FlexBox direction="column" align="center" gap={2}>
              <Typography
                variant="h6"
                style={{
                  textAlign: "center",
                  marginTop: 32,
                  maxWidth: 280,
                }}
              >
                Tu {"n'as"} aucune Grillade à venir pour le moment.
              </Typography>
              <Button
                onPress={() => {
                  router.push("/create");
                }}
              >
                Créer une Grillade
              </Button>
            </FlexBox>
          )}
        </FlexBox>
        <FlexBox
          direction="column"
          gap={2}
          sx={{
            alignItems: "stretch",
          }}
        >
          {draft_events.map(
            (event) =>
              event && <EventCard key={event.id} event={event} avatar={false} />
          )}

          {draft_events.length === 0 && (
            <Typography
              variant="h6"
              sx={{
                marginHorizontal: "auto",
                marginTop: 32,
                textAlign: "center",
              }}
            >
              Tu {"n'as"} aucun brouillon pour le moment.
            </Typography>
          )}
        </FlexBox>
      </Tabs>

      <Modal
        visible={openModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setOpenModal(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <Paper
            variant="outlined"
            style={{
              padding: 16,
              width: "90%",
            }}
          >
            <Typography
              variant={"h6"}
              sx={{
                marginHorizontal: "auto",
              }}
            >
              Choisi ton avatar parmis nos modèles !
            </Typography>
            <FlexBox
              direction="row"
              justify="between"
              align="center"
              flexWrap="wrap"
              columnGap={2}
              sx={{ marginTop: 24 }}
            >
              {Object.entries(AVATARS).map(([key, url], index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    mutate({ body: { avatar_id: key }, id: profilUser.id })
                  }
                >
                  <Avatar
                    name={`Avatar ${index + 1}`}
                    src={url}
                    rounded
                    width={60}
                    height={60}
                  />
                </TouchableOpacity>
              ))}
            </FlexBox>
          </Paper>
        </View>
      </Modal>
    </PageView>
  );
}

export default Index;
