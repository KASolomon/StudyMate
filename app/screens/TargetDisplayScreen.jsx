import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import DataTable, { COL_TYPES } from "react-native-datatable-component";
import StudyMateIcon from "../components/StudyMateIcon";
import Screen from "../components/Screen";
import { Box } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rand from "lodash.random";

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
  const [scores, setScores] = useState({});
  const [higher, setHigher] = useState(false);
  let test = "test";
  useEffect(() => {
    async function getData() {
      try {
        const cwa = await AsyncStorage.getItem("cwa");
        const cwadata = JSON.parse(cwa);
        const courses = await AsyncStorage.getItem("semcourse");
        const semcourses = JSON.parse(courses);
        const bio = await AsyncStorage.getItem("initialbio");
        const biodata = JSON.parse(bio);

        return { ...biodata, ...cwadata, ...semcourses };
      } catch (error) {
        console.log(error);
      }
      // console.log(biodata);
    }

    const data = getData();
    console.log(data);

    //retrieving required data from stored object
    const currentcwa = data.currentcwa;
    const targetcwa = data.targetcwa;
    const year = data.level / 100;
    const semester = data.semester;
    const totalcredit = data.totalcredit;
    let courses = data.courses;
    // initial computations
    const cwadiff = targetcwa - currentcwa;
    const sems = 2 * (year - 1) + semester;
    const semavg = cwadiff * sems + currentcwa;
    const weightedavg = semavg * totalcredit;
    const base_score = semavg - 5;
    try {
      for (let course of courses) {
        course.score = base_score;
      }
    } catch (error) {
      console.log(error);
    }

    let accumulated = base_score * totalcredit;
    let addition = 0;
    let index = 0;
    while (accumulated < weightedavg) {
      index = rand(0, courses.length - 1);
      courses[index].score += 1;
      addition = courses[index].credit * 1;
      accumulated += addition;
    }
    if (accumulated > weightedavg) setHigher(true);
    setScores(courses);
  }, []);
  console.log(scores);
  return (
    <>
      <Screen>
        <StudyMateIcon
          caption={"Try aiming at these scores for this semester"}
        />

        <DataTable
          data={data}
          colNames={["course", "score"]}
          colSettings={[
            { name: "course", type: COL_TYPES.STRING, width: "70%" },
            { name: "score", type: COL_TYPES.INT, width: "30%" },
          ]}
          noOfPages={1}
          headerLabelStyle={{ color: "grey", fontSize: 12 }}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({});
