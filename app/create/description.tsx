import Divider from "@/components/ui/divider";
import Paper from "@/components/ui/paper";
import { TextField } from "@/components/ui/textField";
import Typography from "@/components/ui/typography";
import { Fonts } from "@/constants/theme";
import React from "react";
import { StepProps } from ".";

type Props = StepProps;
function Description({ formData, setFormData }: Props) {
  return (
    <Paper style={{ padding: 16 }}>
      <Typography
        variant="h5"
        sx={{
          marginBottom: 8,
        }}
      >
        Description
      </Typography>
      <Typography variant="body1">
        Raconte-nous ton barbecue !{"\n"}
        La description permet aux autres de savoir ce qui les attend : le lieu,
        l’ambiance, ce qu’ils pourront manger ou apporter…{"\n"}
        Sois clair, convivial et amusant si tu veux donner envie !{"\n"}
        Quelques idées pour t’inspirer :
      </Typography>
      {[
        "Viens profiter d’un barbecue au jardin, avec brochettes, burgers et bonne humeur au rendez-vous !",
        "Soirée grillades entre voisins, musique et rires garantis. Déguisement hautement recommandé !",
        "BBQ chill au parc, chacun apporte quelque chose à partager.",
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
        label="Description"
        rowsCount={4}
        value={formData.description}
        onChangeText={(text) => setFormData({ ...formData, description: text })}
        variant="text"
        fullWidth
      />
    </Paper>
  );
}

export default Description;
