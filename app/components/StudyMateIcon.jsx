import React from "react";
import { StyleSheet } from "react-native";

import AppText from "./AppText";
import colors from "../config/colors";
import Icon from "./Icon";

export default function StudyMateIcon({ caption }) {
  return (
    <>
      <Icon
        iconName={"book-open-page-variant-outline"}
        style={styles.logo}
        size={35}
        color={colors.secondary}
      />
      {caption && <AppText style={styles.caption}>{caption}</AppText>}
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    padding: 20,
    marginBottom: 20,
    backgroundColor: colors.primary,
    borderRadius: 50,
    alignSelf: "center",
  },
  caption: {
    alignSelf: "center",
    marginBottom: 20,
  },
});
