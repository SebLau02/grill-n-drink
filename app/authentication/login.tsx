import Button from "@/components/ui/button";
import FlexBox from "@/components/ui/flexBox";
import Paper from "@/components/ui/paper";
import { TextField } from "@/components/ui/textField";
import Typography from "@/components/ui/typography";
import { saveToken } from "@/config/authStorage";
import { UserLogin } from "@/config/types";
import { useLogin } from "@/hooks/useUser";
import { useToast } from "@/store/toast";
import { useAppStore } from "@/store/useStore";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

function Login() {
  const [login, setLogin] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const router = useRouter();
  const { addToast } = useToast();
  const { setUser } = useAppStore();

  const { mutate } = useLogin({
    onSuccess: (data) => {
      addToast({
        message: data.message,
        type: "success",
      });

      setUser(data.user);
      saveToken(data.token);
      router.push("/" as never);
    },
    onError: (error) => {
      addToast({
        message: error as string,
        type: "error",
      });
    },
  });

  const handleLogin = () => {
    mutate({ body: login });
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
        Connecte toi pour accéder à tes barbecue
      </Typography>

      <TextField
        label="Email"
        sx={{
          marginTop: 16,
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        fullWidth
        value={login.email}
        onChangeText={(text) => setLogin((prev) => ({ ...prev, email: text }))}
      />
      <TextField
        label="Mot de passe"
        fullWidth
        onChangeText={(text) =>
          setLogin((prev) => ({ ...prev, password: text }))
        }
        value={login.password}
        secureTextEntry={true}
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
        <Button variant="contained" onPress={handleLogin}>
          Se connecter
        </Button>
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
  );
}

export default Login;
