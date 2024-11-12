import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from "expo-router";
import { ToastProvider } from 'react-native-toast-notifications';



const Root_layout = () => {
  return (
    <ToastProvider>
    <Stack screenOptions={{ headerShown: false }}>
      
        <Stack.Screen name='login' />
        <Stack.Screen name='signup' />

        <Stack.Screen name='forgotpassword' />
        <Stack.Screen name='verifyotp' />
        <Stack.Screen name='resetpassword' />


      




    </Stack>
    </ToastProvider>
  )
}

export default Root_layout;

const styles = StyleSheet.create({})