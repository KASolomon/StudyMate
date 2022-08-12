import { useFormikContext } from 'formik';
import { Input } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import AppText from "../components/AppText";
import font from "../config/font";

export default function FormInputField({label, placeholder}) {
    const {handleChange} = useFormikContext();
  return (
    <>
      {label && <AppText style={styles.label}>{label}</AppText>}
      <Input
        mt={1}
        mb={3}
        onChangeText={handleChange(label)}
        ml={10}
        fontSize={font.md}
        placeholder={placeholder}
      />
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    textTransform : "capitalize",
    marginBottom: 10,
  },
});
