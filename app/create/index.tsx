import Breadcrumb from "@/components/ui/breadcrumb";
import Button from "@/components/ui/button";
import FlexBox from "@/components/ui/flexBox";
import PageView from "@/components/ui/pageView";
import Typography from "@/components/ui/typography";
import { CreateEvent } from "@/config/types";
import { useState } from "react";
import Date from "./date";
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
  3: {
    title: "Date & heure",
    component: (props: StepProps) => <Date {...props} />,
  },
};
export default function Index() {
  const [step, setStep] = useState<keyof typeof STEPS>(1);
  const [formData, setFormData] = useState<CreateEvent>({
    name: "",
    date: undefined,
    city: "",
    title: "",
    time: undefined,
    location: "",
    conditions: [],
    roles: [],
    description: "",
  });

  const handlePressNext = () => {
    if (step < Object.keys(STEPS).length) {
      setStep((prev) => (prev + 1) as keyof typeof STEPS);
    }
  };

  const handlePressPrev = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as keyof typeof STEPS);
    }
  };

  const crumbs = Object.values(STEPS).map((s, i) => (
    <Typography
      key={i}
      variant="body2"
      sx={{
        textDecorationLine: step === i + 1 ? "none" : "underline",
      }}
    >
      {s.title}
    </Typography>
  ));

  return (
    <PageView
      style={{
        paddingHorizontal: 8,
      }}
    >
      <Breadcrumb
        link={() => setStep((prev) => (prev - 1) as keyof typeof STEPS)}
        crumbs={crumbs}
        showAll={true}
        sx={{
          paddingBottom: 32,
        }}
      />

      {STEPS[step].component({ formData, setFormData })}

      <FlexBox
        direction="row"
        justify="between"
        sx={{
          marginTop: 16,
        }}
      >
        <Button size="large" variant="outlined" onPress={handlePressPrev}>
          {step === 1 ? "Annuler" : "Précédent"}
        </Button>
        <Button size="large" onPress={handlePressNext}>
          Suivant
        </Button>
      </FlexBox>
    </PageView>
  );
}
