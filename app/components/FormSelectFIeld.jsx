import { useFormikContext } from "formik";
import { CheckIcon, Select } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import font from "../config/font";
import AppText from "./AppText";
import { Controller } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

export default function FormSelectFIeld({
  name,
  control,
  label,
  rules,
  error,
  data = [{ label: "", value: any }],
}) {
  return (
    <>
      <AppText style={styles.label}>{label}</AppText>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => {
          return (
            <>
              <Select
                fontSize={font.md}
                placeholder={`Enter your ${label}`}
                mb={5}
                ml={5}
                mt={1}
                selectedValue={value}
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                onValueChange={onChange}
              >
                {data.map(({ label, value }) => (
                  <Select.Item label={label} value={value} key={value} />
                ))}
              </Select>
              <ErrorMessage error={error} />
            </>
          );
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    textTransform: "capitalize",
    marginBottom: 10,
  },
});
