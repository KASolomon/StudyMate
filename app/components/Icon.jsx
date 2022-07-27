import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Icon({iconName, ...otherProps}) {
  return (
    <View>
      <MaterialCommunityIcons
      name = {iconName}
      {...otherProps}
      />
    </View>
  )
}

const styles = StyleSheet.create({})