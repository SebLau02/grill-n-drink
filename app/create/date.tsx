import Divider from "@/components/ui/divider";
import Paper from "@/components/ui/paper";
import { TextField } from "@/components/ui/textField";
import Typography from "@/components/ui/typography";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { StepProps } from ".";

type Props = StepProps;
function Date({ formData, setFormData }: Props) {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const dateRef = React.useRef<any>(null);
  const timeRef = React.useRef<any>(null);
  return (
    <Paper style={{ padding: 16 }}>
      <Typography
        variant="h5"
        sx={{
          marginBottom: 8,
        }}
      >
        Date & heure
      </Typography>
      <Typography variant="body1">
        Fixe la date et l’heure de ton barbecue !{"\n"}
        Choisis un moment qui convient à la majorité des invités potentiels.
        {"\n"}
        Pense à la météo et à la saison pour maximiser le plaisir !{"\n"}
      </Typography>
      <Divider style={{ marginVertical: 16 }} />
      <TextField
        onFocus={() => {
          setOpenDatePicker(true);
        }}
        ref={dateRef}
        label="Date"
        value={formData.date ? formData.date.toLocaleDateString("fr-FR") : ""}
        variant="text"
        fullWidth
      />
      <TextField
        onFocus={() => {
          setOpenTimePicker(true);
        }}
        ref={timeRef}
        label="Heure"
        value={formData.time ? formData.time.toLocaleTimeString("fr-FR") : ""}
        variant="text"
        fullWidth
      />
      {openDatePicker && (
        <DateTimePicker
          value={new globalThis.Date()}
          onChange={(_, date) => {
            setFormData({ ...formData, date: date });
            setOpenDatePicker(false);
            dateRef.current?.blur();
          }}
          mode="date"
        />
      )}
      {openTimePicker && (
        <DateTimePicker
          value={new globalThis.Date()}
          onChange={(_, time) => {
            setFormData({ ...formData, time: time });
            setOpenTimePicker(false);
            dateRef.current?.blur();
          }}
          mode="time"
        />
      )}
    </Paper>
  );
}

export default Date;
