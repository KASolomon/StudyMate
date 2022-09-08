import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import DataTable, { COL_TYPES } from "react-native-datatable-component";

export default function DataTabl({ data }) {
  return (
    <DataTable
      data={data}
      colNames={["course", "credit", "score"]}
      colSettings={[
        { name: "course", type: COL_TYPES.STRING, width: "70%" },
        { name: "credit", type: COL_TYPES.INT, width: "15%" },
        { name: "score", type: COL_TYPES.INT, width: "15%" },
      ]}
      noOfPages={1}
      headerLabelStyle={{ color: "grey", fontSize: 12 }}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "gray",
    justifyContent: "center",
  },
});
