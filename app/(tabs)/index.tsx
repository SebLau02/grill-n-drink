import Button from "@/components/ui/button";
import FlexBox from "@/components/ui/flexBox";
import PageView from "@/components/ui/pageView";
import { TextField } from "@/components/ui/textField";
import { useState } from "react";

export default function HomeScreen() {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleChange = (text: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: text }));
  };

  console.log(formData);
  return (
    <PageView
      style={{
        padding: 16,
      }}
    >
      <FlexBox
        direction="column"
        gap={2}
        sx={{
          width: "100%",
        }}
      >
        <TextField
          label="Nom"
          onChangeText={(text) => handleChange(text, "name")}
          value={formData.name}
        />
        <TextField
          label="Nom"
          onChangeText={(text) => handleChange(text, "firstname")}
          value={formData.firstname}
          size="medium"
        />
        <TextField
          label="Nom"
          value={formData.lastname}
          size="large"
          onChangeText={(text) => handleChange(text, "lastname")}
          sx={{
            width: 300,
          }}
        />
      </FlexBox>
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
