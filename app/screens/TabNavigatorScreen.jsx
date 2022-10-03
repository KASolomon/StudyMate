import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../config/colors";
import Home from "./Home";
import TimetableScreen from "./TimetableScreen";
import TargetDisplayScreen from "./TargetDisplayScreen";
import HelpScreen from "./HelpScreen";

import Icon from "../components/Icon";


const Tab = createBottomTabNavigator();
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

export default function TabNavigatorScreen() {
  return (
    <AppTabNavigator/>
  );
}


