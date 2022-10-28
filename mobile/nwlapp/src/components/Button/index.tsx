import React from "react";

import {
  TouchableOpacity,
  Text,
  ColorValue,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

import { styles } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
  color: ColorValue;
  backgroundColor: ColorValue;
  icons?: React.ComponentProps<typeof AntDesign>["name"];
  isLoading?: boolean;
};

export function Button({
  title,
  color,
  backgroundColor,
  icons,
  isLoading = false,
  ...rest
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={color} />
      ) : (
        <>
          <AntDesign name={icons} size={24} style={styles.icons} />
          <Text style={[styles.title, { color }]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}
