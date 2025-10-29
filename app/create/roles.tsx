import Button from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import Paper from "@/components/ui/paper";
import { TextField } from "@/components/ui/textField";
import Typography from "@/components/ui/typography";
import { Fonts } from "@/constants/theme";
import React, { useState } from "react";
import { StepProps } from ".";

type Props = StepProps;
function Roles({ formData, setFormData }: Props) {
  const [role, setRole] = useState({
    role: "",
  });
  return (
    <Paper style={{ padding: 16 }}>
      <Typography
        variant="h5"
        sx={{
          marginBottom: 8,
        }}
      >
        Rôles:
      </Typography>
      <Typography variant="body1">
        Un barbecue, c’est comme une petite aventure : chacun peut prendre un
        rôle pour mettre l’ambiance.{"\n"}
        Ces rôles ne sont pas des obligations, mais plutôt une façon amusante de
        rendre l’événement plus convivial.{"\n"}
        Quelques exemples :
      </Typography>
      {[
        "🔥 Le Pyromane : maître du feu, il allume les braises",
        "🍖 Le Chef Grillardin : il surveille les merguez et les brochettes",
        "🎶 Le DJ du Jardin : il ramène la musique et l’ambiance",
        "🍺 Le Barman : il distribue les boissons fraîches",
        "📸 Le Reporter : il capture les meilleurs moments du barbecue",
      ].map((idea, index) => (
        <Typography
          key={index}
          variant="body2"
          sx={{
            fontFamily: Fonts.body_italic,
          }}
        >
          • {idea}
        </Typography>
      ))}

      <Divider style={{ marginVertical: 16 }} />

      {formData.roles.map((role, i) => (
        <Typography key={i} variant="body1">
          • {role.role}
        </Typography>
      ))}
      <TextField
        label="Rôle"
        value={role.role}
        onChangeText={(text) => setRole({ role: text })}
        variant="text"
        fullWidth
      />
      <Button
        variant="contained"
        style={{
          marginTop: 16,
          marginHorizontal: "auto",
        }}
        onPress={() => {
          setFormData((prev) => ({
            ...prev,
            roles: [...prev.roles, role],
          }));
          setRole({ role: "" });
        }}
      >
        Ajouter
      </Button>
    </Paper>
  );
}

export default Roles;
