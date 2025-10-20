import { useColor } from "@/hooks/useColor";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import FlexBox, { FlexBoxProps } from "./flexBox";
import Typography, { TypographyProps } from "./typography";

interface Props extends FlexBoxProps {
  label: string;
  value: React.ReactNode;
  path: string;
  slotProps?: {
    label?: Omit<TypographyProps, "children">;
    value?: Omit<TypographyProps, "children">;
  };
}

function ClickableRow({ label, value, path, slotProps, sx, ...props }: Props) {
  const border = useColor("border");
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push(path as never)}>
      <FlexBox
        direction="row"
        justify="between"
        align="center"
        columnGap={2}
        {...props}
        sx={[
          {
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderColor: border,
            maxWidth: "100%",
          },
          sx,
        ]}
      >
        <Typography variant="body1" {...slotProps?.label}>
          {label}
        </Typography>
        <Typography variant="body1" {...slotProps?.value}>
          {value}
        </Typography>
      </FlexBox>
    </TouchableOpacity>
  );
}

export default ClickableRow;
