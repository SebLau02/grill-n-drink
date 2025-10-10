import { useColor } from "@/hooks/useColor";
import { useNavigation } from "expo-router";
import { ChevronLeft, Search } from "lucide-react-native";
import React, { useState } from "react";
import Avatar from "./avatar";
import FlexBox from "./flexBox";
import IconButton from "./iconButton";
import SearchBar from "./searchBar";
import Typography from "./typography";

interface Props {
  navigateBack?: boolean;
  pageTitle?: string;
  showAvatar?: boolean;
  onSearchPress?: () => void;
}
function TopBarWrapper({
  navigateBack = false,
  pageTitle,
  showAvatar = false,
  onSearchPress,
}: Props) {
  const [searchActive, setSearchActive] = useState(false);

  const textColor = useColor("textLight");
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();

  return searchActive ? (
    <FlexBox
      direction="row"
      justify="justifyCenter"
      align="alignCenter"
      sx={{
        paddingVertical: 8,
        paddingHorizontal: 16,
        width: "100%",
      }}
    >
      <SearchBar
        onSearchPress={onSearchPress}
        setSearchActive={setSearchActive}
      />
    </FlexBox>
  ) : (
    <FlexBox
      direction="row"
      justify="between"
      align="alignCenter"
      sx={{
        paddingVertical: 8,
        width: "100%",
      }}
    >
      <FlexBox direction="row" align="alignCenter">
        {navigateBack && canGoBack && (
          <IconButton size={"small"} onPress={() => navigation.goBack()}>
            <ChevronLeft color={textColor} />
          </IconButton>
        )}
        <Typography
          variant="h5"
          sx={{
            paddingLeft: 16,
          }}
        >
          {pageTitle}
        </Typography>

        <IconButton
          size={"small"}
          onPress={() => {
            onSearchPress && onSearchPress();
            setSearchActive(true);
          }}
          style={{
            marginLeft: 16,
          }}
        >
          <Search color={textColor} />
        </IconButton>
      </FlexBox>
      {showAvatar && (
        <Avatar name={"John Doe"} rounded style={{ marginRight: 16 }} />
      )}
    </FlexBox>
  );
}

export default TopBarWrapper;
