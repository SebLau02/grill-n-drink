import Avatar from "@/components/ui/avatar";
import Button from "@/components/ui/button";
import Carrousel from "@/components/ui/carrousel";
import FlexBox from "@/components/ui/flexBox";
import LabeledTypo from "@/components/ui/labeledTypo";
import PageView from "@/components/ui/pageView";
import Radio from "@/components/ui/radio";
import TopBarWrapper from "@/components/ui/topBarWrapper";
import Typography from "@/components/ui/typography";
import { useColor } from "@/hooks/useColor";
import { useEvent, useParticipate } from "@/hooks/useEvents";
import { useToast } from "@/store/toast";
import { router, useLocalSearchParams } from "expo-router";
import { BellRing, Dot } from "lucide-react-native";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

type Participate = {
  role: number;
  condition: number;
};

function Index() {
  const [participate, setParticipate] = useState<Participate>({
    role: 0,
    condition: 0,
  });
  const [step, setStep] = useState(1);
  const { id } = useLocalSearchParams();
  const { data } = useEvent(id as string);
  const { mutate } = useParticipate({
    onSuccess: () => {
      setStep((prev) => (prev ? prev + 1 : 1));
    },
    onError: (error) => {
      addToast({
        message: `${error}`,
        type: "danger",
      });
    },
  });
  const { addToast } = useToast();

  const textColor = useColor("textLight");

  const handlePress = () => {
    switch (step) {
      case 1:
        setStep((prev) => (prev ? prev + 1 : 1));
        break;
      case 2:
        if (participate.role === 0) {
          addToast({
            message: "Tu dois choisir un rôle pour participer.",
            type: "danger",
          });
        } else {
          setStep((prev) => (prev ? prev + 1 : 1));
        }
        break;
      case 3:
        if (participate.condition === 0) {
          addToast({
            message: "Tu dois accepter les conditions pour participer.",
            type: "danger",
          });
        } else {
          mutate({
            body: { event: participate },
            id: Number(id as string),
          });
        }
        break;

      default:
        break;
    }
  };

  if (!data) {
    return null;
  }

  const event = data;

  return (
    <PageView>
      <TopBarWrapper title={event.title} />
      {step === 1 && (
        <View
          style={{
            paddingHorizontal: 16,
          }}
        >
          <FlexBox
            direction="row"
            align="center"
            justify="between"
            columnGap={1}
          >
            <LabeledTypo label="Rejoignez la ">{event.title}</LabeledTypo>
            <LabeledTypo
              sx={{
                marginTop: 16,
              }}
              label="Votre hôte"
            >
              <FlexBox
                direction="row"
                align="center"
                columnGap={1}
                sx={{
                  width: "auto",
                }}
              >
                {event.user && (
                  <TouchableOpacity
                    onPress={() =>
                      router.push(`/user/${event.user?.id}` as never)
                    }
                  >
                    <Avatar
                      src={event.user?.avatar}
                      name={`${event.user?.firstname} ${event.user?.lastname}`}
                      rounded
                    />
                    <Typography variant="body1">
                      {event.user?.username}
                    </Typography>
                  </TouchableOpacity>
                )}
              </FlexBox>
            </LabeledTypo>
          </FlexBox>

          <Carrousel
            height={150}
            style={{
              marginTop: 16,
            }}
            cardsProps={{
              style: {
                padding: 16,
              },
            }}
            cards={[
              <View
                key={1}
                style={{
                  flex: 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    marginBottom: 8,
                  }}
                >
                  Description
                </Typography>
                <Typography variant="body1">{event.description}</Typography>
              </View>,
              <View
                key={2}
                style={{
                  flex: 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    marginBottom: 8,
                  }}
                >
                  Date & heure
                </Typography>
                <Typography variant="body1">
                  {String(event.formated_date)} à {String(event.formated_time)}
                </Typography>
              </View>,
              <View
                key={3}
                style={{
                  flex: 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    marginBottom: 8,
                  }}
                >
                  Lieux
                </Typography>
                <Typography variant="body1">
                  {event.city}, {event.zipcode}
                </Typography>
              </View>,
              <View
                key={4}
                style={{
                  flex: 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    marginBottom: 8,
                  }}
                >
                  Conditions de participation
                </Typography>
                {event.conditions?.map((cond, i) => (
                  <Typography key={i} variant="body1">
                    <Dot />
                    {cond.description}
                  </Typography>
                ))}
              </View>,
              <View
                key={4}
                style={{
                  flex: 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    marginBottom: 8,
                  }}
                >
                  Rôles disponibles
                </Typography>
                {event.roles?.map((role, i) => (
                  <Typography key={i} variant="body1">
                    <Dot />
                    {role.description}
                  </Typography>
                ))}
              </View>,
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
              options={event.roles.map((r, i) => ({
                label: r.description,
                value: r.id,
              }))}
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
            Un bon barbecue {"c'est"} quand tout le monde y met du sien ! {"\n"}{" "}
            Voici la liste de course 🛒 défini par {event.user?.username}.
          </Typography>

          <FlexBox direction="column">
            <Radio
              onChange={(value) =>
                setParticipate((prev) => ({ ...prev, condition: value }))
              }
              options={event.conditions.map((c, i) => ({
                label: c.description,
                value: c.id,
              }))}
              sx={{ marginTop: 24 }}
            />
          </FlexBox>
        </View>
      )}
      {!event.can_participate ? (
        <Typography
          variant="body1"
          sx={{
            marginHorizontal: "auto",
            textAlign: "center",
            marginTop: 24,
          }}
        >
          Tu participes à cet évènement !
        </Typography>
      ) : (
        step < 4 && (
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
        )
      )}
      {step > 3 && (
        <View
          style={{
            paddingHorizontal: 16,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              marginBottom: 8,
            }}
          >
            👉 Ta participation a bien été envoyée ! 🎉
          </Typography>
          <Typography variant="body1">
            Une notification <BellRing color={textColor} size={14} /> te sera
            envoyée dès que {event.user?.username} aura confirmé ta place.
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
