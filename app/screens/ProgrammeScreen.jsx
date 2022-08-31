import { Formik } from "formik";
import React from "react";
import { StyleSheet } from "react-native";

import { Box } from "native-base";
import * as yup from "yup";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import FormInputField from "../components/FormInputField";
import FormSelectFIeld from "../components/FormSelectFIeld";
import Icon from "../components/Icon";
import Screen from "../components/Screen";
import colors from "../config/colors";
import StudyMateIcon from "../components/StudyMateIcon";
import ErrorMessage from "../components/ErrorMessage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm } from "react-hook-form";



const handleSubmitFunction = async (data) => {
  try {
    const stringified = JSON.stringify(data);
    await AsyncStorage.setItem("initialbio", stringified);
    // console.log(data);
    console.log("stored");
  } catch (error) {
    console.log(error);
  }
  // console.log(data);
};

const levels = [
  { label: "Level 100", value: 100 },
  { label: "Level 200", value: 200 },
  { label: "Level 300", value: 300 },
  { label: "Level 400", value: 400 },
  { label: "Level 500", value: 500 },
  { label: "Level 600", value: 600 },
];
const sem = [
  { label: "Semester 1", value: 1 },
  { label: "Semester 2", value: 2 },
];

export default function ProgrammeScreen() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <>
      <Screen style={styles.container}>
        <StudyMateIcon caption={"Welcome ! Let's set you up for study mate."} />

        <FormInputField
          label="name"
          name="name"
          control={control}
          error={errors.name}
          placeholder={"Enter your name"}
          rules={{
            required: { value: true, message: "Name is required" },
            minLength: {
              value: 2,
              message: "Name should be more than 2 characters",
            },
          }}
        />

        <FormInputField
          label="programme"
          name="programme"
          control={control}
          error={errors.programme}
          rules={{
            required: { value: true, message: "Programme is required" },
          }}
          placeholder={"Enter your programme"}
        />
        <FormSelectFIeld
          name="level"
          error={errors.level}
          control={control}
          label="level"
          data={levels}
          rules = {{required :{value : true , message : "Please select your level"}}}
        />
        <FormSelectFIeld
          name="semester"
          error={errors.semester}
          control={control}
          label="semester"
          data={sem}
          rules = {{required :{value : true , message : "Please select your semester"}}}
        />
        <AppButton
          title={"Next"}
          iName="arrow-right"
          iSize={25}
          iColor={"white"}
          color={"black"}
          onPress={handleSubmit(handleSubmitFunction)}
          style={styles.button}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  inputField: {
    marginLeft: 10,
  },

  picker: {
    width: "80%",
  },
  caption: {
    alignSelf: "center",
    marginBottom: 20,
  },
});
