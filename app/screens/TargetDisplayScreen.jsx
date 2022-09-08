import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import StudyMateIcon from "../components/StudyMateIcon";
import Screen from "../components/Screen";
import { Box } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rand from "lodash.random";
import AppText from "../components/AppText";
import ActivityIndicator from "../assets/ActivityIndicator";
import AppButton from "../components/AppButton";
import DataTabl from "./Table";

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
  const [compute, setCompute] = useState(true);
  const [higher, setHigher] = useState(false);
  const [myScores, setMyScores] = useState([]);
  let [finalcwa, setFinalcwa] = useState(0);

  const getData = async () => {
    try {
      //retrieving cwa data
      const cwa = await AsyncStorage.getItem("cwa");
      const cwadata = JSON.parse(cwa);
      // console.log(cwadata)
      //retrieving courses data
      const courses = await AsyncStorage.getItem("semcourse");
      const semcourses = JSON.parse(courses);
      //retrieving programme data data
      const bio = await AsyncStorage.getItem("initialbio");
      const biodata = JSON.parse(bio);
      // const user1 = ["", "", ""];

      const cours = [];
      const currentcwa = parseInt(cwadata.currentcwa);
      const targetcwa = parseInt(cwadata.currentcwa);
      const year = biodata.level / 100;
      const semester = biodata.semester;
      const totalcredit = semcourses.totalcredit;

      //let courses = myScores[0]?.courses;
      // initial computations
      const cwadiff = targetcwa - currentcwa;
      const sems = 2 * (year - 1) + semester;
      const semavg = cwadiff * sems + currentcwa;
      const weightedavg = semavg * totalcredit;
      const score = semavg - 5;

      semcourses.courses.map((val,index) => {
        let gh;
        index === 0
          ? (gh = {
              course: val.course,
              credit: val.credit,
              ...cwadata,
              ...biodata,
              score ,
              totalcredit, 
              weightedavg
            }
            )
          : (gh = {
              course: val.course,
              credit: val.credit,
              score,
            });

        cours.push(gh);
      });

      setMyScores(cours);
      if(myScores.length>0){
        console.log('running calculations')
        calculate(myScores);
      }
      if(compute) setCompute(false)
    } catch (error) {
      console.log(error)
    }
  };

  const calculate = (myScores) => {
    //calculations
    /*
    1. totalcredit
    2. weightedavg
    
    */
    //calculations
    
    const {score} = myScores[0];
    const {totalcredit} = myScores[0];
    const {weightedavg} = myScores[0];
    const {targetcwa} = myScores[0];
    let accumulated = score * totalcredit;
    let addition = 0;
    let index = 0;
    while (accumulated < weightedavg) {
      index = rand(0, myScores.length - 1);
      myScores[index].score += 1;
      addition = myScores[index].credit * 1;
      accumulated += addition;
    }
    setMyScores(myScores);
    let finalcwa = accumulated / totalcredit;
    accumulated > weightedavg
      ? setHigher(true) && setFinalcwa(finalcwa)
      : setFinalcwa(targetcwa);

  };
  useEffect(() => {
    getData()}, [compute]);

  return (
    <>
      <Screen>
        {/* <ActivityIndicator visible={!showTable}/> */}
        <StudyMateIcon
          caption={"Try aiming at these scores for this semester"}
        />
        <AppButton
          title={"Show Me"}
          color={"black"}
          onPress={() => console.log(myScores)}
        />
        {myScores && <DataTabl data={myScores} />}

        {higher ? (
          <Box>
            <AppText style={{ color: "#53b52a", fontStyle: "italic" }}>
              With these scores you can get a CWA of {finalcwa}
            </AppText>
          </Box>
        ) : (
          <AppText>Target CWA {finalcwa}</AppText>
        )}
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({});
