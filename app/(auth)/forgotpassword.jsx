import { StyleSheet, Text, View, TextInput, TouchableOpacity, Switch, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Image } from 'expo-image';
import arrow from "../../assets/images/arrow.svg";
import emailIcon from "../../assets/images/email.png";
import icon from "../../assets/images/icon-dream.png";
import Button from '../../components/Button/Button';
import { router } from 'expo-router';
import { forgotpassword } from '../../components/api/authApi';
import { useToast } from "react-native-toast-notifications"; // Import toast

import Icon from 'react-native-vector-icons/Ionicons';

import { useTheme } from '../../components/theme/ThemeContext';

const EmailIcon = () => (
    <Image source={emailIcon} style={styles.icon} />
);


const Forgot = () => {
    const [user, setUser] = useState({ email: "" });
    const [errors, setErrors] = useState({});
    const { isDarkMode } = useTheme();

    const toast = useToast();

    const handleSubmit = async () => {
        if (!validateForm()) return;
        const { email } = user;
        const data = { email };

        try {
            const response = await forgotpassword(data);
            toast.show(response.message || 'Login successful!', {
                type: 'success',
                placement: 'bottom',
                duration: 3000,
                animationType: 'slide-in',
            });

            setTimeout(() => {
                router.push({
                    pathname: "/verifyotp",
                    params: { email }
                });
            }, 3000)

        } catch (err) {
            const errorMessage = err.message || 'Login failed.';
            toast.show(errorMessage, {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                animationType: 'slide-in',
            });
        }
    };


    const handleChange = (name, value) => {
        setUser({ ...user, [name]: value }); // Corrected
    };
    const validateForm = () => {
        let errors = {};
        const { email } = user;

        if (!email) {
            errors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid.';
        }


        setErrors(errors);
        return Object.keys(errors).length === 0;
    };


    return (
        <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.darkContainer]}>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => router.back()} style={styles.arrowIcon} >
                    <Icon name="chevron-back" size={24} color={isDarkMode ? 'rgba(255, 255, 255, 1)' : '#000000'} />
                </TouchableOpacity>
                <Image source={icon} style={styles.centerIcon} />
            </View>

            <Text style={[styles.title, isDarkMode && styles.darkTitle]}>Forgot Passoword</Text>
            <Text style={[styles.subtitle, isDarkMode && styles.darkSubtitle]}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
            </Text>

            <View style={styles.inputContainer}>
                <View style={styles.inputBox}>
                    <EmailIcon />
                    <TextInput
                        style={styles.input}
                        placeholder="abc@email.com"
                        placeholderTextColor="rgba(128,128,128,1)"
                        onChangeText={(value) => handleChange("email", value)}

                        keyboardType="email-address"
                    />
                </View>
                {errors.email && <Text style={styles.error}>{errors.email}</Text>}

            </View>



            <View style={styles.buttonContainer}>
                <Button
                    buttonText="Send OTP"
                    backgroundColor="rgba(246,176,39,1)"
                    textColor="#000000"
                    onPress={handleSubmit}
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

export default Forgot;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
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
    iconContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 20
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

    inputBox: {
        position: 'relative',
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: 'rgba(230, 230, 230, 1)',
    },
    input: {
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        color: 'rgba(128,128,128,1)',
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
        height: 60,
        top: 20

    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: 19,
    },
    eyeImage: {
        width: 20,
        height: 20,
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
    },
    rememberMeContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rememberMeText: {
        marginLeft: 8,
        color: '#000',
    },
    forgotPasswordText: {
        color: 'rgba(246,176,39,1)',
    },
    registerText: {
        textAlign: 'center',
        color: '#000',
        fontSize: 14,
        lineHeight: 24,
        fontFamily: "Outfit_600SemiBold",
    },
    registerLink: {
        color: 'rgba(246,176,39,1)',
        fontWeight: 'bold',
    },
    icon: {
        position: 'absolute',
        left: 10,
        top: 12,
        width: 20,
        height: 20,
    },
    error: {
        color: 'red',
        fontSize: 14,
        marginBottom: 12,
    },
});
