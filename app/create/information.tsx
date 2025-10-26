import Divider from "@/components/ui/divider";
import Paper from "@/components/ui/paper";
import { TextField } from "@/components/ui/textField";
import Typography from "@/components/ui/typography";
import { Fonts } from "@/constants/theme";
import React from "react";
import { StepProps } from ".";

type Props = StepProps;
function Information({ formData, setFormData }: Props) {
  return (
    <Paper style={{ padding: 16 }}>
      <Typography
        variant="h5"
        sx={{
          marginBottom: 8,
        }}
      >
        Titre:
      </Typography>
      <Typography variant="body1">
        Raleway Commençons par donner un nom à ton barbecue !{"\n"}
        C’est la première chose que les autres verront, alors choisis un titre
        clair, simple et accrocheur.{"\n"}
        Fais preuve de créativité : jeux de mots, références ciné ou petites
        touches fun sont les bienvenus pour rendre ton BBQ inoubliable.{"\n"}
        Quelques idées pour t’inspirer :
      </Typography>
      {[
        "Grill & Chill au coucher du soleil ",
        "BBQ des voisins gourmands ",
        "Saucisses et bonne humeur chez moi ",
        "La revanche du barbecue perdu ",
        "Brochettes et vibes du samedi",
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
        label="Titre"
        value={formData.title}
        onChangeText={(text) => setFormData({ ...formData, title: text })}
        variant="text"
        fullWidth
      />
    </Paper>
  );
}

export default Information;
