import Button from "@/components/ui/button";
import FlexBox from "@/components/ui/flexBox";
import Paper from "@/components/ui/paper";
import { TextField } from "@/components/ui/textField";
import Typography from "@/components/ui/typography";
import { UserSignup } from "@/config/types";
import { useSignup } from "@/hooks/useUser";
import { useToast } from "@/store/toast";
import { useRouter } from "expo-router";
import React, { useState } from "react";

function Signup() {
  const [signup, setSignup] = useState<UserSignup>({
    email: "",
    password: "",
    password_confirmation: "",
    firstname: "",
    lastname: "",
    username: "",
  });
  const { addToast } = useToast();
  const router = useRouter();

  const { mutate: signupMutate } = useSignup({
    onSuccess: (data) => {
      addToast({
        type: "success",
        message: data?.message || "Inscription réussie !",
      });
      setSignup({
        email: "",
        password: "",
        password_confirmation: "",
        firstname: "",
        lastname: "",
        username: "",
      });
      router.replace("/authentication?tab=0");
    },
    onError: (error) => {
      addToast({
        type: "error",
        message: (error as string) || "Erreur lors de l'inscription",
      });
    },
  });

  const handleSignup = () => {
    signupMutate({ body: signup });
  };

  return (
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
        labelBg
        label="Nom"
        sx={{
          marginTop: 16,
        }}
        fullWidth
        value={signup.firstname}
        onChangeText={(text) =>
          setSignup((prev) => ({ ...prev, firstname: text }))
        }
      />

      <TextField
        labelBg
        label="Prénom"
        sx={{
          marginTop: 16,
        }}
        fullWidth
        value={signup.lastname}
        onChangeText={(text) =>
          setSignup((prev) => ({ ...prev, lastname: text }))
        }
      />
      <TextField
        labelBg
        label="Nom d'utilisateur"
        sx={{
          marginTop: 16,
        }}
        fullWidth
        value={signup.username}
        onChangeText={(text) =>
          setSignup((prev) => ({ ...prev, username: text }))
        }
      />

      <TextField
        labelBg
        label="Email"
        sx={{
          marginTop: 16,
        }}
        fullWidth
        value={signup.email}
        onChangeText={(text) => setSignup((prev) => ({ ...prev, email: text }))}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextField
        labelBg
        label="Mot de passe"
        fullWidth
        value={signup.password}
        secureTextEntry={true}
        onChangeText={(text) =>
          setSignup((prev) => ({ ...prev, password: text }))
        }
        sx={{
          marginVertical: 8,
        }}
      />
      <TextField
        labelBg
        label="Confirmation mot de passe"
        fullWidth
        value={signup.password_confirmation}
        secureTextEntry={true}
        onChangeText={(text) =>
          setSignup((prev) => ({ ...prev, password_confirmation: text }))
        }
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
        <Button variant="contained" onPress={handleSignup}>
          {"S'inscrire"}
        </Button>
      </FlexBox>
    </Paper>
  );
}

export default Signup;
