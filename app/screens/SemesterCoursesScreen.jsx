import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Box, Button, Input } from 'native-base'
import StudyMateIcon from './../components/StudyMateIcon';
import { Formik } from 'formik';
import AppText from '../components/AppText';
import FormInputField from "../components/FormInputField";

export default function SemesterCoursesScreen() {
  return (
    <Box p={6}>
      <StudyMateIcon />
      <AppText>Let's set up this semester's courses</AppText>
      <Box p={5} bg={"blueGray.700"} borderRadius={25}>
        <Formik
          initialValues={{ course: "" }}
          onSubmit={(values) => console.log(values)}
        >
          {({ handleChange }) => (
            <>
              <Box flexDirection={"row"} justifyContent={"space-evenly"} mb={5}>
                <Input placeholder="Course" w={"60%"} />
                <Input placeholder="Credit hours" w={"30%"} />
              </Box>
              <Button> + </Button>
            </>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({})