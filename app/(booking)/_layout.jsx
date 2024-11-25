import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from "expo-router";
import { ToastProvider } from 'react-native-toast-notifications';
import * as Linking from 'expo-linking';
import { StripeProvider } from "@stripe/stripe-react-native";



const Root_layout = () => {
    return (
        <ToastProvider>
            <Stack screenOptions={{ headerShown: false }}>

                <Stack.Screen name='eventDetail' />
                <Stack.Screen name='eventBooking' />
                <StripeProvider publishableKey="pk_test_51QA30s01ibCFPc6haCv7y1wHgPQWNHslTzBAKfEJKjX1ndYx8KlG1fKCX1hDnHtFXRxVZWgbpt6OCpfZTf8dQ3Go00cpYDd0PV">

                <Stack.Screen name='paymentBooking' />
                </StripeProvider>
                <Stack.Screen name='successPage' />

                <Stack.Screen name='paymentSuccessfully' />








            </Stack>
        </ToastProvider>
    )
}

export default Root_layout;

const styles = StyleSheet.create({})