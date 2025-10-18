import { useColor } from "@/hooks/useColor";
import { X } from "lucide-react-native";
import React from "react";
import { TextInput } from "react-native";
import FlexBox from "./flexBox";
import IconButton from "./iconButton";

interface Props {
  onSearchPress?: () => void;
  setSearchActive: React.Dispatch<React.SetStateAction<boolean>>;
  setSearch?: React.Dispatch<React.SetStateAction<string | undefined>>;
}
function SearchBar({ onSearchPress, setSearchActive, setSearch }: Props) {
  const textColor = useColor("textLight");
  const grey700 = useColor("grey700");
  const grey300 = useColor("grey300");

  const handleChangeSearch = (text: string) => {
    setSearch && setSearch(text);
  };

  return (
    <FlexBox
      direction="row"
      align="center"
      sx={{
        paddingLeft: 8,
        borderColor: grey700,
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 40,
        backgroundColor: grey300,
      }}
    >
      <TextInput
        placeholder="Ville, code postale"
        onChangeText={handleChangeSearch}
      />
      <IconButton
        size={"small"}
        onPress={() => {
          onSearchPress && onSearchPress();
          setSearchActive(false);
          setSearch && setSearch("");
        }}
      >
        <X color={textColor} />
      </IconButton>
    </FlexBox>
  );
}

export default SearchBar;
