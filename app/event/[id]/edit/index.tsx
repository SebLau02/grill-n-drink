import FlexBox from "@/components/ui/flexBox";
import PageView from "@/components/ui/pageView";
import Select from "@/components/ui/select";
import { TextField } from "@/components/ui/textField";
import { Event } from "@/config/types";
import { useUpdateEvent, useEvent } from "@/hooks/useEvents";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useRef, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "@/components/ui/button";
import Paper from "@/components/ui/paper";
import { router } from "expo-router";
import { useToast } from "@/store/toast";
import { useAppStore } from "@/store/useStore";

function Index() {
  const [eventUpdating, setEventUpdating] = useState<Event>({
    id: 0,
    cover: "",
    name: "",
    date: new Date(),
    city: "",
    title: "",
    time: new Date(),
    location: "",
    conditions: [],
    roles: [],
    description: "",
    zipcode: "",
    location_details: "",
    status: "draft",
    status_value: 0,
    formated_date: "",
  });
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const dateRef = useRef<any>(null);
  const timeRef = useRef<any>(null);

  const { id } = useLocalSearchParams();

  const { data } = useEvent(String(id));
  const { addToast } = useToast();
  const { setShouldRefreshPage } = useAppStore();

  const { mutate } = useUpdateEvent({
    onSuccess: (data) => {
      addToast({
        message: data.message || "Évènement mis à jour avec succès",
        submessage: "Vous allez être redirigé vers votre profil",
        type: "success",
      });
      setShouldRefreshPage(true);
      setTimeout(() => {
        router.back();
      }, 1000); // 1 seconde d’attente
    },
    onError: (error) => {
      addToast({
        message: error as string,
        type: "error",
      });
    },
  });

  const handleSubmit = () => {
    mutate({
      body: { event: { ...eventUpdating, status: eventUpdating.status_value } },
      id: eventUpdating.id,
    });
  };

  useEffect(() => {
    if (data) setEventUpdating(data);
  }, [data]);

  if (!eventUpdating) return null;

  return (
    <PageView
      style={{
        paddingHorizontal: 16,
      }}
    >
      <Paper
        style={{
          padding: 16,
        }}
      >
        <FlexBox rowGap={2} direction="column" align="stretch">
          <FlexBox
            rowGap={2}
            direction="row"
            justify="between"
            align="center"
            columnGap={1}
            sx={{ width: "100%" }}
          >
            <TextField
              fullWidth
              label="Titre"
              value={eventUpdating.title}
              onChangeText={(e) =>
                setEventUpdating((prev) => ({ ...prev, title: e }))
              }
            />

            <Select
              size="small"
              sx={{
                width: 100,
              }}
              label="Statut"
              options={[
                { label: "Brouillon", value: 0 },
                { label: "En ligne", value: 1 },
              ]}
              onChange={(value) =>
                setEventUpdating((prev) => ({
                  ...prev,
                  status_value: Number(value) as 0 | 1 | 2,
                }))
              }
              value={eventUpdating.status_value}
            />
          </FlexBox>

          <TextField
            fullWidth
            label="Description"
            rowsCount={4}
            multiline
            value={eventUpdating.description}
            onChangeText={(e) =>
              setEventUpdating((prev) => ({ ...prev, description: e }))
            }
          />
          <TextField
            onFocus={() => {
              setOpenDatePicker(true);
            }}
            ref={dateRef}
            label="Date"
            value={
              eventUpdating.date instanceof Date
                ? eventUpdating.date.toLocaleDateString("fr-FR")
                : typeof eventUpdating.date === "string"
                ? new Date(eventUpdating?.date).toLocaleDateString("fr-FR")
                : ""
            }
            variant="text"
            fullWidth
          />
          <TextField
            fullWidth
            onFocus={() => {
              setOpenTimePicker(true);
            }}
            ref={timeRef}
            label="Heure"
            value={
              eventUpdating.time instanceof Date
                ? eventUpdating.time.toLocaleDateString("fr-FR")
                : typeof eventUpdating.time === "string"
                ? new Date(eventUpdating?.time).toLocaleDateString("fr-FR")
                : ""
            }
            variant="text"
          />
          {openDatePicker && (
            <DateTimePicker
              value={new globalThis.Date()}
              onChange={(_, date) => {
                setEventUpdating({ ...eventUpdating, date: date });
                setOpenDatePicker(false);
                dateRef.current?.blur();
              }}
              mode="date"
              display="spinner"
            />
          )}
          {openTimePicker && (
            <DateTimePicker
              value={new globalThis.Date()}
              onChange={(_, time) => {
                setEventUpdating({ ...eventUpdating, time: time });
                setOpenTimePicker(false);
                timeRef.current?.blur();
              }}
              mode="time"
              display="spinner"
            />
          )}
          <TextField
            fullWidth
            label="Adresse"
            value={eventUpdating.address}
            onChangeText={(e) =>
              setEventUpdating((prev) => ({ ...prev, address: e }))
            }
          />
          <TextField
            fullWidth
            label="Ville"
            value={eventUpdating.city}
            onChangeText={(e) =>
              setEventUpdating((prev) => ({ ...prev, city: e }))
            }
          />
          <TextField
            fullWidth
            label="Code postale"
            value={eventUpdating.zipcode}
            onChangeText={(e) =>
              setEventUpdating((prev) => ({ ...prev, zipcode: e }))
            }
          />
        </FlexBox>
        <FlexBox
          direction="row"
          justify="between"
          sx={{
            marginTop: 24,
          }}
        >
          <Button variant="outlined" onPress={() => router.back()}>
            Annuler
          </Button>
          <Button variant="contained" onPress={handleSubmit}>
            Enregistrer
          </Button>
        </FlexBox>
      </Paper>
    </PageView>
  );
}

export default Index;
