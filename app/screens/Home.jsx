import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen from '../components/Screen';


export default function Home() {
  const getBioData = async () => {
    const result = AsyncStorage.getItem('biodata');
    
  };

    const Tab = createBottomTabNavigator();
  return (
        <Screen>

    
    <View>
      <Text>Home</Text>
    </View>
        </Screen>
  )
}

const styles = StyleSheet.create({})