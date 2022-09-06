import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import LottieView from 'lottie-react-native';

export default function ActivityIndicator({visible}) {

   return visible ? (
     <LottieView
       style={{
         flex: 1,

         justifyContent: 'center',
         alignSelf : 'center'
       }}
       autoPlay
       loop
       source={require("./lottie_infinityloader.json")}
     />
   ) : null;
 
}

