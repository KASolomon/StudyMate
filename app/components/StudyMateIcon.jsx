import React from 'react';
import { StyleSheet } from 'react-native';
import colors from '../config/colors';
import Icon from './Icon';

export default function StudyMateIcon() {
  return (
    <Icon
      iconName={"book-open-page-variant-outline"}
      style={styles.logo}
      size={35}
      color={colors.secondary}
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    padding: 20,
    marginBottom: 20,
    backgroundColor: colors.primary,
    borderRadius: 50,
    alignSelf: "center",
  },
});