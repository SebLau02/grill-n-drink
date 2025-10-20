import ClickableRow from "@/components/ui/clickableRow";
import PageView from "@/components/ui/pageView";
import { User } from "@/config/types";
import { useUser } from "@/hooks/useUser";
import React from "react";

const accountSettings = [
  {
    title: "Compte",
    list: [
      { label: "Nom", name: "firstname", path: "settings/firstname" },
      { label: "Prénom", name: "lastname", path: "settings/lastname" },
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
  const { data } = useUser();

  if (!data) {
    return null;
  }

  const user = data.record;

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
              value={getUserValue(user, item.name)}
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
    </PageView>
  );
}

export default Index;
