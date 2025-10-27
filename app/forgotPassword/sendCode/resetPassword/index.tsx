import Button from "@/components/ui/button";
import PageView from "@/components/ui/pageView";
import Paper from "@/components/ui/paper";
import { TextField } from "@/components/ui/textField";
import Typography from "@/components/ui/typography";
import { useResetPassword } from "@/hooks/useUser";
import { useRouter } from "expo-router";
import React, { useState } from "react";

function Index() {
  const [newPassword, setNewPassword] = useState({
    password: "",
    password_confirmation: "",
  });
  const router = useRouter();

  const { mutate } = useResetPassword({
    onSuccess: (data) => {
      console.log("Success:", data);
      router.push("/authentication?tab=0" as never);
    },
    onError: (error) => {
      console.log("Error:", error);
    },
  });

  const handleSubmit = () => {
    mutate({ body: { ...newPassword } });
  };
  return (
    <PageView>
      <Paper
        style={{
          padding: 16,
          width: "80%",
          margin: "auto",
        }}
      >
        <Typography variant="h6">
          Entre ton nouveau mot de passe ci-dessous.
        </Typography>
        <TextField
          label="Nouveau mot de passe"
          sx={{
            marginBottom: 16,
          }}
          fullWidth
          onChangeText={(text) =>
            setNewPassword({ ...newPassword, password: text })
          }
        />
        <TextField
          label="Confirmer le nouveau mot de passe"
          sx={{
            marginBottom: 16,
          }}
          fullWidth
          onChangeText={(text) =>
            setNewPassword({ ...newPassword, password_confirmation: text })
          }
        />
        <Button onPress={handleSubmit}>Réinitialiser le mot de passe</Button>
      </Paper>
    </PageView>
  );
}

export default Index;
