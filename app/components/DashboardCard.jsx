import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Box } from "native-base";
import AppText from "./../components/AppText";
import Icon from "../components/Icon";

export default function DashboardCard({ iconName, iconColor, cardContent, headerTitle, headerTitleColor = 'white' }) {
  return (
    <Box style={styles.dashboardCard}>
      <Box style={styles.cardHeader}>
        <Icon
          iconName={iconName}
          size={50}
          color={iconColor}
          style={styles.headerIcon}
        />
        <AppText style={{ color: `${headerTitleColor}` }}>
          {headerTitle}
        </AppText>
      </Box>
      <Box p={5} justifyContent={"center"}>
        <AppText style={styles.cardContent}>{cardContent}</AppText>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  dashboardCard: {
    borderStyle: "solid",
    borderWidth: 0.5,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: "black",
    borderRadius: 25,
    marginVertical: 10,
  },
  cardHeader: {
    flexDirection: "row",
    marginBottom: 4,
    alignItems: "center",
    backgroundColor: "black",
    borderColor: "black",
    borderRightWidth: 3,
    borderRadius: 25,
    padding : 4
  },
  cardContent: {
    fontStyle: "italic",
    fontSize: 20,
    marginLeft: 15,
    flexWrap: "wrap",
  },
  headerIcon: { marginHorizontal: 10 },
});