import Divider from "@/components/ui/divider";
import Paper from "@/components/ui/paper";
import { TextField } from "@/components/ui/textField";
import Typography from "@/components/ui/typography";
import { Fonts } from "@/constants/theme";
import React from "react";
import { StepProps } from ".";

type Props = StepProps;
function Location({ formData, setFormData }: Props) {
  return (
    <Paper style={{ padding: 16 }}>
      <Typography
        variant="h5"
        sx={{
          marginBottom: 8,
        }}
      >
        Adresse:
      </Typography>
      <Typography variant="body1">
        C’est le moment de dire où ton barbecue aura lieu 📍🔥{"\n"}
        Sois précis pour que tes invités ne se perdent pas : adresse, parc,
        jardin, bord de lac…{"\n"}
        Tu peux aussi ajouter quelques détails pour donner envie : parking, vue
        sympa, coin ombragé, ou même un petit mot sur l’ambiance du lieu !{"\n"}
        Quelques idées pour t’inspirer :
      </Typography>
      {[
        "« Jardin derrière la maison, ramenez vos chaises pliantes 🌳 »",
        "« Parc du lac, près de la fontaine, idéal pour se détendre au soleil 🌅 »",
        "« Terrasse sur le toit, avec vue sur la ville 🌇 »",
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
      <TextField
        label="Adresse*"
        value={formData.location}
        variant="text"
        fullWidth
      />
      <TextField
        label="Ville*"
        value={formData.city}
        variant="text"
        fullWidth
      />
      <TextField
        label="Code postale*"
        value={formData.zipcode}
        variant="text"
        fullWidth
      />
      <TextField
        label="Indications supplémentaires (optionnel)"
        value={formData.location_details}
        variant="text"
        rowsCount={4}
        fullWidth
      />
    </Paper>
  );
}

export default Location;
