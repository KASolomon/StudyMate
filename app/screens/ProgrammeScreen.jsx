import React, { useState } from "react";
import { StyleSheet } from "react-native";
import AppButton from "../components/AppButton";
import AppFormPicker from "../components/AppFormPicker";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import Icon from "../components/Icon";
import Screen from "../components/Screen";

const levels = [
  { id: 0, title: "Level 100", value: 100 },
  { id: 1, title: "Level 200", value: 200 },
  { id: 2, title: "Level 300", value: 300 },
  { id: 3, title: "Level 400", value: 400 },
  { id: 4, title: "Level 500", value: 500 },
  { id: 5, title: "Level 600", value: 600 },
];
const semesters = [
  { id: 0, title: "Semester 1", value: 1 },
  { id: 1, title: "Semester 2", value: 2 },
];
export default function ProgrammeScreen() {
    const [level, setLevel] = useState({title : '', value : 0});
    const [sem, setSem] = useState({ title: "", value: 0 });
    return (
    <Screen style={styles.container}>
        <Icon/>
        <AppText>Welcome ! Let's set you up for study mate.</AppText>
      <AppTextInput placeholder={"Programme"} />
      <AppFormPicker iconName ={"chart-timeline-variant"} data={levels} placeholder="Level" stateVariable={level} setState={setLevel}/>
      <AppFormPicker data={semesters} placeholder="Semester" stateVariable={sem} setState={setSem}/>
      <AppButton title={"Next"} iName = "arrow-right" iSize={25} iColor ={"white"}  color ={"black"} onPress ={ () => console.log('Submitted')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    //  backgroundColor : colors.primary,
  },
});
