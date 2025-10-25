import FlexBox from "@/components/ui/flexBox";
import Typography from "@/components/ui/typography";
import React from "react";

interface Props {}
function Description({}: Props) {
  return (
    <FlexBox>
      <Typography variant="body1">Description</Typography>
    </FlexBox>
  );
}

export default Description;
