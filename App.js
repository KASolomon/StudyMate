import { StatusBar } from "expo-status-bar";
import { Box, NativeBaseProvider } from "native-base";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CwaScreen from "./app/screens/CwaScreen";
import SemesterCoursesScreen from "./app/screens/SemesterCoursesScreen";
import ProgrammeScreen from "./app/screens/ProgrammeScreen";
import TargetDisplayScreen from "./app/screens/TargetDisplayScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import AppNotification from "./app/components/AppNotification";
import SetTimetableScreen from "./app/screens/SetTimetableScreen";
import Home from "./app/screens/Home";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <Box flex={1} bg="#fff">
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Welcome"
          >
            <Stack.Screen name="CwaScreen" component={CwaScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen
              name="TargetDisplayScreen"
              component={TargetDisplayScreen}
            />
            <Stack.Screen
              name="SemesterCourses"
              component={SemesterCoursesScreen}
            />
            <Stack.Screen
              name="ProgrammeScreen"
              component={ProgrammeScreen}
              options={{ header: false }}
            />
            <Stack.Screen
              name="SetTimetableScreen"
              component={SetTimetableScreen}
              options={{ header: false }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ header: false }}
            />
            
          </Stack.Navigator>
        </NavigationContainer>
        
        {/* <Home /> */}
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
