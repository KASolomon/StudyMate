import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppText from './AppText'
import { Box } from 'native-base'
import Icon from './Icon'

export default function ErrorMessage({error}) {
  return (
  (error) ?
  <Box p ={1} mb ={5} borderRadius ={50}   flexDir ="row">
    <Icon iconName={"information-outline"} size ={20} color ='red'/>
    <AppText style = {styles.message}>{error.message}</AppText>
  </Box>
   
   : null
  )
}

const styles = StyleSheet.create({
    message :{
        color : 'red',
        // marginVertical : 10,
        marginHorizontal : 5,
        fontStyle : 'italic'
    }
})