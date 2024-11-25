import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Image } from 'expo-image';
import arrow from "../../assets/images/arrow.svg";
import icon from "../../assets/images/icon-dream.png";
import Button from '../../components/Button/Button';
import { router } from 'expo-router';
import { useToast } from "react-native-toast-notifications";
import { OtpInput } from "react-native-otp-entry";
import { verifyotp } from '../../components/api/authApi';

import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../components/theme/ThemeContext';

const VerifyOtp = () => {
    const [otp, setOtp] = useState('');
    const toast = useToast();
    const [errors, setErrors] = useState({});
    const { isDarkMode } = useTheme();

    // Access email from route params
    const { email } = route.params || {};

    useEffect(() => {
        console.log('Received email:', email);
    }, [email]);

    const validateForm = () => {
        let errors = {};

        if (!otp) {
            errors.otp = 'OTP is required.';
        } else if (otp.length !== 5) {
            errors.otp = 'OTP must be 5 digits.';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleVerify = async () => {
        if (!validateForm()) return;

        const data = { email, otp };
        console.log(data);

        try {
            const response = await verifyotp(data);
            toast.show(response.message || 'Verification successful!', {
                type: 'success',
                placement: 'bottom',
                duration: 3000,
                animationType: 'slide-in',
            });
            setTimeout(() => {
                router.push({
                    pathname: "/resetpassword",
                    params: { email }
                });
            }, 3000)


        } catch (err) {
            const errorMessage = err.message || 'Verification failed.';
            toast.show(errorMessage, {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                animationType: 'slide-in',
            });
        }
    };

    const handleChange = (text) => {
        setOtp(text); // Update the OTP state directly
    };

    const handleResend = () => {
        // Logic to resend OTP
        toast.show("OTP resent!", { type: "success" });
        // You can implement your resend OTP logic here, like calling an API
    };

    return (
        <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.darkContainer]}>
            <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => router.back()} style={styles.arrowIcon} >
                    <Icon name="chevron-back" size={24} color={isDarkMode ? 'rgba(255, 255, 255, 1)' : '#000000'} />
                </TouchableOpacity>                <Image source={icon} style={styles.centerIcon} />
            </View>
            <Text style={[styles.title, isDarkMode && styles.darkTitle]}>Verification OTP</Text>
            <Text style={[styles.subtitle, isDarkMode && styles.darkSubtitle]}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
            </Text>

            <View style={styles.otpContainer}>
                <OtpInput numberOfDigits={5} onTextChange={handleChange} />
            </View>
            {errors.otp && <Text style={styles.error}>{errors.otp}</Text>}

            <Text style={[styles.registerText, isDarkMode && styles.darkTitle]}>
                Didn’t receive code?
                <Text style={styles.resendText} onPress={handleResend}> Resend Now</Text>
            </Text>
            <View style={styles.buttonContainer}>
                <Button
                    buttonText="Verify"
                    backgroundColor="rgba(246,176,39,1)"
                    textColor="#000000"
                    onPress={handleVerify}
                    lineHeight="28"
                    fontFamily="Outfit_600SemiBold"
                    fontWeight="600"
                    borderRadius={8}
                    width='100%'
                />
            </View>
        </ScrollView>
    );
};

export default VerifyOtp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    iconContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: 20,
        marginTop:20

    },
    registerText: {
        textAlign: 'center',
        color: '#000',
        fontSize: 14,
        lineHeight: 24,
        fontFamily: "Outfit_600SemiBold",
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
    title: {
        marginTop: 30,
        fontFamily: "Outfit_700Bold",
        fontSize: 30,
        lineHeight: 40,
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
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    resendText: {
        color: 'rgba(246,176,39,1)',
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "flex-end",
        gap: 10,
    },
    arrowIcon: {
        width: 24,
        height: 24,
        position: 'absolute',
        top: 20,
        left: '0%',
    },
    centerIcon: {
        width: 60,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
});
