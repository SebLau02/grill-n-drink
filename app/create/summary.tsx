import FlexBox from "@/components/ui/flexBox";
import LabeledTypo from "@/components/ui/labeledTypo";
import Paper from "@/components/ui/paper";
import Typography from "@/components/ui/typography";
import React from "react";
import { StepProps } from ".";

type Props = StepProps;

function Summary({ formData }: Props) {
  return (
    <Paper style={{ padding: 16 }}>
      <FlexBox rowGap={2} direction="column">
        <Typography variant="h5">Récapitulatif</Typography>
        <LabeledTypo label="Titre">{formData.title}</LabeledTypo>
        <LabeledTypo label="Description">{formData.description}</LabeledTypo>
        <LabeledTypo label="Date & heure">
          {formData?.date?.toLocaleDateString("fr-FR")} à{" "}
          {formData.time?.toLocaleTimeString("fr-FR")}
        </LabeledTypo>
        <LabeledTypo
          label="Lieux"
          textHelper="Seul la ville et le code postale est rendu publique, seulement la veille de l'évènement qu'elle sera envoyé à tes invités !"
        >
          {formData.address} {formData.zipcode} {formData.city}
        </LabeledTypo>
        <LabeledTypo label="Conditions de participations">
          <FlexBox direction="column">
            {formData.conditions.map((cond, i) => (
              <Typography variant="body2" key={i}>
                • {cond.condition}
              </Typography>
            ))}
          </FlexBox>
        </LabeledTypo>
        <LabeledTypo label="Rôles">
          <FlexBox direction="column">
            {formData.roles.map((role, i) => (
              <Typography variant="body2" key={i}>
                • {role.role}
              </Typography>
            ))}
          </FlexBox>
        </LabeledTypo>
      </FlexBox>
    </Paper>
  );
}

export default Summary;
