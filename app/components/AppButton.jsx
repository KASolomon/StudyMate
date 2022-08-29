import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";
import Icon from "./Icon";

function AppButton({ style, title, onPress, color, iName, iSize, iColor}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }, { ...style }]}
      onPress={onPress} 
      
    >
      <Text style={styles.text}>{title}</Text>
      {iName && (
        <Icon name={iName} size={iSize} color={iColor} style={styles.icon} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    width: "80%",
    marginVertical: 30,
    alignSelf: "center",
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default AppButton;
