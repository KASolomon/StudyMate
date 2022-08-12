import { useFormikContext } from 'formik';
import { Select } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import font from "../config/font";
import AppText from "./AppText";

export default function FormSelectFIeld({label,
  data = [{ label: "", value: any }],
}) {
    const {setFieldValue} = useFormikContext();
  return (
    <>
      <AppText style={styles.label}>{label}</AppText>
      <Select
        fontSize={font.md}
        my={1}
        ml={5}
        onValueChange={(item) => setFieldValue(label, item)}
      >
        {data.map(({ label, value }) => (
          <Select.Item label={label} value={value} key = {value} />
        ))}
      </Select>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    textTransform: "capitalize",
    marginBottom: 10,
  },
});
