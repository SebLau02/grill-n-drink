import Button from "@/components/ui/button";
import FlexBox from "@/components/ui/flexBox";
import PageView from "@/components/ui/pageView";
import Paper from "@/components/ui/paper";
import Tabs from "@/components/ui/tabs";
import { TextField } from "@/components/ui/textField";
import Typography from "@/components/ui/typography";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

function Index() {
  const router = useRouter();
  const { tab } = useLocalSearchParams();

  return (
    <PageView>
      <Tabs
        currentTab={tab as string}
        tabs={["Se connecter", "S'inscrire"]}
        slotProps={{
          tabPanel: {
            style: {
              marginTop: 16,
            },
          },
          tabs: {
            sx: {
              borderTopWidth: 0,
              borderBottomWidth: 0,
            },
          },
        }}
      >
        <Paper
          style={{
            margin: "auto",
            width: 280,
            padding: 16,
          }}
        >
          <Typography variant="h6">
            Connecte toi pour accéder à tes barbecue
          </Typography>

          <TextField
            label="Email"
            sx={{
              marginTop: 16,
            }}
            fullWidth
          />
          <TextField
            label="Mot de passe"
            fullWidth
            sx={{
              marginVertical: 8,
            }}
          />

          <FlexBox
            direction="row"
            align="center"
            justify="between"
            sx={{
              marginVertical: 16,
            }}
          >
            <Button variant="outlined">Annuler</Button>
            <Button variant="contained">Se connecter</Button>
          </FlexBox>

          <TouchableOpacity
            onPress={() => router.push("/forgotPassword" as never)}
            style={{
              marginLeft: "auto",
            }}
          >
            <Typography variant="caption">Mot de passe oublié ?</Typography>
          </TouchableOpacity>
        </Paper>
        <Paper
          style={{
            margin: "auto",
            width: 280,
            padding: 16,
          }}
        >
          <Typography variant="h6">
            Inscrit toi et rejoint la communauté des amateurs de barbecue !
          </Typography>

          <TextField
            label="Nom"
            sx={{
              marginTop: 16,
            }}
            fullWidth
          />

          <TextField
            label="Prénom"
            sx={{
              marginTop: 16,
            }}
            fullWidth
          />
          <TextField
            label="Nom d'utilisateur"
            sx={{
              marginTop: 16,
            }}
            fullWidth
          />

          <TextField
            label="Email"
            sx={{
              marginTop: 16,
            }}
            fullWidth
          />
          <TextField
            label="Mot de passe"
            fullWidth
            sx={{
              marginVertical: 8,
            }}
          />
          <TextField
            label="Confirmation mot de passe"
            fullWidth
            sx={{
              marginVertical: 8,
            }}
          />

          <FlexBox
            direction="row"
            align="center"
            justify="between"
            sx={{
              marginVertical: 16,
            }}
          >
            <Button variant="outlined">Annuler</Button>
            <Button variant="contained">{"S'inscrire"}</Button>
          </FlexBox>
        </Paper>
      </Tabs>
    </PageView>
  );
}

export default Index;
