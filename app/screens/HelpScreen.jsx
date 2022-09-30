import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Screen from "./../components/Screen";
import { Box } from "native-base";
import StudyMateIcon from "../components/StudyMateIcon";
import AppText from "../components/AppText";

export default function HelpScreen() {
  return (
    <Screen>
      <Box>
        <StudyMateIcon />
        <AppText style={styles.header}>Help</AppText>
        <AppText style={{ padding: 13, fontWeight: "bold" }}>
          About Study Mate
        </AppText>
        <AppText style={{ padding: 22 }}>
          Study Mate is a cross-platform mobile application meant to help you
          improve academically by assisting you to set and reach goals for a
          semester based on your CWA.
        </AppText>
        <AppText style={{ padding: 13, fontWeight: "bold" }}>
          How to use Study Mate
        </AppText>
        <AppText style={{ padding: 22 }}>
          On your first run of this app, you provided it with some data like
          your semester courses, CWA and the like. This data has been used to
          set reasonable targets for you in the 'target scores' section of the
          app. You can use these targets as a guide for your current semester.
          You will also receive notifications for the study periods you have set
          in your timetable.
        </AppText>
        <AppText
          style={{ padding: 13, fontWeight: "bold", fontStyle: "italic" }}
        >
          Study Mate version 1.0
        </AppText>
      </Box>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    fontWeight: "bold",
    marginVertical: 10,
  },
});
