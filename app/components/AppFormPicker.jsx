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

export default function AppFormPicker({ data, placeholder, stateVariable, setState, iconName }) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setVisible(true)}>
        <View style={styles.pickerContainer}>
          <MaterialCommunityIcons name={iconName} size={25} style={styles.icon} />
          <TextInput
            placeholder={placeholder}
            value={stateVariable.title}
            style={styles.picker}
            
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={visible} animationType="slide">
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              onPress={() => {
                setVisible(false);
                setState(item);
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
  pickerContainer: {
    backgroundColor: colors.light,
    borderRadius: 25,
    margin: 20,
    padding: 10,
    flexDirection: "row",
  },
  picker: {
    width: "100%",
  },
});
