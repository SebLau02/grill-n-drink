import { ComponentProps } from "@/config/types";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

type Direction = "row" | "column";
type Justify = "start" | "center" | "end" | "between";
type Align = "start" | "center" | "end";
type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface FlexBoxProps extends ComponentProps<ViewStyle> {
  direction?: Direction;
  justify?: Justify;
  align?: Align;
  flexWrap?: "wrap" | "nowrap";
  children?: React.ReactNode;
  gap?: Gap;
  columnGap?: Gap;
  rowGap?: Gap;
}

function FlexBox({
  direction = "row",
  justify = "start",
  align = "start",
  flexWrap = "nowrap",
  gap = 0,
  columnGap = 0,
  rowGap = 0,
  children,
  sx,
}: FlexBoxProps) {
  return (
    <View
      style={[
        { width: "100%" },
        directionStyle[direction],
        justifyStyle[justify],
        alignStyle[align],
        columnGapStyle[columnGap],
        rowGapStyle[rowGap],
        { flexWrap: flexWrap },
        sx,
      ]}
    >
      {React.Children.toArray(children).map((c, i) => (
        <View key={i} style={[i === 0 ? {} : gapStyle[gap]]}>
          {c}
        </View>
      ))}
    </View>
  );
}

export default FlexBox;

const directionStyle = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
});
const justifyStyle = StyleSheet.create({
  start: {
    justifyContent: "flex-start",
  },
  center: {
    justifyContent: "center",
  },
  end: {
    justifyContent: "flex-end",
  },
  between: {
    justifyContent: "space-between",
  },
  alignStart: {
    alignItems: "flex-start",
  },
  alignCenter: {
    alignItems: "center",
  },
  alignEnd: {
    alignItems: "flex-end",
  },
});
const alignStyle = StyleSheet.create({
  start: {
    alignItems: "flex-start",
  },
  center: {
    alignItems: "center",
  },
  end: {
    alignItems: "flex-end",
  },
});

const gapStyle = StyleSheet.create({
  0: {
    marginTop: 0,
  },
  1: {
    marginTop: 8,
  },
  2: {
    marginTop: 16,
  },
  3: {
    marginTop: 24,
  },
  4: {
    marginTop: 32,
  },
  5: {
    marginTop: 48,
  },
  6: {
    marginTop: 8 * 6,
  },
  7: {
    marginTop: 8 * 7,
  },
  8: {
    marginTop: 8 * 8,
  },
  9: {
    marginTop: 8 * 9,
  },
  10: {
    marginTop: 8 * 10,
  },
});

const columnGapStyle = StyleSheet.create({
  0: {
    columnGap: 0,
  },
  1: {
    columnGap: 8,
  },
  2: {
    columnGap: 16,
  },
  3: {
    columnGap: 24,
  },
  4: {
    columnGap: 32,
  },
  5: {
    columnGap: 48,
  },
  6: {
    columnGap: 8 * 6,
  },
  7: {
    columnGap: 8 * 7,
  },
  8: {
    columnGap: 8 * 8,
  },
  9: {
    columnGap: 8 * 9,
  },
  10: {
    columnGap: 8 * 10,
  },
});

const rowGapStyle = StyleSheet.create({
  0: {
    rowGap: 0,
  },
  1: {
    rowGap: 8,
  },
  2: {
    rowGap: 16,
  },
  3: {
    rowGap: 24,
  },
  4: {
    rowGap: 32,
  },
  5: {
    rowGap: 48,
  },
  6: {
    rowGap: 8 * 6,
  },
  7: {
    rowGap: 8 * 7,
  },
  8: {
    rowGap: 8 * 8,
  },
  9: {
    rowGap: 8 * 9,
  },
  10: {
    rowGap: 8 * 10,
  },
});
