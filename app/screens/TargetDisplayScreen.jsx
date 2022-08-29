import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DataTable, { COL_TYPES } from "react-native-datatable-component";
import StudyMateIcon from "../components/StudyMateIcon";
import Screen from "../components/Screen";
import { Box } from "native-base";

const data = [
  { course: "Introduction to structured programming", score: 89 },
  { course: "Assembly Language", score: 66 },
  { course: "Introduction to Visual Basic", score: 77 },
  { course: "Operations Research I", score: 96 },
  { course: "Operations Research II", score: 68 },
  { course: "Real-Time and Embedded Systems", score: 79 },
  { course: "Computer Networks", score: 87 },
];
export default function TargetDisplayScreen() {
  return (
    <>
      <Screen >
      <StudyMateIcon caption ={'Try aiming at these scores for this semester'}/>

      <DataTable
        data={data}
        colNames={["course", "score"]}
        colSettings={[
          { name: "course", type: COL_TYPES.STRING, width: "70%" },
          { name: "score", type: COL_TYPES.INT, width: "30%" },
        ]}
        noOfPages={1}
        headerLabelStyle ={{color : 'grey', fontSize : 12}}
        
      />
      </Screen>
      
    </>
  );
}

const styles = StyleSheet.create({});
