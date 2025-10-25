import Button from "@/components/ui/button";
import FlexBox from "@/components/ui/flexBox";
import PageView from "@/components/ui/pageView";
import { CreateEvent } from "@/config/types";
import { useState } from "react";
import Description from "./description";
import Information from "./information";

export interface StepProps {
  formData: CreateEvent;
  setFormData: React.Dispatch<React.SetStateAction<CreateEvent>>;
}
const STEPS = {
  1: {
    title: "Titre",
    component: (props: StepProps) => <Information {...props} />,
  },
  2: {
    title: "Description",
    component: (props: StepProps) => <Description {...props} />,
  },
};
export default function Index() {
  const [step, setStep] = useState<keyof typeof STEPS>(1);
  const [formData, setFormData] = useState<CreateEvent>({
    name: "",
    date: "",
    city: "",
    title: "",
    time: "",
    location: "",
    conditions: [],
    roles: [],
    description: "",
  });
  return (
    <PageView
      style={{
        paddingHorizontal: 8,
        paddingTop: 32,
      }}
    >
      {STEPS[step].component({ formData, setFormData })}

      <FlexBox
        direction="row"
        justify="between"
        sx={{
          marginTop: 16,
        }}
      >
        <Button size="large" variant="outlined">
          Annuler
        </Button>
        <Button size="large">Suivant</Button>
      </FlexBox>
    </PageView>
  );
}
