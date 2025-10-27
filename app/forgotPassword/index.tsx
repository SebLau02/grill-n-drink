import Button from "@/components/ui/button";
import PageView from "@/components/ui/pageView";
import Paper from "@/components/ui/paper";
import { TextField } from "@/components/ui/textField";
import Typography from "@/components/ui/typography";
import { useGetCode } from "@/hooks/useUser";
import { useRouter } from "expo-router";
import React, { useState } from "react";

function Index() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const { mutate } = useGetCode({
    onSuccess: (data) => {
      console.log("Success:", data);
      router.push("/forgotPassword/sendCode" as never);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const handleSubmit = () => {
    mutate({ body: { email } });
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
          Entre ton email, un code te sera envoyé pour réinitialiser ton mot de
          passe.
        </Typography>

        <TextField
          label="Email"
          sx={{
            marginTop: 24,
            marginBottom: 16,
          }}
          fullWidth
          onChangeText={(text) => setEmail(text)}
        />
        <Button onPress={handleSubmit}>Envoyer</Button>
      </Paper>
    </PageView>
  );
}

export default Index;
