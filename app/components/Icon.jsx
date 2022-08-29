import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

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