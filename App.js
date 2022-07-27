import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './app/screens/WelcomeScreen';
import ProgrammeScreen from './app/screens/ProgrammeScreen';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <WelcomeScreen/> */}
      <ProgrammeScreen/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
