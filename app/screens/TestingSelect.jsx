import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Box, Button, Input, Select } from "native-base";
import React, { useState, useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Icon from "../components/Icon";
import Screen from "../components/Screen";
import StudyMateIcon from "../components/StudyMateIcon";
import font from "../config/font";

export default function TestingSelect() {
  //form initializations
  const { control, handleSubmit } = useForm();
  const {
    fields: mondayfields,
    append: appendmonday,
    remove: removemonday,
  } = useFieldArray({ control, name: "monday" });
  const {
    fields: tuesdayfields,
    append: appendtuesday,
    remove: removetuesday,
  } = useFieldArray({ control, name: "tuesday" });
  const {
    fields: wednesdayfields,
    append: appendwednesday,
    remove: removewednesday,
  } = useFieldArray({ control, name: "wednesday" });
  const {
    fields: thursdayfields,
    append: appendthursday,
    remove: removethursday,
  } = useFieldArray({ control, name: "thursday" });
  const {
    fields: fridayfields,
    append: appendfriday,
    remove: removefriday,
  } = useFieldArray({ control, name: "friday" });
  const {
    fields: saturdayfields,
    append: appendsaturday,
    remove: removesaturday,
  } = useFieldArray({ control, name: "saturday" });
  const {
    fields: sundayfields,
    append: appendsunday,
    remove: removesunday,
  } = useFieldArray({ control, name: "sunday" });

  //state variables
  const [showPicker, setShowPicker] = useState(false);
  const [showPicker1, setShowPicker1] = useState(false);
  const [storedCourse, setStoredCourse] = useState([]);

  //predefined functions
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
    const timetableData = JSON.stringify(values);
    await AsyncStorage.setItem("timetable", timetableData);
  };
  const onChangeDateTime = (selectedTime) => {
    const date = new Date(selectedTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours <= 9 ? "0" + hours : hours}:${
      minutes <= 9 ? "0" + minutes : minutes
    }`;
    return time;
  };
  const coursenames = ["Data", "Structures", "Mini", "Project"];

  useEffect(() => {
    getCourseNames();
  }, []);

  return (
    <Screen>
      <StudyMateIcon
        caption={
          "Lets get you a timetable. Tell us when you study, we'll remind you when its due"
        }
      />
      <ScrollView horizontal={true}>
        <Box style={styles.timetableContainer}>
          <AppText style={styles.header}>Monday</AppText>

          {mondayfields.map((field, index) => {
            return (
              <Box key={field.id} flexDir={"row"} mb={1} p={5}>
                <Controller
                  control={control}
                  name={`monday.${index}.course`}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      key={field.id}
                      selectedValue={value}
                      placeholder={"Course"}
                      fontSize={font.md}
                      onValueChange={onChange}
                      maxWidth={"60%"}
                      minWidth={"80%"}
                      mr={-8}
                    >
                      {storedCourse.map((course, index) => (
                        <Select.Item
                          label={course}
                          value={course}
                          key={index}
                        />
                      ))}
                    </Select>
                  )}
                />

                <Controller
                  name={`monday.${index}.time`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <TouchableWithoutFeedback
                        onPress={() => setShowPicker(true)}
                      >
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
                            w={"60%"}
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

                <Button
                  onPress={() => {
                    removemonday(index);
                  }}
                  bgColor={"red.700"}
                  ml={2}
                  // maxH={"70%"}
                >
                  -
                </Button>
              </Box>
            );
          })}
          <AppButton
            color={"green"}
            title={"+"}
            style={{ width: "20%", borderRadius: 0 }}
            onPress={() => {
              appendmonday({ course: "", time: new Date() });
            }}
          />
        </Box>
        <Box style={styles.timetableContainer}>
          <AppText style={styles.header}>Tuesday</AppText>

          {tuesdayfields.map((field, index) => {
            return (
              <Box key={field.id} flexDir={"row"} mb={1} p={5}>
                <Controller
                  control={control}
                  name={`tuesday.${index}.course`}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      key={field.id}
                      selectedValue={value}
                      placeholder={"Course"}
                      fontSize={font.md}
                      onValueChange={onChange}
                      maxWidth={"60%"}
                      minWidth={"80%"}
                      mr={-8}
                    >
                      {coursenames.map((course, index) => (
                        <Select.Item
                          label={course}
                          value={course}
                          key={index}
                        />
                      ))}
                    </Select>
                  )}
                />

                <Controller
                  name={`tuesday.${index}.time`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <TouchableWithoutFeedback
                        onPress={() => setShowPicker(true)}
                      >
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
                            w={"60%"}
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

                <Button
                  onPress={() => {
                    removetuesday(index);
                  }}
                  bgColor={"red.700"}
                  ml={2}
                  // maxH={"70%"}
                >
                  -
                </Button>
              </Box>
            );
          })}
          <AppButton
            color={"green"}
            title={"+"}
            style={{ width: "20%", borderRadius: 0 }}
            onPress={() => {
              appendtuesday({ course: "", time: new Date() });
            }}
          />
        </Box>
        <Box style={styles.timetableContainer}>
          <AppText style={styles.header}>Wednesday</AppText>

          {wednesdayfields.map((field, index) => {
            return (
              <Box key={field.id} flexDir={"row"} mb={1} p={5}>
                <Controller
                  control={control}
                  name={`wednesday.${index}.course`}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      key={field.id}
                      selectedValue={value}
                      placeholder={"Course"}
                      fontSize={font.md}
                      onValueChange={onChange}
                      maxWidth={"60%"}
                      minWidth={"80%"}
                      mr={-8}
                    >
                      {coursenames.map((course, index) => (
                        <Select.Item
                          label={course}
                          value={course}
                          key={index}
                        />
                      ))}
                    </Select>
                  )}
                />

                <Controller
                  name={`wednesday.${index}.time`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <TouchableWithoutFeedback
                        onPress={() => setShowPicker(true)}
                      >
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
                            w={"60%"}
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

                <Button
                  onPress={() => {
                    removewednesday(index);
                  }}
                  bgColor={"red.700"}
                  ml={2}
                  // maxH={"70%"}
                >
                  -
                </Button>
              </Box>
            );
          })}
          <AppButton
            color={"green"}
            title={"+"}
            style={{ width: "20%", borderRadius: 0 }}
            onPress={() => {
              appendwednesday({ course: "", time: new Date() });
            }}
          />
        </Box>
        <Box style={styles.timetableContainer}>
          <AppText style={styles.header}>Thursday</AppText>

          {thursdayfields.map((field, index) => {
            return (
              <Box key={field.id} flexDir={"row"} mb={1} p={5}>
                <Controller
                  control={control}
                  name={`thursday.${index}.course`}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      key={field.id}
                      selectedValue={value}
                      placeholder={"Course"}
                      fontSize={font.md}
                      onValueChange={onChange}
                      maxWidth={"60%"}
                      minWidth={"80%"}
                      mr={-8}
                    >
                      {coursenames.map((course, index) => (
                        <Select.Item
                          label={course}
                          value={course}
                          key={index}
                        />
                      ))}
                    </Select>
                  )}
                />

                <Controller
                  name={`thursday.${index}.time`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <TouchableWithoutFeedback
                        onPress={() => setShowPicker(true)}
                      >
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
                            w={"60%"}
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

                <Button
                  onPress={() => {
                    removethursday(index);
                  }}
                  bgColor={"red.700"}
                  ml={2}
                  // maxH={"70%"}
                >
                  -
                </Button>
              </Box>
            );
          })}
          <AppButton
            color={"green"}
            title={"+"}
            style={{ width: "20%", borderRadius: 0 }}
            onPress={() => {
              appendthursday({ course: "", time: new Date() });
            }}
          />
        </Box>
        <Box style={styles.timetableContainer}>
          <AppText style={styles.header}>Friday</AppText>

          {fridayfields.map((field, index) => {
            return (
              <Box key={field.id} flexDir={"row"} mb={1} p={5}>
                <Controller
                  control={control}
                  name={`friday.${index}.course`}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      key={field.id}
                      selectedValue={value}
                      placeholder={"Course"}
                      fontSize={font.md}
                      onValueChange={onChange}
                      maxWidth={"60%"}
                      minWidth={"80%"}
                      mr={-8}
                    >
                      {coursenames.map((course, index) => (
                        <Select.Item
                          label={course}
                          value={course}
                          key={index}
                        />
                      ))}
                    </Select>
                  )}
                />

                <Controller
                  name={`friday.${index}.time`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <TouchableWithoutFeedback
                        onPress={() => setShowPicker(true)}
                      >
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
                            w={"60%"}
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

                <Button
                  onPress={() => {
                    removefriday(index);
                  }}
                  bgColor={"red.700"}
                  ml={2}
                  // maxH={"70%"}
                >
                  -
                </Button>
              </Box>
            );
          })}
          <AppButton
            color={"green"}
            title={"+"}
            style={{ width: "20%", borderRadius: 0 }}
            onPress={() => {
              appendfriday({ course: "", time: new Date() });
            }}
          />
        </Box>
        <Box style={styles.timetableContainer}>
          <AppText style={styles.header}>Saturday</AppText>

          {saturdayfields.map((field, index) => {
            return (
              <Box key={field.id} flexDir={"row"} mb={1} p={5}>
                <Controller
                  control={control}
                  name={`saturday.${index}.course`}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      key={field.id}
                      selectedValue={value}
                      placeholder={"Course"}
                      fontSize={font.md}
                      onValueChange={onChange}
                      maxWidth={"60%"}
                      minWidth={"80%"}
                      mr={-8}
                    >
                      {coursenames.map((course, index) => (
                        <Select.Item
                          label={course}
                          value={course}
                          key={index}
                        />
                      ))}
                    </Select>
                  )}
                />

                <Controller
                  name={`saturday.${index}.time`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <TouchableWithoutFeedback
                        onPress={() => setShowPicker(true)}
                      >
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
                            w={"60%"}
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

                <Button
                  onPress={() => {
                    removesaturday(index);
                  }}
                  bgColor={"red.700"}
                  ml={2}
                  // maxH={"70%"}
                >
                  -
                </Button>
              </Box>
            );
          })}
          <AppButton
            color={"green"}
            title={"+"}
            style={{ width: "20%", borderRadius: 0 }}
            onPress={() => {
              appendsaturday({ course: "", time: new Date() });
            }}
          />
        </Box>
        <Box style={styles.timetableContainer}>
          <AppText style={styles.header}>Sunday</AppText>

          {sundayfields.map((field, index) => {
            return (
              <Box key={field.id} flexDir={"row"} mb={1} p={5}>
                <Controller
                  control={control}
                  name={`sunday.${index}.course`}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      key={field.id}
                      selectedValue={value}
                      placeholder={"Course"}
                      fontSize={font.md}
                      onValueChange={onChange}
                      maxWidth={"60%"}
                      minWidth={"80%"}
                      mr={-8}
                    >
                      {coursenames.map((course, index) => (
                        <Select.Item
                          label={course}
                          value={course}
                          key={index}
                        />
                      ))}
                    </Select>
                  )}
                />

                <Controller
                  name={`sunday.${index}.time`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <TouchableWithoutFeedback
                        onPress={() => setShowPicker(true)}
                      >
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
                            w={"60%"}
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

                <Button
                  onPress={() => {
                    removesunday(index);
                  }}
                  bgColor={"red.700"}
                  ml={2}
                  // maxH={"70%"}
                >
                  -
                </Button>
              </Box>
            );
          })}
          <AppButton
            color={"green"}
            title={"+"}
            style={{ width: "20%", borderRadius: 0 }}
            onPress={() => {
              appendsunday({ course: "", time: new Date() });
            }}
          />
        </Box>
      </ScrollView>
      <AppButton
        color={"black"}
        title={"Save"}
        style={{ width: "45%" }}
        onPress={handleSubmit(handleFormSubmit)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  timetableContainer: {
    backgroundColor: "gray",
    width: 350,
    height: "auto",
    marginRight: 10,
    borderRadius: 25,
  },
  header: {
    textAlign: "center",
    marginTop: 5,
  },
});
