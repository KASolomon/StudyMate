import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import { useState } from "react";
import AppButton from "./AppButton";
import ListItem from "./ListItem";
import { useFormikContext } from "formik";
import AppText from './AppText';

export default function AppFormPicker({ data, placeholder, stateVariable, setState, iconName }) {
  const [visible, setVisible] = useState(false);
  const {values, handleChange, setFieldValue} = useFormikContext();

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setVisible(true)}>
        <View style={styles.pickerContainer}>
          <MaterialCommunityIcons
            name={iconName}
            size={25}
            style={styles.icon}
          />
          <AppText style={styles.picker}>{placeholder}</AppText>
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={visible} style = {styles.modal} animationType="slide">
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              onPress={() => {
                setVisible(false);
                // setFieldValue(item.name);
              }}
            />
          )}
        />
        <AppButton
          color={colors.danger}
          title={"Close"}
          onPress={() => setVisible(false)}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
    color: colors.medium,
  },
  modal :{
    height : '80%',
  },
  pickerContainer: {
    backgroundColor: colors.light,
    borderRadius: 25,
    margin: 20,
    padding: 10,
    flexDirection: "row",
    alignItems : "center",
  },
  picker: {
    width: "100%",
    color : 'gray',
    fontSize : 15
  },
});
