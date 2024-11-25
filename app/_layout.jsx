import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {Stack} from "expo-router";
import { ToastProvider } from 'react-native-toast-notifications';
import { ThemeProvider } from '../components/theme/ThemeContext';



const Root_layout = () => {
  return (
    <ThemeProvider>
    <ToastProvider>
      
        <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name='index' />
        <Stack.Screen name='(location)/location' />
        <Stack.Screen name='(event)/event' />
        <Stack.Screen name='(tab)' />
        <Stack.Screen name='(booking)/booking' />
        <Stack.Screen name='(profile)' />
        <Stack.Screen name='(allEventList)' />
        <Stack.Screen name='(notification)/notification' />


      
        </Stack>
        </ToastProvider>
        </ThemeProvider>
  )
}

export default Root_layout;

const styles = StyleSheet.create({})