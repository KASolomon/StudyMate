import { StyleSheet,  TextInput, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";


export default function AppTextInput({iconName, iconSize=20 , placeholder}) {
  return (
    <View style={styles.inputField}>
     { iconName && <MaterialCommunityIcons
        name={iconName}
        color={colors.medium}
        size={iconSize}
        style={styles.icon}
        
      />}
      <TextInput placeholder={placeholder} style={styles.textInput} />
    </View>
  );
}

const styles = StyleSheet.create({
    icon: {
    marginHorizontal: 10,
  },
  inputField: {
    backgroundColor: colors.light,
    borderRadius: 25,
    margin: 20,
    padding: 10,
    flex: 1,
    flexDirection: "row",
  },
  textInput : {
    width : '100%'
  },
})