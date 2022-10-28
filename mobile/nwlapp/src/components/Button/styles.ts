import { StyleSheet } from "react-native";
import { FONTS } from "../../theme";

export const styles = StyleSheet.create({
  container: {},

  button: {
    height: 48,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 18,
    fontFamily: FONTS.BOLD,
  },

  icons: {
    marginRight: 12,
  },
});
