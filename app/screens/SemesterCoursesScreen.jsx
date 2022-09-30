import AsyncStorage from "@react-native-async-storage/async-storage";
import { FieldArray, Formik } from "formik";
import { Box, Button, TextField } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import * as yup from "yup";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import ErrorMessage from "../components/ErrorMessage";
import Screen from "../components/Screen";
import colors from "../config/colors";
import font from "../config/font";
import StudyMateIcon from "./../components/StudyMateIcon";
import { Controller, useFieldArray, useForm } from "react-hook-form";



const WHOLENUM_REGEX = /^\d+$/;

export default function SemesterCoursesScreen({navigation}) {
  const handleFormSubmit = async (values) => {
    let totalcredit = 0;
    for (const course of values.courses) {
        course.credit = parseInt(course.credit)
        totalcredit = totalcredit + course.credit;
    }
    values = {totalcredit, ...values};
    try {
      const jsonValue = JSON.stringify(values);
      
      await AsyncStorage.setItem("semcourse", jsonValue);
      navigation.navigate("TargetDisplayScreen");
      console.log("stored");
    } catch (error) {
      console.log(error);
    }
    console.log(values);
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "courses",
    rules: { required: { value: true, message: "All fields are required" } },
  });
  return (
    <Screen>
      <Box>
        <StudyMateIcon />
        <AppText style={styles.caption}>
          Let's set up this semester's courses
        </AppText>
        <Box p={5}>
          {fields.map((field, index) => (
            <React.Fragment key={field.id}>
             
              <Box flexDir={"row"} justifyContent={"space-evenly"}>
                <Controller
                  control={control}
                  name={`courses.${index}.course`}
                  rules={{
                    required: { value: true, message: "Fields are required" },
                  }}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <TextField
                        value={value}
                        onChangeText={onChange}
                        placeholder="Course"
                        w={"65%"}
                        fontSize={font.md}
                      />
                    );
                  }}
                />
                <Controller
                  control={control}
                  name={`courses.${index}.credit`}
                  rules={{
                    required: { value: true, message: "Fields are required" },
                    pattern: {
                      value: WHOLENUM_REGEX,
                      message: "Credit hour must be a number",
                    },
                    validate: (value) => value > 0 && value < 10 || 'The credit hour is too high',
                  }}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <TextField
                        value={value}
                        onChangeText={onChange}
                        placeholder="Credit"
                        w={"25%"}
                        fontSize={font.md}
                      />
                    );
                  }}
                />
                {index > 0 ? (
                  <Button
                    onPress={() => {
                      remove(index);
                    }}
                    bgColor={"red.700"}
                    maxH={"70%"}
                  >
                    -
                  </Button>
                ) : null}
              </Box>

              {errors.courses && errors.courses[`${index}`] && (
                <ErrorMessage error={errors.courses[`${index}`].course} />
              )}
              {errors.courses &&
                errors.courses[`${index}`] &&
                !errors.courses[`${index}`].course && (
                  <ErrorMessage error={errors.courses[`${index}`].credit} />
                )}
            </React.Fragment>
          ))}

          <AppButton
            color={"green"}
            title={"+"}
            style={{ width: "30%" }}
            onPress={() => append({ course: "", credit: "" })}
          />
          <AppButton
            color={"black"}
            title={"submit"}
            onPress={handleSubmit(handleFormSubmit)}
          />
          {/* <Formik
            initialValues={{ courses: [{ course: "", credit: 1 }] }}
            onSubmit={(values) => handleFormSubmit(values)}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              handleSubmit,
              errors,
              setFieldTouched,
              touched,
            }) => (
              <>
                <FieldArray name="courses">
                  {({ form, push, remove }) => {
                    const { values } = form;
                    const { courses } = values;
                    return courses.map((course, index) => (
                      <>
                        <Box
                          flexDirection={"row"}
                          justifyContent={"space-around"}
                          mb={5}
                          key={index}
                        >
                          <TextField
                            name={`courses[${index}]['course']`}
                            value={courses.course}
                            onChangeText={handleChange(
                              `courses[${index}]['course']`
                            )}
                            onBlur={() =>
                              setFieldTouched(`courses[${index}]['course']`)
                            }
                            placeholder="Course"
                            w={"50%"}
                            fontSize={font.md}
                          />
                          <TextField
                            name={`courses[${index}]['credit']`}
                            value={courses.credit}
                            onChangeText={handleChange(
                              `courses[${index}]['credit']`
                            )}
                            onBlur={() =>
                              setFieldTouched(`courses[${index}]['credit']`)
                            }
                            placeholder="Credit"
                            w={"30%"}
                            fontSize={font.md}
                          />
                          <Button
                            onPress={() => {
                              push({ course: "", credit: 1 });
                            }}
                            bgColor={"green.700"}
                            maxH={"70%"}
                          >
                            +
                          </Button>
                          {index > 0 ? (
                            <Button
                              onPress={() => {
                                remove(index);
                              }}
                              bgColor={"red.700"}
                              maxH={"70%"}
                            >
                              -
                            </Button>
                          ) : null}
                        </Box>
                        <ErrorMessage
                          error={errors[`courses[${index}]['course']`]}
                          visible={true}
                        />
                        <ErrorMessage
                          error={errors[`courses[${index}]['credit']`]}
                        />
                      </>
                    ));
                  }}
                </FieldArray>
                <AppButton
                  color={colors.primary}
                  onPress={handleSubmit}
                  title={"Submit"}
                ></AppButton>
              </>
            )}
          </Formik> */}
        </Box>
      </Box>
    </Screen>
  );
}

const styles = StyleSheet.create({
  caption: {
    alignSelf: "center",
    marginBottom: 20,
  },
});
