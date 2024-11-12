import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from "expo-router";
import { ToastProvider } from 'react-native-toast-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';



const Root_layout = () => {
    return (
        <ToastProvider>
            <Stack screenOptions={{ headerShown: false }}>

                <Stack.Screen name='eventDetail' />
                <Stack.Screen name='eventBooking' />
                <Stack.Screen name='paymentBooking' />
                <Stack.Screen name='paymentSuccessfully' />








            </Stack>
        </ToastProvider>
    )
}

export default Root_layout;

const styles = StyleSheet.create({})