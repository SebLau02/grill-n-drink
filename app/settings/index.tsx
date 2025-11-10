import Button from "@/components/ui/button";
import ClickableRow from "@/components/ui/clickableRow";
import FlexBox from "@/components/ui/flexBox";
import PageView from "@/components/ui/pageView";
import Paper from "@/components/ui/paper";
import Typography from "@/components/ui/typography";
import { removeToken } from "@/config/authStorage";
import { User } from "@/config/types";
import { useUser } from "@/hooks/useUser";
import { useToast } from "@/store/toast";
import { useAppStore } from "@/store/useStore";
import { router } from "expo-router";
import React, { useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";

const accountSettings = [
  {
    title: "Compte",
    list: [
      { label: "Nom", name: "firstname", path: "settings/firstname" },
      { label: "Prénom", name: "lastname", path: "settings/lastname" },
      {
        label: "Nom d'utilisateur",
        name: "username",
        path: "settings/username",
      },
      {
        label: "Téléphone",
        name: "phone_number",
        path: "settings/phone_number",
      },
      { label: "Email", name: "email", path: "settings/email" },
      { label: "Mot de passe", name: "password", path: "settings/password" },
    ],
  },
];

const privacySettings = [
  {
    title: "Plus d'informations",
    list: [
      {
        label: "Politique de confidentialité",
        path: "privacyPolicy",
      },
      {
        label: "Conditions d'utilisations",
        path: "termsOfService",
      },
    ],
  },
];

const getUserValue = (user: User, key: string) => {
  if (key in user) {
    return user[key as keyof User] as string;
  }
  return "";
};

function Index() {
  const { user, setUser } = useAppStore();
  const { addToast } = useToast();
  const { data } = useUser();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleLogout = () => {
    setOpenModal(false);
    removeToken();
    setUser(null);
    addToast({
      message: "Bye bye ! 👋. À bientôt !",
      type: "info",
    });
    setTimeout(() => {
      router.replace("/authentication?tab=0");
    }, 1000);
  };

  if (!data) {
    return null;
  }

  const userData = data;

  if (user) {
    return (
      <PageView>
        {accountSettings.map((section, index) => (
          <React.Fragment key={index}>
            <ClickableRow
              label={section.title}
              value={""}
              path="settings"
              clickable={false}
              slotProps={{
                label: {
                  variant: "h6",
                },
              }}
            />
            {section.list.map((item, idx) => (
              <ClickableRow
                key={idx}
                label={item.label}
                value={getUserValue(userData, item.name)}
                path={item.path}
                slotProps={{
                  label: {
                    variant: "body2",
                  },
                }}
              />
            ))}
          </React.Fragment>
        ))}
        {privacySettings.map((section, index) => (
          <React.Fragment key={index}>
            <ClickableRow
              label={section.title}
              value={""}
              path="settings"
              clickable={false}
              slotProps={{
                label: {
                  variant: "h6",
                },
              }}
            />
            {section.list.map((item, idx) => (
              <ClickableRow
                key={idx}
                label={item.label}
                value={""}
                path={item.path}
                slotProps={{
                  label: {
                    variant: "body2",
                  },
                }}
              />
            ))}
          </React.Fragment>
        ))}

        <TouchableOpacity
          onPress={() => {
            setOpenModal(true);
          }}
          style={{
            marginTop: "auto",
            marginBottom: 16,
          }}
        >
          <ClickableRow
            label={"Déconnexion"}
            value={""}
            path="logout"
            clickable={false}
            sx={{
              justifyContent: "center",
            }}
            slotProps={{
              label: {
                variant: "h6",
              },
            }}
          />
        </TouchableOpacity>

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
                Tu nous quitte ?
              </Typography>
              <FlexBox
                direction="row"
                justify="between"
                align="center"
                columnGap={2}
                sx={{ marginTop: 24 }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  onPress={() => setOpenModal(false)}
                >
                  Annuler
                </Button>
                <Button variant="contained" size="small" onPress={handleLogout}>
                  Se déconnecter
                </Button>
              </FlexBox>
            </Paper>
          </View>
        </Modal>
      </PageView>
    );
  }

  return (
    <PageView>
      {privacySettings.map((section, index) => (
        <React.Fragment key={index}>
          <ClickableRow
            label={section.title}
            value={""}
            path="settings"
            clickable={false}
            slotProps={{
              label: {
                variant: "h6",
              },
            }}
          />
          {section.list.map((item, idx) => (
            <ClickableRow
              key={idx}
              label={item.label}
              value={""}
              path={item.path}
              slotProps={{
                label: {
                  variant: "body2",
                },
              }}
            />
          ))}
        </React.Fragment>
      ))}
    </PageView>
  );
}

export default Index;
