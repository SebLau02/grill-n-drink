import Avatar from "@/components/ui/avatar";
import Button from "@/components/ui/button";
import Carousel from "@/components/ui/carrousel";
import Checkbox from "@/components/ui/checkbox";
import FlexBox from "@/components/ui/flexBox";
import LabeledTypo from "@/components/ui/labeledTypo";
import PageView from "@/components/ui/pageView";
import Radio from "@/components/ui/radio";
import TopBarWrapper from "@/components/ui/topBarWrapper";
import Typography from "@/components/ui/typography";
import { useEvent } from "@/hooks/useEvents";
import { useToast } from "@/store/toast";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Dot } from "lucide-react-native";
import React, { useState } from "react";
import { View } from "react-native";

function Index() {
  const [participate, setParticipate] = useState<{
    role: number | null;
    conditionsAccepted: boolean;
  }>({
    role: null,
    conditionsAccepted: false,
  });
  const [step, setStep] = useState(1);
  const { id } = useLocalSearchParams();
  const { data } = useEvent(id as string);
  const { addToast } = useToast();
  const router = useRouter();

  const handlePress = () => {
    if (step === 2 && participate.role === null) {
      addToast({
        message: "Tu dois choisir un rôle pour participer.",
        type: "danger",
      });
      return;
    }
    if (step === 3 && !participate.conditionsAccepted) {
      addToast({
        message: "Tu dois accepter les conditions pour participer.",
        type: "danger",
      });
      return;
    }
    setStep((prev) => (prev ? prev + 1 : 1));
  };

  if (!data) {
    return null;
  }

  const event = data?.record;

  return (
    <PageView>
      <TopBarWrapper title={event.title} />
      {step === 1 && (
        <View
          style={{
            paddingHorizontal: 16,
          }}
        >
          <FlexBox direction="row" align="center" columnGap={1}>
            <Avatar
              src={event.user.avatar}
              name={`${event.user.firstname} ${event.user.lastname}`}
              rounded
            />
            <Typography variant="body1">{event.user.pseudo}</Typography>
          </FlexBox>
          <LabeledTypo
            sx={{
              marginTop: 16,
            }}
            label="Titre"
          >
            {event.title}
          </LabeledTypo>

          <Carousel
            slotProps={{
              paper: {
                style: {
                  padding: 16,
                  marginTop: 16,
                },
              },
            }}
            sections={[
              <LabeledTypo key={1} label="Description">
                {event.description}
              </LabeledTypo>,
              <LabeledTypo key={2} label="Date & heure">
                {event.date} à {event.time}
              </LabeledTypo>,
              <LabeledTypo key={3} label="Lieu">
                {event.location}
              </LabeledTypo>,
              <LabeledTypo key={4} label="Conditions">
                <FlexBox direction="column">
                  {event.conditions.map((cond, i) => (
                    <Typography variant="body1" key={i}>
                      {cond.condition}
                    </Typography>
                  ))}
                </FlexBox>
              </LabeledTypo>,
              <LabeledTypo key={5} label="Rôles">
                <FlexBox direction="column">
                  {event.roles.map((role, i) => (
                    <Typography variant="body2" key={i}>
                      {role.role}
                    </Typography>
                  ))}
                </FlexBox>
              </LabeledTypo>,
            ]}
          />
        </View>
      )}
      {step === 2 && (
        <View
          style={{
            paddingHorizontal: 16,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              marginBottom: 16,
            }}
          >
            On est là pour {"s'amuser"}, choisis ton rôle:
          </Typography>

          <FlexBox direction="column">
            <Radio
              onChange={(value) =>
                setParticipate((prev) => ({ ...prev, role: value }))
              }
              options={event.roles.map((r, i) => ({ label: r.role, value: i }))}
              sx={{ marginTop: 24 }}
            />
          </FlexBox>
        </View>
      )}
      {step === 3 && (
        <View
          style={{
            paddingHorizontal: 16,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              marginBottom: 16,
            }}
          >
            Tu dois accepter les conditions suivantes fixé par{" "}
            {"l'organisateur"} pour pouvoir participer:
          </Typography>

          <FlexBox direction="column">
            {event.conditions.map((cond, i) => (
              <Typography variant="body1" key={i}>
                <Dot />
                {cond.condition}
              </Typography>
            ))}
          </FlexBox>

          <Checkbox
            onChange={(checked) =>
              setParticipate((prev) => ({
                ...prev,
                conditionsAccepted: checked,
              }))
            }
            label="J'accepte les conditions"
            sx={{ marginTop: 24 }}
          />
        </View>
      )}

      {step < 4 && (
        <Button
          variant="contained"
          style={{
            margin: "auto",
            marginTop: 24,
          }}
          size="large"
          onPress={handlePress}
        >
          {step === 3 ? "Valider" : step === 2 ? "Suivant" : "Participer"}
        </Button>
      )}

      {step > 3 && (
        <View
          style={{
            paddingHorizontal: 16,
          }}
        >
          <Typography variant="h6">
            👉 Ta participation a bien été envoyée ! 🎉 Le créateur de
            l’événement sera prévenu et tu recevras un mail dès qu’il aura
            confirmé. Garde un œil sur ta boîte mail 📩
          </Typography>

          <Button
            variant="outlined"
            style={{
              margin: "auto",
              marginTop: 24,
            }}
            size="large"
            onPress={() => router.replace("/")}
          >
            Retourner à l&apos;accueil
          </Button>
        </View>
      )}
    </PageView>
  );
}

export default Index;
