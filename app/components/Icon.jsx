import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Icon({iconName, size, style,...otherProps}) {
  return (
    <View style = {style}>
      <MaterialCommunityIcons
      name = {iconName}
      size= {size}
      {...otherProps}
      />
    </View>
  )
}

const styles = StyleSheet.create({})