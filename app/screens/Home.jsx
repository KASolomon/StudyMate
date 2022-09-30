import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Screen from "../components/Screen";
import { useEffect, useState } from "react";
import { Box } from "native-base";
import AppText from "./../components/AppText";
import DashboardCard from "../components/DashboardCard";
import StudyMateIcon from "./../components/StudyMateIcon";

export default function Home() {
  const [biodata, setBioData] = useState({});
  const getBioData = async () => {
    const result = await AsyncStorage.getItem("initialbio");
    const data = JSON.parse(result);
    setBioData({ ...data });
    // console.log(data)
  };
  useEffect(() => {
    getBioData();
  }, []);

  const keys = Object.keys(biodata).length;
  const Tab = createBottomTabNavigator();
  const { level, name, programme, semester } = biodata;
  const standing = `${level}, semester ${semester}`;

  return (
    <Box flex={1}>
      {keys > 0 ? (
        <Screen>
          <StudyMateIcon caption={`Welcome, it's good to see you ${name}. `} />
          <DashboardCard
            headerTitle={"User"}
            cardContent={name}
            headerTitleColor={"white"}
            iconName={"account-circle"}
            iconColor={"white"}
          />
          <DashboardCard
            headerTitle={"Programme"}
            cardContent={programme}
            headerTitleColor={"white"}
            iconName={"school"}
            iconColor={"white"}
          />
          <DashboardCard
            headerTitle={"Level"}
            cardContent={standing}
            headerTitleColor={"white"}
            iconName={"chart-timeline-variant"}
            iconColor={"white"}
          />
        </Screen>
      ) : (
        <Box>
          <AppText>
            Sorry. We're having trouble retrieving your data. Kindly restart the
            app.😉{" "}
          </AppText>
        </Box>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({});
