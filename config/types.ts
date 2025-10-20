import { StyleProp } from "react-native";

export interface CustomTheme {
  [key: string]: string;
}

export interface ComponentProps<T> {
  sx?: StyleProp<T>;
}

export interface SizeProps {
  size?: "small" | "medium" | "large";
}

export type RootStackParamList = {
  home: undefined;
  profile: undefined;
  eventDetail: undefined;
  settings: { userId: string };
};

export interface Event {
  id: number;
  name: string;
  cover: string;
  user: {
    avatar: string;
    firstname: string;
    lastname: string;
    id: number;
  };
  date: string;
  city: string;
  title: string;
  participation: {
    avatar: string;
  }[];
}

export interface ApiResponse<T> {
  record: T;
}

export interface User {
  avatar: string;
  firstname: string;
  lastname: string;
  id: number;
  description: string;
  pseudo: string;
  phone: string;
  upcomingEvents: Partial<Event[]>;
  pastEvents: Partial<Event[]>;
}
