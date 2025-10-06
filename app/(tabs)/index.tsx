import FlexBox from "@/components/ui/flexBox";
import PageView from "@/components/ui/pageView";
import Paper from "@/components/ui/paper";
import Typography from "@/components/ui/typography";
import { useState } from "react";

export default function HomeScreen() {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleChange = (text: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: text }));
  };

  return (
    <PageView>
      <FlexBox
        direction="column"
        gap={2}
        sx={{
          width: "100%",
        }}
      >
        <Paper variant="elevation" elevation={2}>
          <Typography>coucou</Typography>
        </Paper>
        <Paper variant="outlined">
          <Typography>coucou</Typography>
        </Paper>
      </FlexBox>
    </PageView>
  );
}
