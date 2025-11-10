import { pageProps } from "@/constants/constants";
import { useColor } from "@/hooks/useColor";
import { useAppStore } from "@/store/useStore";
import { useNavigation } from "@react-navigation/native";
import { useRouter, useSegments } from "expo-router";
import { ChevronLeft, Search } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable } from "react-native";
import Avatar from "./avatar";
import Button from "./button";
import FlexBox from "./flexBox";
import IconButton from "./iconButton";
import SearchBar from "./searchBar";
import Typography from "./typography";

interface Props {
  title?: string;
  showUserAvatar?: boolean;
}
function TopBarWrapper({ title, showUserAvatar }: Props) {
  const [searchActive, setSearchActive] = useState(false);

  const { user } = useAppStore();

  const backgroundColor = useColor("background");
  const textColor = useColor("textLight");
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();
  const segments = useSegments();
  const currentRoute = segments[segments.length - 1];
  const router = useRouter();

  if (!currentRoute) {
    return searchActive ? (
      <FlexBox
        direction="row"
        justify="center"
        align="center"
        sx={{
          paddingVertical: 8,
          paddingHorizontal: 16,
          width: "100%",
          backgroundColor: backgroundColor,
        }}
      >
        <SearchBar setSearchActive={setSearchActive} />
      </FlexBox>
    ) : (
      <FlexBox
        direction="row"
        justify="between"
        align="center"
        sx={{
          paddingVertical: 8,
          width: "100%",
          backgroundColor: backgroundColor,
        }}
      >
        <FlexBox direction="row" align="center">
          {canGoBack && (
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
            {currentRoute
              ? pageProps[currentRoute as keyof typeof pageProps].title
              : "La Grill'Zone"}
          </Typography>

          <IconButton
            size={"small"}
            onPress={() => {
              setSearchActive(true);
            }}
            style={{
              marginLeft: 16,
            }}
          >
            <Search color={textColor} />
          </IconButton>
        </FlexBox>
        {user ? (
          <Pressable onPress={() => router.push("/profile" as never)}>
            <Avatar
              name={`${user.firstname} ${user.lastname}`}
              src={user.avatar_url}
              rounded
              style={{ marginRight: 16 }}
            />
          </Pressable>
        ) : (
          <Button
            onPress={() => router.push("/authentication?tab=0")}
            size="small"
          >
            Se connecter
          </Button>
        )}
      </FlexBox>
    );
  }

  if (currentRoute === "[id]" && title) {
    return (
      <FlexBox
        direction="row"
        justify="between"
        align="center"
        sx={{
          paddingVertical: 8,
          width: "100%",
          backgroundColor: backgroundColor,
        }}
      >
        <FlexBox direction="row" align="center">
          <IconButton size={"small"} onPress={() => router.back()}>
            <ChevronLeft color={textColor} />
          </IconButton>

          <Typography
            variant="h5"
            sx={{
              paddingLeft: 16,
            }}
          >
            {title}
          </Typography>
        </FlexBox>
        {user && showUserAvatar && (
          <Pressable onPress={() => router.push("/profile" as never)}>
            <Avatar
              name={`${user.firstname} ${user.lastname}`}
              src={user.avatar_url}
              rounded
              style={{ marginRight: 16 }}
            />
          </Pressable>
        )}
      </FlexBox>
    );
  }
  if (currentRoute === "[slug]" && title) {
    return (
      <FlexBox
        direction="row"
        justify="between"
        align="center"
        sx={{
          paddingVertical: 8,
          width: "100%",
          backgroundColor: backgroundColor,
        }}
      >
        <FlexBox direction="row" align="center">
          <IconButton size={"small"} onPress={() => router.back()}>
            <ChevronLeft color={textColor} />
          </IconButton>

          <Typography
            variant="h5"
            sx={{
              paddingLeft: 16,
            }}
          >
            {title}
          </Typography>
        </FlexBox>
      </FlexBox>
    );
  }
  if (currentRoute === "create") {
    return (
      <FlexBox
        direction="row"
        justify="between"
        align="center"
        sx={{
          paddingVertical: 8,
          width: "100%",
          backgroundColor: backgroundColor,
        }}
      >
        <FlexBox direction="row" align="center">
          <IconButton size={"small"} onPress={() => router.back()}>
            <ChevronLeft color={textColor} />
          </IconButton>

          <Typography
            variant="h5"
            sx={{
              paddingLeft: 16,
            }}
          >
            {currentRoute
              ? pageProps[currentRoute as keyof typeof pageProps].title
              : "La Grill'Zone"}
          </Typography>
        </FlexBox>
        {user && (
          <Pressable onPress={() => router.push("/profile" as never)}>
            <Avatar
              name={`${user.firstname} ${user.lastname}`}
              src={user.avatar_url}
              rounded
              style={{ marginRight: 16 }}
            />
          </Pressable>
        )}
      </FlexBox>
    );
  }
  if (
    currentRoute === "settings" ||
    currentRoute === "profile" ||
    currentRoute === "termsOfService" ||
    currentRoute === "privacyPolicy" ||
    currentRoute === "edit"
  ) {
    return (
      <FlexBox
        direction="row"
        justify="between"
        align="center"
        sx={{
          paddingVertical: 8,
          width: "100%",
          backgroundColor: backgroundColor,
        }}
      >
        <FlexBox direction="row" align="center">
          <IconButton size={"small"} onPress={() => router.back()}>
            <ChevronLeft color={textColor} />
          </IconButton>

          <Typography
            variant="h5"
            sx={{
              paddingLeft: 16,
            }}
          >
            {currentRoute
              ? pageProps[currentRoute as keyof typeof pageProps].title
              : "La Grill'Zone"}
          </Typography>
        </FlexBox>
      </FlexBox>
    );
  }
}

export default TopBarWrapper;
