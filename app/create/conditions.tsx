import Button from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import Paper from "@/components/ui/paper";
import { TextField } from "@/components/ui/textField";
import Typography from "@/components/ui/typography";
import { Fonts } from "@/constants/theme";
import React, { useState } from "react";
import { StepProps } from ".";

type Props = StepProps;
function Conditions({ formData, setFormData }: Props) {
  const [condition, setCondition] = useState({
    condition: "",
  });
  return (
    <Paper style={{ padding: 16 }}>
      <Typography
        variant="h5"
        sx={{
          marginBottom: 8,
        }}
      >
        Conditions de participation:
      </Typography>
      <Typography variant="body1">
        Ici, tu définis ce que chacun doit apporter pour participer au barbecue.
        {"\n"}
        C’est un peu la “cotisation” version conviviale : chacun met la main à
        la pâte pour que la fête soit réussie !{"\n"}
        Chaque invité devra choisir une condition pour valider sa participation.
        {"\n"}
        Quelques exemples de conditions :
      </Typography>
      {[
        "Ramener du charbon",
        "Apporter de la viande",
        "Amener des boissons",
        "Préparer une salade ou un dessert",
        "Apporter quelque chose de surprenant 🍍🍫",
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

      {formData.conditions.map((cond, i) => (
        <Typography key={i} variant="body1">
          • {cond.condition}
        </Typography>
      ))}
      <TextField
        label="Condition"
        value={condition.condition}
        onChangeText={(text) => setCondition({ condition: text })}
        variant="text"
        fullWidth
      />
      <Button
        variant="contained"
        style={{
          marginTop: 16,
          marginHorizontal: "auto",
        }}
        onPress={() =>
          setFormData((prev) => ({
            ...prev,
            conditions: [...prev.conditions, condition],
          }))
        }
      >
        Ajouter
      </Button>
    </Paper>
  );
}

export default Conditions;
