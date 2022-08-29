import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet,View } from "react-native";
import AppButton from "../components/AppButton";
import FormInputField from "../components/FormInputField";
import Screen from "../components/Screen";
import StudyMateIcon from "../components/StudyMateIcon";
import colors from "../config/colors";

const handleFormSubmit = async (data) => {
  try {
    const stringified = JSON.stringify(data);
    await AsyncStorage.setItem("CWA", stringified);
    console.log("stored CWA");
  } catch (error) {
    console.log(error);
  }
  console.log(data);
};

const DECIMAL_REGEX = /^\d+\.?\d*$/;

export default function CwaScreen() {
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm();

  return (
    <Screen>
      <View >
        <StudyMateIcon caption={"How is your CWA looking like ? "} />
        <FormInputField
          name="currentcwa"
          label={"Current CWA"}
          placeholder="Current CWA"
          control={control}
          error={errors.currentcwa}
          rules={{
            required: { value: true, message: "CWA is required" },
            pattern: { value: DECIMAL_REGEX, message: "CWA must be a number." },
            validate: (value) => value > 40 || "CWA must be between 40 and 100",
          }}
        />
        <FormInputField
          name="targetcwa"
          label={"Target CWA"}
          placeholder="Target"
          error={errors.targetcwa}
          rules={{
            required: { value: true, message: "CWA is required" },
            pattern: { value: DECIMAL_REGEX, message: "CWA must be a number." },
            validate: (value) =>
              (value >= 40 && value < 100) || "CWA must be greater than 40",
          }}
          control={control}
        />
        <AppButton
          color={colors.primary}
          title={"Done"}
          onPress={handleSubmit(handleFormSubmit)}
        />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    
    backgroundColor : 'gray',
    justifyContent: "center",
  },

});
