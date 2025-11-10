import Button from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import Paper from "@/components/ui/paper";
import { TextField } from "@/components/ui/textField";
import Typography from "@/components/ui/typography";
import { Fonts } from "@/constants/theme";
import React, { useState } from "react";
import { StepProps } from ".";
import { Condition } from "@/config/types";
import { Square } from "lucide-react-native";
import FlexBox from "@/components/ui/flexBox";
import { useColor } from "@/hooks/useColor";

type Props = StepProps;
function Conditions({ formData, setFormData }: Props) {
  const [condition, setCondition] = useState<Condition>({
    condition: "",
    id: 0,
    description: "",
  });

  const textLight = useColor("textLight");
  return (
    <Paper style={{ padding: 16 }}>
      <Typography
        variant="h5"
        sx={{
          marginBottom: 8,
        }}
      >
        Liste de course:
      </Typography>
      <Typography variant="body1">
        Ici, tu définis ce que chacun doit apporter pour participer au barbecue.
        {"\n"}
        C’est un peu la “cotisation” version conviviale : chacun met la main à
        la pâte pour que la fête soit réussie !{"\n"}
        Chaque invité devra ramener un élément de la liste pour valider sa
        participation.
        {"\n"}
        Quelques exemples de courses à prévoir :
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
        <FlexBox key={i} direction="row" align="center" columnGap={1}>
          <Square size={18} color={textLight} />

          <Typography variant="body1">{cond.condition}</Typography>
        </FlexBox>
      ))}
      <TextField
        label="Course à ajouter"
        value={condition.condition}
        onChangeText={(text) =>
          setCondition((prev) => ({ ...prev, condition: text }))
        }
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
            conditions: [...prev.conditions, condition],
          }));

          setCondition((prev) => ({ ...prev, condition: "" }));
        }}
      >
        Ajouter
      </Button>
    </Paper>
  );
}

export default Conditions;
