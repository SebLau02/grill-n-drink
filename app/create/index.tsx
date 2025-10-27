import Breadcrumb from "@/components/ui/breadcrumb";
import Button from "@/components/ui/button";
import FlexBox from "@/components/ui/flexBox";
import PageView from "@/components/ui/pageView";
import Typography from "@/components/ui/typography";
import { CreateEvent } from "@/config/types";
import { useCreateEvent } from "@/hooks/useEvents";
import { useAppStore } from "@/store/useStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import Conditions from "./conditions";
import Date from "./date";
import Description from "./description";
import Information from "./information";
import Location from "./location";
import Roles from "./roles";
import Summary from "./summary";

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
  4: {
    title: "Lieux",
    component: (props: StepProps) => <Location {...props} />,
  },
  5: {
    title: "Conditions",
    component: (props: StepProps) => <Conditions {...props} />,
  },
  6: {
    title: "Rôles",
    component: (props: StepProps) => <Roles {...props} />,
  },
  7: {
    title: "Récapitulatif",
    component: (props: StepProps) => <Summary {...props} />,
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
    zipcode: "",
    status: "published",
  });
  const { user } = useAppStore();
  const router = useRouter();

  const { mutate } = useCreateEvent({
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log("error");
    },
  });

  const handlePressNext = () => {
    if (step < Object.keys(STEPS).length) {
      setStep((prev) => (prev + 1) as keyof typeof STEPS);
    }
  };
  const handlePressDraft = () => {
    isUserAuthenticate();
    mutate({ body: { ...formData, status: "draft" } });
  };
  const handleCreate = () => {
    isUserAuthenticate();
    mutate({ body: { ...formData, status: "published" } });
  };

  const handlePressPrev = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as keyof typeof STEPS);
    }
  };

  const isUserAuthenticate = () => {
    if (!user) {
      router.push("/authentication?tab=0" as never);
      return;
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
        link={(step) => setStep((prev) => step as keyof typeof STEPS)}
        crumbs={crumbs}
        showAll={true}
        scrollable={true}
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

        {step === Object.values(STEPS).length ? (
          <FlexBox
            direction="row"
            sx={{
              columnGap: 16,
            }}
          >
            <Button size="large" onPress={handlePressDraft}>
              {"Brouillon"}
            </Button>
            <Button size="large" onPress={handleCreate}>
              {"Créer"}
            </Button>
          </FlexBox>
        ) : (
          <Button size="large" onPress={handlePressNext}>
            {"Suivant"}
          </Button>
        )}
      </FlexBox>
    </PageView>
  );
}
