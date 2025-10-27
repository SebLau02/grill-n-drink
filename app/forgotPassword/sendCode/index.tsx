import Button from "@/components/ui/button";
import PageView from "@/components/ui/pageView";
import Paper from "@/components/ui/paper";
import { TextField } from "@/components/ui/textField";
import Typography from "@/components/ui/typography";
import { useCheckCode } from "@/hooks/useUser";
import { useRouter } from "expo-router";
import React, { useState } from "react";

function Index() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const { mutate } = useCheckCode({
    onSuccess: (data) => {
      console.log("Success:", data);
      router.push("/forgotPassword/sendCode/resetPassword" as never);
    },
    onError: (error) => {
      console.log("Error:", error);
    },
  });

  const handleSubmit = () => {
    mutate({ body: { code } });
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
          Entre le code qui vient de {"t'être"} envoyé dans ta boite mail.
        </Typography>

        <TextField
          label="Code"
          sx={{
            marginTop: 24,
            marginBottom: 16,
          }}
          fullWidth
          onChangeText={(text) => setCode(text)}
        />
        <Button onPress={handleSubmit}>Envoyer</Button>
      </Paper>
    </PageView>
  );
}

export default Index;
