import { StyleSheet, Text, View, SectionList, SafeAreaView } from 'react-native'
import React, {useState, useEffect} from 'react'
import Screen from "../components/Screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppText from "../components/AppText";
import { Box } from "native-base";
import Constants from "expo-constants";
import StudyMateIcon from '../components/StudyMateIcon';

export default function TimetableScreen() {
  const [timetable, setTimetable] = useState([]);

  const CourseDetails =({item})=>(
    <>
      <AppText style={styles.course}>{item.course}</AppText>
      <AppText style={styles.timeString}>{item.timeString}</AppText>
    </>)
  
  const ItemSeparator = () => <View style={styles.ItemSeparator}></View>;
  const getTimetableData = async ()=>{
    const timetablestring = await AsyncStorage.getItem('timetable');
    const timetabledata = JSON.parse(timetablestring);
    const keys = Object.keys(timetabledata);
    // console.log(keys)
    let included = {};
    let packaged = [];

    for (let key of keys){
      if(timetabledata[key].length == 1) {
        
         included = {title: key, data : timetabledata[key] }
         packaged.push(included);
}      
    }
    console.log(packaged)
// console.log(packaged)
    setTimetable(packaged);
    // console.log(timetable)
  };
useEffect(()=>{getTimetableData();}, [])

  return (
    <SafeAreaView style = {styles.container}>
      <StudyMateIcon caption={'Here is your timetable'}/>
      <SectionList
      sections={timetable}
      extraData = {timetable}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <CourseDetails item={item}/>}
    // ItemSeparatorComponent ={ItemSeparator}
      renderSectionHeader={({ section: { title } }) => <Box style = {styles.headerContainer}>

          <AppText style={styles.header} >{title}</AppText>
        </Box>
      }
    />
    </SafeAreaView>
    // <Screen>
    //   {/* <SectionList

    //   /> */}

    // </Screen>
  )
  };

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  course: {
    fontWeight: "bold",
  },
  header: {
    fontWeight: "bold",
    textAlign: "center",
    textTransform : 'capitalize'
  },
  headerContainer: {
    marginTop : 20,
    justifyContent: "center",
    alignItems: "center",
  },
  ItemSeparator :{
    width : '100%',
    height : 2,
    backgroundColor : 'black'
  },
  timeString :{
    marginBottom : 20
  },
});