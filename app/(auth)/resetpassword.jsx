import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Image } from 'expo-image';
import arrow from "../../assets/images/arrow.svg";
import lockIcon from "../../assets/images/Lock.png";
import Open from "../../assets/images/eye-open.svg";
import Close from "../../assets/images/eye-close.png";
import icon from "../../assets/images/icon-dream.png";
import Button from '../../components/Button/Button';
import { router } from 'expo-router';
import { resetpassword } from '../../components/api/authApi';
import { useToast } from "react-native-toast-notifications";
import Icon from 'react-native-vector-icons/Ionicons';

import { useTheme } from '../../components/theme/ThemeContext';

const LockIcon = () => (
    <Image source={lockIcon} style={styles.icon} />
);

const Resetpassword = () => {
    const toast = useToast();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const { email } = route.params || {};

    const { isDarkMode } = useTheme();
    const [user, setUser] = useState({
        email: '', // Add email field
        password: '',
        confirmpassword: '',
    });

    const togglePasswordVisible = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleInputChange = (name, value) => {
        setUser({ ...user, [name]: value });
    };

    useEffect(() => {
        if (email) {
            setUser((prevUser) => ({ ...prevUser, email })); // Set the email in user state
        }
        console.log('Received email:', email);
    }, [email]);

    const handlerest = async () => {
        console.log("hai")
        if (!validateForm()) return;

        const { email, password } = user;
        const data = { email, password };
        console.log(data)

        try {
            const response = await resetpassword(data);
            toast.show(response.message || 'Password reset successful!', {
                type: 'success',
                placement: 'bottom',
                duration: 3000,
                animationType: 'slide-in',
            });
            router.push("/login");
        } catch (err) {
            const errorMessage = err.message || 'Password reset failed.';
            toast.show(errorMessage, {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                animationType: 'slide-in',
            });
        }
    };

    const validateForm = () => {
        let errors = {};
        const { email, password, confirmpassword } = user;

        if (!email) {
            errors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid.';
        }
        if (!password) {
            errors.password = 'Password is required.';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters.';
        }
        if (password !== confirmpassword) {
            errors.confirmpassword = 'Passwords do not match.';
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
            <Text style={[styles.title, isDarkMode && styles.darkTitle]}>Reset Password</Text>
            <Text style={[styles.subtitle, isDarkMode && styles.darkSubtitle]}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
            </Text>

            <View style={styles.inputContainer}>
                <View style={styles.inputBox}>
                    <LockIcon />
                    <TextInput
                        style={styles.input}
                        placeholder="Your password"
                        placeholderTextColor="rgba(128,128,128,1)"
                        secureTextEntry={!passwordVisible}
                        onChangeText={(text) => handleInputChange('password', text)}
                    />
                    <TouchableOpacity onPress={togglePasswordVisible} style={styles.eyeIcon}>
                        <Icon name={passwordVisible ? "eye-off" : "eye"} size={20} color="rgba(128,128,128,1)" />
                    </TouchableOpacity>

                </View>
                {errors.password && <Text style={styles.error}>{errors.password}</Text>}

                <View style={styles.inputBox}>
                    <LockIcon />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        placeholderTextColor="rgba(128,128,128,1)"
                        secureTextEntry={!passwordVisible}
                        onChangeText={(text) => handleInputChange('confirmpassword', text)}
                    />
                    <TouchableOpacity onPress={togglePasswordVisible} style={styles.eyeIcon}>
                        <Icon name={passwordVisible ? "eye-off" : "eye"} size={20} color="rgba(128,128,128,1)" />
                    </TouchableOpacity>

                </View>
                {errors.confirmpassword && <Text style={styles.error}>{errors.confirmpassword}</Text>}
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    buttonText="Save"
                    backgroundColor="rgba(246,176,39,1)"
                    textColor="#000000"
                    onPress={handlerest}
                    lineHeight="28"
                    fontFamily="Outfit_600SemiBold"
                    fontWeight="600"
                    borderRadius={8}
                    width='100%'
                />
                <Text style={[styles.registerText, isDarkMode && styles.darkTitle]}>
                    Don't have an account? <Text style={styles.registerLink}>Register</Text>
                </Text>
            </View>
        </ScrollView>
    );
};

export default Resetpassword;

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
        marginTop: 20

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
        top: 20,
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
        top: 19,
        width: 20,
        height: 20,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
});
