import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useFieldArray, Controller } from "react-hook-form";
import { Select, Input, Box } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";

import AppButton from "../components/AppButton";
import Screen from "../components/Screen";
import Icon from "../components/Icon";

export default function TestingSelect() {
  const { control, handleSubmit, watch } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: "monday" });
  const [time, setTime] = useState(new Date());
  const [timeString, setTimeString] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const handleFormSubmit = (values) => {
    console.log(values);
  };
  const onChangeDateTime = (selectedTime) => {
    const date = new Date(selectedTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours <= 9 ? "0" + hours : hours}:${
      minutes <= 9 ? "0" + minutes : minutes
    }`;

    //  setShowPicker(false);
    //  setTime(selectedTime);
    //  setTimeString(time)
    return time;
  };
  const coursenames = ["Data", "Structures", "Mini", "Project"];

  return (
    <Screen>
      {fields.map((field, index) => {
        const timeUTC = watch(`monday.${index}.time`);
        return (
          <Box key={field.id} flexDir={'row'}>
            <Controller
              control={control}
              name={`monday.${index}.course`}
              render={({ field: { value, onChange } }) => (
                <Select
                  key={field.id}
                  selectedValue={value}
                  onValueChange={onChange}
                  width ={'65%'}
                >
                  {coursenames.map((course, index) => (
                    <Select.Item label={course} value={course} key={index} />
                  ))}
                </Select>
              )}
            />

            <Controller
              name={`monday.${index}.time`}
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <TouchableWithoutFeedback onPress={() => setShowPicker(true)} width ={'20%'}>
                    <View
                      style={{
                        width: "20%",
                        flexDirection: "row",
                        marginLeft: 8,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Input
                        value={onChangeDateTime(value)}
                        variant="underlined"
                        isReadOnly={true}
                        w={"50%"}
                        fontSize={14}
                        p={0}
                        style={{ alignSelf: "baseline" }}
                      />

                      <Icon
                        iconName={"clock-outline"}
                        size={29}
                        style={{ alignSelf: "center" }}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                  {showPicker && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={value}
                      mode={"time"}
                      is24Hour={true}
                      onChange={(event, selectedTime) => {
                        setShowPicker(false);
                        onChange(selectedTime);
                      }}
                    />
                  )}
                </>
              )}
            />
          </Box>
        );
      })}
      <AppButton
        color={"green"}
        title={"+"}
        style={{ width: "30%" }}
        onPress={() => {
          append({ course: "", time: new Date() });
          console.log(fields);
        }}
      />
      <AppButton
        color={"black"}
        title={"Submit"}
        style={{ width: "30%" }}
        onPress={handleSubmit(handleFormSubmit)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});
