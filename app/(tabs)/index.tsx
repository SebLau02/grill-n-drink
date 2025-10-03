import Button from "@/components/ui/button";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View>
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
    </View>
  );
}
