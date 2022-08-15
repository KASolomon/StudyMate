import { Formik } from "formik";
import React from "react";
import { StyleSheet } from "react-native";

import { Box } from "native-base";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import FormInputField from "../components/FormInputField";
import FormSelectFIeld from "../components/FormSelectFIeld";
import Icon from "../components/Icon";
import Screen from "../components/Screen";
import colors from "../config/colors";
import StudyMateIcon from "../components/StudyMateIcon";

export default function ProgrammeScreen() {
  const levels =[
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
  return (
    <>
      <Screen style={styles.container}>
        <Box p={5}>
          <StudyMateIcon/>
          <AppText style={styles.caption}>
            Welcome ! Let's set you up for study mate.
          </AppText>
        </Box>
        <Formik
          initialValues={{
            name : '',
            programme: "",
            level: 100,
            semester: 1,
          }}
          onSubmit={(values) => console.log(values)}
        >
          {({ handleSubmit }) => (
            <>
              <FormInputField
                label="name"
                placeholder={"Enter Your Name"}
              />
              <FormInputField
                label="programme"
                placeholder={"Enter Your Programme"}
              />
              <FormSelectFIeld label ='level' data ={levels}/>
              <FormSelectFIeld label ='semester' data ={sem}/>
              <AppButton
                title={"Next"}
                iName="arrow-right"
                iSize={25}
                iColor={"white"}
                color={"black"}
                onPress={handleSubmit}
                style ={styles.button}
              />
            </>
          )}
        </Formik>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
 container: {
    justifyContent: "center",
    padding : 6
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
