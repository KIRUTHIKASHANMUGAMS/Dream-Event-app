import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Onboard from "../components/Screen/onboard";
import { StripeProvider } from "@stripe/stripe-react-native";


const StartingFile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StripeProvider publishableKey="pk_test_51QA30s01ibCFPc6haCv7y1wHgPQWNHslTzBAKfEJKjX1ndYx8KlG1fKCX1hDnHtFXRxVZWgbpt6OCpfZTf8dQ3Go00cpYDd0PV">


        <Onboard />
      </StripeProvider>

    </SafeAreaView>
  );
};

export default StartingFile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
