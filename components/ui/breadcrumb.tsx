import { useColor } from "@/hooks/useColor";
import { ChevronRight } from "lucide-react-native";
import React, { cloneElement, isValidElement } from "react";
import { TouchableOpacity } from "react-native";
import FlexBox, { FlexBoxProps } from "./flexBox";
import Typography from "./typography";

interface Props extends FlexBoxProps {
  crumbs: React.ReactNode[];
  separator?: React.ReactElement | string;
  link?: () => void;
  showAll?: boolean;
}
function Breadcrumb({
  crumbs,
  separator = <ChevronRight />,
  link,
  showAll,
  ...props
}: Props) {
  const textColor = useColor("textLight");
  const Separator =
    typeof separator === "string"
      ? separator
      : isValidElement(separator)
      ? cloneElement(separator as React.ReactElement<any>, {
          size: 14,
          color: textColor,
        })
      : separator;

  return (
    <FlexBox align="center" columnGap={1} direction="row" {...props}>
      {crumbs.map((crumb, index) => (
        <FlexBox align="center" columnGap={1} direction="row" key={index}>
          {index < crumbs.length - 1 ? (
            <TouchableOpacity
              onPress={() => {
                link && link();
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  textDecorationLine:
                    index < crumbs.length - 1 ? "underline" : "none",
                }}
              >
                {crumb}
              </Typography>
            </TouchableOpacity>
          ) : (
            <Typography
              variant="body1"
              sx={{
                textDecorationLine:
                  index < crumbs.length - 1 ? "underline" : "none",
              }}
            >
              {crumb}
            </Typography>
          )}

          <Typography variant="body1">
            {index < crumbs.length - 1 && Separator}
          </Typography>
        </FlexBox>
      ))}
    </FlexBox>
  );
}

export default Breadcrumb;
