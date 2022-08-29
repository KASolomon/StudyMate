import { Input } from "native-base";
import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet } from "react-native";
import AppText from "../components/AppText";
import font from "../config/font";
import ErrorMessage from "./ErrorMessage";

export default function FormInputField({
  error,
  touched,
  control,
  label,
  placeholder,
  rules,
  name,
  ...otherProps
}) {
  return (
    <>
      {label && <AppText style={styles.label}>{label}</AppText>}
      <Controller
        name={name}
        control={control}
        rules = {rules}
        render={({ field: { onBlur, onChange, value } }) => {
          return (
            <>
              <Input
                mt={1}
                mb={5}
                ml={10}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                fontSize={font.md}
                placeholder={placeholder}
                {...otherProps}
              />
              <ErrorMessage error={error} visible={touched} />
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
