import FlexBox from "@/components/ui/flexBox";
import PageView from "@/components/ui/pageView";
import Select from "@/components/ui/select";
import { TextField } from "@/components/ui/textField";
import { Event } from "@/config/types";
import { useUpdateEvent, useMyEvent } from "@/hooks/useEvents";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useRef, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "@/components/ui/button";
import Paper from "@/components/ui/paper";
import { router } from "expo-router";
import { useToast } from "@/store/toast";
import { useAppStore } from "@/store/useStore";
import Typography from "@/components/ui/typography";
import { Collapsible } from "@/components/ui/collapsible";

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
    address: "",
    formated_time: "",
    can_participate: false,
  });
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const [newItem, setNewItem] = useState<string>("");
  const dateRef = useRef<any>(null);
  const timeRef = useRef<any>(null);

  const { id } = useLocalSearchParams();

  const { setShouldRefreshPage, user } = useAppStore();

  const { data } = useMyEvent(String(user?.id), String(id));
  const { addToast } = useToast();

  const { mutate, isPending } = useUpdateEvent({
    onSuccess: (data) => {
      addToast({
        message: data.message || "Évènement mis à jour avec succès",
        submessage: "Redirection vers le profile",
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
              labelBg
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
            labelBg
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
            labelBg
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
            labelBg
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
            labelBg
            fullWidth
            label="Adresse"
            value={eventUpdating.address}
            onChangeText={(e) =>
              setEventUpdating((prev) => ({ ...prev, address: e }))
            }
          />
          <TextField
            labelBg
            fullWidth
            label="Ville"
            value={eventUpdating.city}
            onChangeText={(e) =>
              setEventUpdating((prev) => ({ ...prev, city: e }))
            }
          />
          <TextField
            labelBg
            fullWidth
            label="Code postale"
            value={eventUpdating.zipcode}
            onChangeText={(e) =>
              setEventUpdating((prev) => ({ ...prev, zipcode: e }))
            }
          />
          <Typography variant="h6">Rôles</Typography>

          {eventUpdating.roles?.map((role, i) => (
            <TextField
              key={i}
              labelBg
              fullWidth
              label={String(i + 1)}
              value={role.description}
              onChangeText={(e) =>
                setEventUpdating((prev) => ({
                  ...prev,
                  roles: prev.roles.map((r) =>
                    r.id === role.id ? { ...r, description: e } : r
                  ),
                }))
              }
            />
          ))}
          <Collapsible title="Ajouter un rôle">
            <TextField
              labelBg
              fullWidth
              label={"Nouveau rôle"}
              value={newItem}
              onChangeText={(e) => setNewItem(e)}
            />
            <Button
              size="small"
              style={{
                marginTop: 16,
                marginHorizontal: "auto",
              }}
              onPress={() => {
                setEventUpdating((prev) => ({
                  ...prev,
                  roles: [
                    ...prev.roles,
                    { id: Date.now(), role: "", description: newItem },
                  ],
                }));
                setNewItem("");
              }}
            >
              Ajouter
            </Button>
          </Collapsible>
          <Typography variant="h6">Liste de course</Typography>

          {eventUpdating.conditions?.map((condition, i) => (
            <TextField
              key={i}
              labelBg
              fullWidth
              label={String(i + 1)}
              value={condition.description}
              onChangeText={(e) =>
                setEventUpdating((prev) => ({
                  ...prev,
                  conditions: prev.conditions.map((r) =>
                    r.id === condition.id ? { ...r, description: e } : r
                  ),
                }))
              }
            />
          ))}
          <Collapsible title="Ajouter à la liste de course">
            <TextField
              labelBg
              fullWidth
              label={"Nouveau élément"}
              value={newItem}
              onChangeText={(e) => setNewItem(e)}
            />
            <Button
              size="small"
              style={{
                marginTop: 16,
                marginHorizontal: "auto",
              }}
              onPress={() => {
                setEventUpdating((prev) => ({
                  ...prev,
                  conditions: [
                    ...prev.conditions,
                    { id: Date.now(), condition: "", description: newItem },
                  ],
                }));

                setNewItem("");
              }}
            >
              Ajouter
            </Button>
          </Collapsible>
        </FlexBox>
        <FlexBox
          direction="row"
          justify="between"
          sx={{
            marginTop: 24,
          }}
        >
          <Button
            variant="outlined"
            disabled={isPending}
            onPress={() => router.back()}
          >
            Annuler
          </Button>
          <Button
            variant="contained"
            disabled={isPending}
            onPress={handleSubmit}
          >
            Enregistrer
          </Button>
        </FlexBox>
      </Paper>
    </PageView>
  );
}

export default Index;
