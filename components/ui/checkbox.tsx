import { useColor } from "@/hooks/useColor";
import { Check } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable } from "react-native";
import FlexBox, { FlexBoxProps } from "./flexBox";
import Typography from "./typography";

interface Props extends FlexBoxProps {
  label: string;
  onChange?: (checked: boolean) => void;
}

function Checkbox({ label, onChange, ...props }: Props) {
  const [checked, setChecked] = useState<boolean>(false);

  const border = useColor("border");
  const text = useColor("textLight");

  const onPress = () => {
    setChecked(!checked);
    onChange && onChange(!checked);
  };

  return (
    <Pressable onPress={onPress}>
      <FlexBox align="center" columnGap={1} {...props}>
        <FlexBox
          align="center"
          justify="center"
          sx={{
            width: 20,
            height: 20,
            borderWidth: 1,
            borderColor: border,
            borderRadius: 4,
          }}
        >
          {checked && <Check size={16} color={text} />}
        </FlexBox>
        <Typography variant="body2">{label}</Typography>
      </FlexBox>
    </Pressable>
  );
}

export default Checkbox;
