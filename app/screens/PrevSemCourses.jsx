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
      <StudyMateIcon
        caption={"Almost There! Targets should be just right for you."}
      />
      <AppText style={styles.caption}>
        Please fill in the details below for last semester's courses
      </AppText>
      <Box p={5}>
        <Formik
          initialValues={{ courses: [{ score: 0, credit: 1 }] }}
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
                        name={`courses[${index}]['score']`}
                        value={courses.course}
                        onChangeText={handleChange(
                          `courses[${index}]['score']`
                        )}
                        placeholder="Course score"
                        w={"60%"}
                        fontSize={font.md}
                      />
                      <TextField
                        name={`courses[${index}]['credit']`}
                        value={courses.credit}
                        onChangeText={handleChange(
                          `courses[${index}]['credit']`
                        )}
                        placeholder="Credit Hours"
                        w={"20%"}
                        fontSize={font.md}
                      />
                      <Button
                        onPress={() => {
                          push({ score: 0, credit: 1 });
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
              <AppButton
                color={colors.primary}
                onPress={handleSubmit}
                title={"See targets"}
              ></AppButton>
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
