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

export interface Event extends CreatedEvent {
  user?: User;
  participation?: User[];
}

export interface Condition {
  condition: string;
  description: string;
  id: number;
}
export interface Role {
  role: string;
  description: string;
  id: number;
}

export interface ApiResponse<T> {
  record: T;
  message?: string;
}
export interface ApiEventRes<T> {
  event: T;
  message?: string;
}
export interface LoginRes {
  token: string;
  message: string;
  user: User;
}

export type UserSignup = Omit<UserBase, "phone_number" | "description"> & {
  password: string;
  password_confirmation: string;
};
export type UserLogin = {
  email: string;
  password: string;
};

export interface UserBase {
  firstname: string;
  lastname: string;
  phone_number: string;
  username: string;
  description: string;
  email: string;
}
export interface User extends UserBase {
  avatar: string;
  id: number;
  pseudo: string;
  username: string;
  phone: string;
  phone_number: string;
  avatar_url: string;
}

export interface UserProfile extends User {
  upcoming_events: CreatedEvent[];
  past_events: CreatedEvent[];
  draft_events: CreatedEvent[];
}

export interface Authentication {
  token: string;
}

export type AuthenticatedUser = User & Authentication;

export interface CreateEvent extends EventBase {
  cover?: File;
}

export interface EventBase {
  name: string;
  date: Date | undefined;
  city: string;
  title: string;
  time: Date | undefined;
  location: string;
  conditions: Condition[];
  roles: Role[];
  description: string;
  zipcode: string;
  location_details?: string;
  status: "draft" | "published" | "archived" | 0 | 1 | 2;
  status_value: 0 | 1 | 2;
  address: string;
  formated_date: string;
  formated_time: string;
}

export interface CreatedEvent extends EventBase {
  id: number;
  cover: string;
  can_participate: boolean;
}

export type Participate = {
  role: number;
  condition: number;
};
