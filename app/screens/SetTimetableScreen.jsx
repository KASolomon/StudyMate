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

export default function SetTimetableScreen({ navigation }) {
  //form initializations
  const { control, handleSubmit, setValue } = useForm();
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
  const [showPicker1, setShowPicker1] = useState({
    monday: [false],
    tuesday: [false],
    wednesday: [false],
    thursday: [false],
    friday: [false],
    saturday: [false],
    sunday: [false],
  });
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
          const oldUser = JSON.stringify(true);
          await AsyncStorage.setItem("olduser", oldUser);

    navigation.navigate("Home");
    console.log(values);
    //display a checkmark animation
  };

  const onChangeDateTime = (selectedTime, name) => {
    const date = new Date(selectedTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours <= 9 ? "0" + hours : hours}:${
      minutes <= 9 ? "0" + minutes : minutes
    }`;
    setValue(name, time);
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
                        onPress={() => {
                          let showPickerobject = { ...showPicker1 };
                          showPickerobject.monday[index] = true;

                          setShowPicker1(showPickerobject);
                        }}
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
                            value={onChangeDateTime(
                              value,
                              `monday.${index}.timeString`
                            )}
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
                      {showPicker1.monday[index] && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={value}
                          mode={"time"}
                          is24Hour={true}
                          onChange={(event, selectedTime) => {
                            let showPickerobject = { ...showPicker1 };
                            showPickerobject.monday[index] = false;

                            setShowPicker1(showPickerobject);
                            // setShowPicker1(false);
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
            color={"white"}
            title={"+"}
            style={{
              width: "20%",
              borderRadius: 50,
              borderColor: "black",
              borderWidth: 3,
            }}
            textStyle={{ color: "black", fontSize: 25 }}
            onPress={() => {
              appendmonday({ course: "", time: new Date(), timeString: "" });

              let showPickerobject = { ...showPicker1 };
              showPickerobject.monday[mondayfields.length - 1] = false;

              setShowPicker1(showPickerobject);
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
                            value={onChangeDateTime(
                              value,
                              `tuesday.${index}.timeString`
                            )}
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
            color={"white"}
            title={"+"}
            style={{
              width: "20%",
              borderRadius: 50,
              borderColor: "black",
              borderWidth: 3,
            }}
            textStyle={{ color: "black", fontSize: 25 }}
            onPress={() => {
              appendtuesday({ course: "", time: new Date(), timeString: "" });
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
                            value={onChangeDateTime(
                              value,
                              `wednesday.${index}.timeString`
                            )}
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
            color={"white"}
            title={"+"}
            style={{
              width: "20%",
              borderRadius: 50,
              borderColor: "black",
              borderWidth: 3,
            }}
            textStyle={{ color: "black", fontSize: 25 }}
            onPress={() => {
              appendwednesday({ course: "", time: new Date(), timeString: "" });
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
                            value={onChangeDateTime(
                              value,
                              `thursday.${index}.timeString`
                            )}
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
            color={"white"}
            title={"+"}
            style={{
              width: "20%",
              borderRadius: 50,
              borderColor: "black",
              borderWidth: 3,
            }}
            textStyle={{ color: "black", fontSize: 25 }}
            onPress={() => {
              appendthursday({ course: "", time: new Date(), timeString: "" });
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
                            value={onChangeDateTime(
                              value,
                              `friday.${index}.timeString`
                            )}
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
            color={"white"}
            title={"+"}
            style={{
              width: "20%",
              borderRadius: 50,
              borderColor: "black",
              borderWidth: 3,
            }}
            textStyle={{ color: "black", fontSize: 25 }}
            onPress={() => {
              appendfriday({ course: "", time: new Date(), timeString: "" });
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
                            value={onChangeDateTime(
                              value,
                              `saturday.${index}.timeString`
                            )}
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
            color={"white"}
            title={"+"}
            style={{
              width: "20%",
              borderRadius: 50,
              borderColor: "black",
              borderWidth: 3,
            }}
            textStyle={{ color: "black", fontSize: 25 }}
            onPress={() => {
              appendsaturday({ course: "", time: new Date(), timeString: "" });
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
                            value={onChangeDateTime(
                              value,
                              `sunday.${index}.timeString`
                            )}
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
            color={"white"}
            title={"+"}
            style={{
              width: "20%",
              borderRadius: 50,
              borderColor: "black",
              borderWidth: 3,
            }}
            textStyle={{ color: "black", fontSize: 25 }}
            onPress={() => {
              appendsunday({ course: "", time: new Date(), timeString: "" });
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
    backgroundColor: "#ccc",
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
