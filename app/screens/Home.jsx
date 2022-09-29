import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Screen from '../components/Screen';
import { NavigationContainer } from '@react-navigation/native';


export default function Home() {
    const Tab = createBottomTabNavigator();
  return (
        <Screen>

    <NavigationContainer>
        <Tab.Navigator >
        <Tab.Screen name={'Home'} component ={Home}/>

        </Tab.Navigator>
    </NavigationContainer>
    <View>
      <Text>Home</Text>
    </View>
        </Screen>
  )
}

const styles = StyleSheet.create({})