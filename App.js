import { StatusBar } from "expo-status-bar";
import { Box, NativeBaseProvider } from "native-base";
import { StyleSheet } from "react-native";
import ProgrammeScreen from "./app/screens/ProgrammeScreen";
import PrevSemCourses from "./app/screens/PrevSemCourses";
import TargetDisplayScreen from "./app/screens/TargetDisplayScreen";

export default function App() {
  return (
    <NativeBaseProvider>
      <Box flex={1} bg="#fff"  justifyContent="center">
        
        {/* <ProgrammeScreen /> */}
        {/* <PrevSemCourses/> */}
        <TargetDisplayScreen/>
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
