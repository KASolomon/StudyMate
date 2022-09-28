import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Box, Input, Select } from "native-base";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  Button, StyleSheet, TouchableWithoutFeedback, View
} from "react-native";
import AppButton from "./AppButton";
import Icon from "./Icon";
import Screen from "./Screen";
import StudyMateIcon from "./StudyMateIcon";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,

//   }),
// });

// Notifications.scheduleNotificationAsync({
//   content: {
//     title: "The books are waiting 😁",
//     body: "Data Structures is up for today",
//   },
//   trigger: {
//     seconds : 2
//   },
// });

export default function AppNotification({ navigation }) {
  const [storedCourse, setStoredCourse] = useState([]);
  const [time, setTime] = useState(new Date());
  const [timeString, setTimeString] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  //form intialization variables for timetable 'form' data built with react-hook-form
  const { handleSubmit, control } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: "monday" });

  const getCourseNames = async () => {
    const semcourses = await AsyncStorage.getItem("semcourse");
    const { courses } = JSON.parse(semcourses);
    const courseNames = [];
    courses.map((semcourse) => {
      courseNames.push(semcourse.course);
    });
    setStoredCourse(courseNames);
  };
const handleFormSubmit = async (values) => {
  console.log(values)
};

  useEffect(() => {
    getCourseNames();
  }, []);
  //   console.log(course);

  const onChangeDateTime = (event, selectedTime) => {
    const date = new Date(selectedTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours <= 9 ? "0" + hours : hours}:${
      minutes <= 9 ? "0" + minutes : minutes
    }`;

    setShowPicker(false);
    setTime(currentTime);
    return time;
  };
  // console.log(time);

  return (
    <Screen style={styles.container}>
      <StudyMateIcon
        caption={
          "This would get us nowhere without a plan. Lets get you a timetable"
        }
      />
      {/* <ScrollView horizontal={true}>
        <Box style={styles.timetableContainer}>
          <AppText>Monday</AppText>
        </Box>
        <Box style={styles.timetableContainer}></Box>
        <Box style={styles.timetableContainer}></Box>
        <Box style={styles.timetableContainer}></Box>
      </ScrollView> */}
      {fields.map((field, index) => {
        <React.Fragment key={field.id}>
          <Controller
            control={control}
            name={`monday.${index}.course`}
            render={({ field: { onChange, value } }) => {
              return (
                <Select
                  placeholder="Course"
                  selectedValue={value}
                  minWidth={"50%"}
                  onValueChange={onChange}
                >
                  {storedCourse.map((course, index) => <Select.Item label={course} value={course} key={index} />
                  )}
                </Select>
              );
            }}
            rules = {{required : true}}
          />
          {/* <Controller
            control={control}
            name={`monday.${index}.time`}
            render={({ field }) => {
              return (
                <>
                  <TouchableWithoutFeedback onPress={() => setShowPicker(true)}>
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
                        value={field.value}
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
                      value={time}
                      mode={"time"}
                      is24Hour={true}
                      onChange={() => {
                        field.onChange(onChangeDateTime());
                      }}
                    />
                  )}
                </>
              );
            }}
          /> */}
          {index > 0 ? (
            <Button
              onPress={() => {
                remove(index);
              }}
              bgColor={"red.700"}
              maxH={"70%"}
            >
              -
            </Button>
          ) : null}
        </React.Fragment>;
      })}

      <AppButton
        color={"green"}
        title={"+"}
        style={{ width: "30%" }}
        onPress={() => {append({ course: "", time: "" }); console.log(fields);}}
      />
      <AppButton
        color={"black"}
        title={"submit"}
        onPress={handleSubmit(handleFormSubmit)}
      />


      <Box flexDir={"row"}>
        <Select
          placeholder="Course"
          //   w={"300%"}
          minWidth={"50%"}
          onValueChange={(value) => setCourse(value)}
        >
          {storedCourse.map((course, index) => (
            <Select.Item label={course} value={course} key={index} />
          ))}
        </Select>
        <TouchableWithoutFeedback onPress={() => setShowPicker(true)}>
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
              value={timeString}
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
            value={time}
            mode={"time"}
            is24Hour={true}
            onChange={onChangeDateTime}
          />
        )}
      </Box>
    </Screen>
  );
}

const styles = StyleSheet.create({
  timetableContainer: {
    marginRight: 5,
    height: 200,
    width: 200,
    alignSelf: "center",
    backgroundColor: "lightblue",
  },
  container: { flex: 1 },
});
