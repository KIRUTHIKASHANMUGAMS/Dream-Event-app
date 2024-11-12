import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from "expo-router";
import { ToastProvider } from 'react-native-toast-notifications';



const Root_layout = () => {
  return (
    <ToastProvider>
    <Stack screenOptions={{ headerShown: false }}>
      
        <Stack.Screen name='eventList' />
      


      




    </Stack>
    </ToastProvider>
  )
}

export default Root_layout;

const styles = StyleSheet.create({})