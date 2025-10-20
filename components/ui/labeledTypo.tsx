import React from "react";
import FlexBox, { FlexBoxProps } from "./flexBox";
import Typography from "./typography";

interface Props extends FlexBoxProps {
  label: string;
  children: React.ReactNode;
}
function LabeledTypo({ label, children, ...props }: Props) {
  return (
    <FlexBox direction="column" {...props}>
      <Typography variant="h6">{label}</Typography>
      <Typography variant="body2">{children}</Typography>
    </FlexBox>
  );
}

export default LabeledTypo;
