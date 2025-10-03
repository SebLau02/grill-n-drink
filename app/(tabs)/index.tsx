import Button from "@/components/ui/button";
import PageView from "@/components/ui/pageView";
import { TextField } from "@/components/ui/textField";
import { useState } from "react";

export default function HomeScreen() {
  const [firstName, setFirstName] = useState("Lau");

  return (
    <PageView>
      <TextField label="Nom" value="Lau" />
      <TextField label="Prénom" value="Bastien" />
      <TextField
        label="Prénom"
        value={firstName}
        onChangeText={setFirstName}
        onBlur={() => console.log(firstName)}
      />

      <Button variant="contained" size="large">
        contained
      </Button>
      <Button variant="outlined" size="large">
        outlined
      </Button>
      <Button variant="text" size="large">
        text
      </Button>

      <Button variant="contained" size="large" disabled>
        contained
      </Button>
      <Button variant="outlined" size="large" disabled>
        outlined
      </Button>
      <Button variant="text" size="large" disabled>
        text
      </Button>

      <Button variant="contained">contained</Button>
      <Button variant="outlined">outlined</Button>
      <Button variant="text">text</Button>

      <Button variant="contained" size="small">
        contained
      </Button>
      <Button variant="outlined" size="small">
        outlined
      </Button>
      <Button variant="text" size="small">
        text
      </Button>
    </PageView>
  );
}
