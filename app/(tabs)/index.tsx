import FlexBox from "@/components/ui/flexBox";
import PageView from "@/components/ui/pageView";
import { TextField } from "@/components/ui/textField";
import { useState } from "react";

export default function HomeScreen() {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleChange = (text: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: text }));
  };

  return (
    <PageView>
      <FlexBox
        direction="row"
        // gap={2}
        sx={{
          width: "100%",
        }}
      >
        <TextField
          label="Nom"
          onChangeText={(text) => handleChange(text, "name")}
          value={formData.name}
          sx={{
            width: 120,
          }}
        />
        <TextField
          label="Nom"
          onChangeText={(text) => handleChange(text, "firstname")}
          value={formData.firstname}
          sx={{
            width: 120,
          }}
          size="medium"
        />
        <TextField
          label="Nom"
          value={formData.lastname}
          sx={{
            width: 120,
          }}
          size="large"
          onChangeText={(text) => handleChange(text, "lastname")}
        />
      </FlexBox>
      <FlexBox
        direction="row"
        sx={{
          width: "100%",
        }}
      >
        <TextField
          label="Nom"
          onChangeText={(text) => handleChange(text, "name")}
          variant="filled"
          value={formData.name}
          sx={{
            width: 120,
          }}
        />
        <TextField
          label="Nom"
          onChangeText={(text) => handleChange(text, "firstname")}
          variant="filled"
          value={formData.firstname}
          sx={{
            width: 120,
          }}
          size="medium"
        />
        <TextField
          label="Nom"
          value={formData.lastname}
          variant="filled"
          sx={{
            width: 120,
          }}
          size="large"
          onChangeText={(text) => handleChange(text, "lastname")}
        />
      </FlexBox>
      <FlexBox
        direction="row"
        sx={{
          width: "100%",
        }}
      >
        <TextField
          label="Nom"
          onChangeText={(text) => handleChange(text, "name")}
          variant="text"
          value={formData.name}
          sx={{
            width: 120,
          }}
        />
        <TextField
          label="Nom"
          onChangeText={(text) => handleChange(text, "firstname")}
          variant="text"
          value={formData.firstname}
          sx={{
            width: 120,
          }}
          size="medium"
        />
        <TextField
          label="Nom"
          value={formData.lastname}
          variant="text"
          sx={{
            width: 120,
          }}
          size="large"
          onChangeText={(text) => handleChange(text, "lastname")}
        />
      </FlexBox>
    </PageView>
  );
}
