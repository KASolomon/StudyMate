import React from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";
import AppButton from "../components/AppButton";
import Screen from "../components/Screen";
import StudyMateIcon from "../components/StudyMateIcon";

function WelcomeScreen({navigation}) {
  return (
    // <ImageBackground
    //   blurRadius={10}
    //   style={styles.background}
    //   source={require("../assets/background.jpg")}
    // >
    //   <View style={styles.logoContainer}>
    //     <Image style={styles.logo} source={require("../assets/logo-red.png")} />
    //     <Text style={styles.tagline}>Study Mate</Text>
    //   </View>
    //   <View style={styles.buttonsContainer}>
    //     <AppButton title="Register" color="secondary" />
    //   </View>
    // </ImageBackground>
    <View style = {styles.container}>

      <StudyMateIcon caption={'Welcome to Study Mate.'}/>
      <AppButton title="Get Started" onPress = {()=> navigation.navigate('ProgrammeScreen')} color={'black'} iName={'login'} iColor ={'white'} iSize ={24} />
    </View>
  );
}

const styles = StyleSheet.create({
  container :{
    flex : 1,
    justifyContent : "center",
    alignItems : 'center'
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  tagline: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20,
  },
});

export default WelcomeScreen;
