import { StatusBar } from "expo-status-bar";
import { Box, NativeBaseProvider } from "native-base";
import { StyleSheet } from "react-native";
import CwaScreen from "./app/screens/CwaScreen";
import SemesterCoursesScreen from "./app/screens/SemesterCoursesScreen";
import ProgrammeScreen from './app/screens/ProgrammeScreen';
import TargetDisplayScreen from './app/screens/TargetDisplayScreen';

export default function App() {
  return (
    <NativeBaseProvider>
      <Box flex={1} bg="#fff"  >

        {/* <CwaScreen/> */}
        <SemesterCoursesScreen/>
         {/* <ProgrammeScreen /> */}
         
        {/* <PrevSemCourses/> */}
        {/* <TargetDisplayScreen/> */}
        <StatusBar style="auto" />
      </Box>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
