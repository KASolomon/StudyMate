import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import DataTable, { COL_TYPES } from "react-native-datatable-component";
import StudyMateIcon from "../components/StudyMateIcon";
import Screen from "../components/Screen";
import { Box } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rand from "lodash.random";
import AppText from "../components/AppText";

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
  const [userdata, setUserData] = useState({});
  const [scores, setScores] = useState({});
  const [higher, setHigher] = useState(false);
  const [finalcwa, setFinalcwa] = useState(0);

  useEffect(() => {
    async function getData() {
      try {
        //retrieving cwa data
        const cwa = await AsyncStorage.getItem("cwa");
        const cwadata = JSON.parse(cwa);
        //retrieving courses data
        const courses = await AsyncStorage.getItem("semcourse");
        const semcourses = JSON.parse(courses);
        //retrieving programme data data
        const bio = await AsyncStorage.getItem("initialbio");
        const biodata = JSON.parse(bio);
        const user = { ...cwadata, ...semcourses, ...biodata };
        setUserData(user);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
    console.log("new user data");
    console.log(userdata);

    //retrieving required data from stored object
    const currentcwa = parseInt(userdata.currentcwa);
    const targetcwa = parseInt(userdata.targetcwa);
    const year = userdata.level / 100;
    const semester = userdata.semester;
    const totalcredit = userdata.totalcredit;
    let courses = userdata.courses;
    // initial computations
    const cwadiff = targetcwa - currentcwa;
    const sems = 2 * (year - 1) + semester;
    const semavg = cwadiff * sems + currentcwa;
    const weightedavg = semavg * totalcredit;
    const base_score = semavg - 5;

    // console.log(userdata)
    try {
      for (let course of courses) {
        course.score = base_score;
      }
    } catch (error) {
      console.log("Error at for loo");
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
    let finalcwa = accumulated/totalcredit;
   accumulated > weightedavg
     ? setHigher(true) && setFinalcwa(finalcwa)
     : setFinalcwa(targetcwa);

    setScores(courses);
    console.log(scores);
  }, []);
  // console.log(scores);
  return (
    <>
      <Screen>
        <StudyMateIcon
          caption={"Try aiming at these scores for this semester"}
        />

        <DataTable
          data={data}
          colNames={["course", "credit", "score"]}
          colSettings={[
            { name: "course", type: COL_TYPES.STRING, width: "70%" },
            { name: "credit", type: COL_TYPES.INT, width: "15%" },
            { name: "score", type: COL_TYPES.INT, width: "15%" },
          ]}
          noOfPages={1}
          headerLabelStyle={{ color: "grey", fontSize: 12 }}
        />
        {higher ? <Box bgColor={'#cbfab6'}><AppText style={{color: '#53b52a'}}>With these scores you can even get to {finalcwa}</AppText></Box>
        : <AppText>Target CWA {finalcwa}</AppText>}
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({});
