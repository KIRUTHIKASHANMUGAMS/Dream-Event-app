import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import arrow from "../../assets/images/arrow.svg";
import Button from '../../components/Button/Button';
import { router } from 'expo-router';
import * as Location from 'expo-location';
import { allowLocation } from '../../components/api/allowLocationApi';
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../components/theme/ThemeContext';

const AllowLocation = () => {

    const toast = useToast();
    const { isDarkMode } = useTheme();

    const handleClick = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            alert('Permission to access location was denied');
            return;
        }

        // Get the current location
        let location = await Location.getCurrentPositionAsync({});
        console.log(location); // You can use this location data as needed

        // Store the location or send it to your backend API
        const userId = await AsyncStorage.getItem('@user_id');


        const data = {
            userId,
            lat: location.coords.latitude,
            long: location.coords.longitude,
        };

        console.log(data);

        try {
            const response = await allowLocation(data);
            toast.show(response.message, {
                type: 'success',
                placement: 'bottom',
                duration: 3000,
                animationType: 'slide-in',
            });

            setTimeout(() => {
                router.push({
                    pathname: "/home",
                });
            }, 3000);

        } catch (err) {
            const errorMessage = err.message || 'Submission failed.';
            toast.show(errorMessage, {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                animationType: 'slide-in',
            });
        }
    };

    return (
        <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.darkContainer]}>
            <View style={styles.iconContainerarrow}>
                <Image source={arrow} style={styles.arrowIcon} />
            </View>

            <View style={styles.containerMain}>
                <View style={styles.iconContainer}>
                    <Image
                        source={require("../../assets/images/location.png")}
                        style={styles.locationIcon}
                    />
                </View>
                <Text style={[styles.title, isDarkMode && styles.darkTitle]}>What is Your Location</Text>
                <Text  style={[styles.subtitle, isDarkMode && styles.darkSubtitle]}>
                    We need to know your location in order to suggest nearby services.
                </Text>
                <View style={styles.secondaryButton}>
                    <Button
                        buttonText="Allow Location Access"
                        style={styles.buttonSkip}
                        backgroundColor="#F6B027"
                        borderColor="#F6B027"
                        onPress={handleClick}
                        textColor="#000000"
                        borderRadius={5}
                    />
                    <Button
                        buttonText="Enter Location Manually"
                        backgroundColor="transparent"
                        textColor={isDarkMode ? "#fff" : "#000000"}
                        lineHeight="28"
                        fontFamily="Outfit_600SemiBold"
                        fontWeight="600"
                        borderRadius={8}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default AllowLocation;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    darkContainer: {
        backgroundColor: "#000000"
    },
    darkSubtitle: {
        color: "rgba(238, 238, 238, 1)"

    },
    darkTitle: {
        color: "#fff"
    },
    containerMain: {
        justifyContent: 'center',
        flex: 1
    },
    secondaryButton: {
        gap: 30
    },
    iconContainer: {
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationIcon: {
        width: 100,
        height: 100,
    },
    arrowIcon: {
        width: 24,
        height: 24,
        position: 'absolute',
        top: 0,
        left: '0%',
    },
    title: {
        marginTop: 30,
        fontFamily: "Outfit_700Bold",
        fontSize: 30,
        lineHeight: 36,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        marginBottom: 30,
        fontSize: 14,
        lineHeight: 24,
        textAlign: 'center',
        color: 'rgba(71,71,71,1)',
    },
    iconContainerarrow: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: 20,
    },
});
