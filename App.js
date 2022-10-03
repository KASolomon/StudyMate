import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Box, NativeBaseProvider } from "native-base";
import { StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CwaScreen from "./app/screens/CwaScreen";
import SemesterCoursesScreen from "./app/screens/SemesterCoursesScreen";
import ProgrammeScreen from "./app/screens/ProgrammeScreen";
import TargetDisplayScreen from "./app/screens/TargetDisplayScreen";
import HelpScreen from "./app/screens/HelpScreen";
import TimetableScreen from "./app/screens/TimetableScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import AppNotification from "./app/components/AppNotification";
import SetTimetableScreen from "./app/screens/SetTimetableScreen";
import TabNavigatorScreen from "./app/screens/TabNavigatorScreen";
import Home from "./app/screens/Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "./app/components/Icon";
import colors from "./app/config/colors";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
 
export default function App() {
  const [oldUser, setOldUser] = useState(false);
  const checkOldUser = async () => {
    const result = await AsyncStorage.getItem("olduser");
    console.log(JSON.parse(result))
    if (!result) {
      setOldUser(false);
      return 0;
    }
    setOldUser(true);
    console.log(result)
    return 1;
  };

  const InitialNavigation = () => (
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
      <Stack.Screen name="SemesterCourses" component={SemesterCoursesScreen} />
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
        name="TabNavigatorScreen"
        component={TabNavigatorScreen}
        options={{ header: false }}
      />
      <Stack.Screen name="Home" component={Home} options={{ header: false }} />
    </Stack.Navigator>
  );

  const AppTabNavigator = () => (
    <Tab.Navigator initialRouteName="Home" tabBarOptions={{activeTintColor : colors.primary, allowFontScaling: true, style : {height :' 8%', paddingBottom : '4%'}, labelStyle :{ fontSize : 15}}}>
      <Tab.Screen
        name={"Home"}
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon iconName={"home"} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={"Timetable"}
        component={TimetableScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon iconName={"timetable"} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={"Target Scores"}
        component={TargetDisplayScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon iconName={"bullseye-arrow"} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={"Help"}
        component={HelpScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon iconName={"progress-question"} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );

  checkOldUser();
  return (
    <NativeBaseProvider>
      <Box flex={1} bg="#fff">
        <NavigationContainer>
          {oldUser ? <AppTabNavigator/> : <InitialNavigation />}
          {/* <TabNavigatorScreen/> */}
        </NavigationContainer>
        {/* <SetTimetableScreen/> */}
        {/* <Home /> */}
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
