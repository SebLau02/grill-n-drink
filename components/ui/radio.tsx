import { useColor } from "@/hooks/useColor";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import FlexBox, { FlexBoxProps } from "./flexBox";
import Typography from "./typography";

type Option = {
  label: string;
  value: number;
};
interface Props extends FlexBoxProps {
  options: Option[];
  onChange?: (value: number) => void;
  value?: Option["value"];
}

function Radio({ options, onChange, value, ...props }: Props) {
  const [checked, setChecked] = useState<number | null>(value || null);

  const border = useColor("border");
  const interactiveLight = useColor("interactiveLight");

  const onPress = (o: Option) => {
    setChecked(o.value);
    onChange && o?.value !== checked && onChange(o.value);
  };
  return (
    <>
      {options.map((o, i) => (
        <Pressable key={i} onPress={() => onPress(o)}>
          <FlexBox align="center" columnGap={1} {...props}>
            <FlexBox
              align="center"
              justify="center"
              sx={{
                width: 20,
                height: 20,
                borderWidth: 1,
                borderColor: border,
                borderRadius: 10,
              }}
            >
              {checked === o.value && (
                <View
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: interactiveLight,
                  }}
                />
              )}
            </FlexBox>

            <Typography variant="body2">{o.label}</Typography>
          </FlexBox>
        </Pressable>
      ))}
    </>
  );
}

export default Radio;
