import { FieldArray, Formik } from "formik";
import { Box, Button, TextField } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import colors from "../config/colors";
import font from "../config/font";
import StudyMateIcon from "./../components/StudyMateIcon";

export default function SemesterCoursesScreen() {
  return (
    <Box p={6}>
      <StudyMateIcon />
      <AppText style={styles.caption}>Let's set up this semester's courses</AppText>
      <Box p={5}  borderRadius={25}>
        <Formik
          initialValues={{ courses: [{ course: "", credit: 1 }]}}
          onSubmit={(values) => console.log(values)}
          
        >
          {({ handleChange, handleSubmit }) => (
            <>
              <FieldArray name="courses">
                {({ form, push, remove }) => {
                  const { values } = form;
                  const { courses } = values;
                  return courses.map((course, index) => (
                    <Box
                      flexDirection={"row"}
                      justifyContent={"space-evenly"}
                      mb={5}
                      key={index}
                    >
                      <TextField
                        name={`courses[${index}]['course']`}
                        value={courses.course}
                        onChangeText={handleChange(
                          `courses[${index}]['course']`
                        )}
                        placeholder="Course"
                        w={"60%"}
                        fontSize={font.md}
                      />
                      <TextField
                        name={`courses[${index}]['credit']`}
                        value={courses.credit}
                        onChangeText={handleChange(
                          `courses[${index}]['credit']`
                        )}
                        placeholder="Credit Hour"
                        w={"20%"}
                        fontSize={font.md}
                      />
                      <Button
                        onPress={() => {
                          push({ course: "", credit: 1 });
                        }}
                        bgColor={"green.700"}
                      >
                        +
                      </Button>
                      {index > 0 ? (
                        <Button
                          onPress={() => {
                            remove(index);
                          }}
                          bgColor={"red.700"}
                        >
                          -
                        </Button>
                      ) : null}
                    </Box>
                  ));
                }}
              </FieldArray>
              <AppButton color={colors.primary} onPress={handleSubmit} title={'Submit'}></AppButton>
            </>
          )}

        </Formik>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  caption: {
    alignSelf: "center",
    marginBottom: 20,
  },
});
