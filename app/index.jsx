import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Onboard from "../components/Screen/onboard";

const StartingFile = () => {
  return (
    <SafeAreaView style={styles.container}>

      <Onboard />

    </SafeAreaView>
  );
};

export default StartingFile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
