import React from "react";
import FlexBox, { FlexBoxProps } from "./flexBox";
import Typography from "./typography";

interface Props extends FlexBoxProps {
  label: string;
  children: React.ReactNode;
  textHelper?: string;
}
function LabeledTypo({ label, children, textHelper, ...props }: Props) {
  return (
    <FlexBox direction="column" {...props}>
      <Typography variant="h6">{label}</Typography>
      <Typography variant="body2">{children}</Typography>
      {textHelper && (
        <Typography
          variant="caption"
          style={{
            marginLeft: 16,
          }}
        >
          {textHelper}
        </Typography>
      )}
    </FlexBox>
  );
}

export default LabeledTypo;
