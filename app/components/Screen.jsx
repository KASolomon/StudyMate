import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View, ScrollView } from "react-native";

function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen]}>
      <ScrollView contentContainerStyle={styles.scrollview}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight + 10,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  scrollview: {
    flexGrow: 1,
    justifyContent: "center",
  },
});

export default Screen;
