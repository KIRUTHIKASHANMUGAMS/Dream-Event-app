import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Image } from 'expo-image';
import arrow from "../../assets/images/arrow.svg";
import emailIcon from "../../assets/images/email.png";
import lockIcon from "../../assets/images/Lock.png";
import Profile from "../../assets/images/profile-icon.png";
import Open from "../../assets/images/eye-open.svg";
import Close from "../../assets/images/eye-close.png";
import icon from "../../assets/images/icon-dream.png";
import Button from '../../components/Button/Button';
import { router } from 'expo-router';
import { registerUser } from "../../components/api/authApi";
import { useToast } from "react-native-toast-notifications";
import { useTheme } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

const EmailIcon = () => <Image source={emailIcon} style={styles.icon} />;
const LockIcon = () => <Image source={lockIcon} style={styles.icon} />;
const ProfileIcon = () => <Image source={Profile} style={styles.icon} />;

const Signup = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmpasswordVisible, setConfirmPasswordVisible] = useState(false);
    const toast = useToast();
    const [user, setUser] = useState({
        userName: '',
        email: '',
        password: '',
        confirmpassword: '',
    });
    const [errors, setErrors] = useState({});
    const { isDarkMode } = useTheme();


    const togglePasswordVisible = () => setPasswordVisible(!passwordVisible);
    const toggleConfirmPasswordVisible = () => setConfirmPasswordVisible(!confirmpasswordVisible);

    const handleChange = (name, value) => {
        setUser({ ...user, [name]: value });
    };

    const validateForm = () => {
        let errors = {};
        const { userName, email, password, confirmpassword } = user;

        if (!userName) {
            errors.userName = 'Username is required.';
        }
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

    const handleSignup = async () => {
        if (!validateForm()) return;

        const { userName, email, password } = user;
        const data = { userName, email, password };

        try {
            const response = await registerUser(data);
            toast.show(response.message || 'Registration successful!', {
                type: 'success',
                placement: 'bottom',
                duration: 3000,
                animationType: 'slide-in',
            });
            router.push("/login");
        } catch (err) {
            const errorMessage = err.message || 'Registration failed.';
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
            <View style={styles.iconContainer}>
                <Icon name="chevron-back" size={24} color={isDarkMode ? 'rgba(255, 255, 255, 1)' : '#000000'} style={styles.arrowIcon} />
                <Image source={icon} style={styles.centerIcon} />
            </View>
            <Text style={[styles.title, isDarkMode && styles.darkTitle]}>SignUp</Text>
            <Text style={[styles.subtitle, isDarkMode && styles.darkSubtitle]}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
            </Text>

            <View style={styles.inputContainer}>
                <View style={styles.inputBox}>
                    <ProfileIcon />
                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        onChangeText={(text) => handleChange('userName', text)}
                        placeholderTextColor="rgba(128,128,128,1)"
                    />
                </View>
                {errors.userName && <Text style={styles.error}>{errors.userName}</Text>}

                <View style={styles.inputBox}>
                    <EmailIcon />
                    <TextInput
                        style={styles.input}
                        placeholder="abc@email.com"
                        onChangeText={(text) => handleChange('email', text)}
                        placeholderTextColor="rgba(128,128,128,1)"
                        keyboardType="email-address"
                    />
                </View>
                {errors.email && <Text style={styles.error}>{errors.email}</Text>}

                <View style={styles.inputBox}>
                    <LockIcon />
                    <TextInput
                        style={styles.input}
                        placeholder="Your password"
                        onChangeText={(text) => handleChange('password', text)}
                        placeholderTextColor="rgba(128,128,128,1)"
                        secureTextEntry={!passwordVisible}
                    />
                    <TouchableOpacity onPress={togglePasswordVisible} style={styles.eyeIcon}>
                        <Image source={passwordVisible ? Open : Close} style={styles.eyeImage} />
                    </TouchableOpacity>
                </View>
                {errors.password && <Text style={styles.error}>{errors.password}</Text>}

                <View style={styles.inputBox}>
                    <LockIcon />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm password"
                        onChangeText={(text) => handleChange('confirmpassword', text)}
                        placeholderTextColor="rgba(128,128,128,1)"
                        secureTextEntry={!confirmpasswordVisible}
                    />
                    <TouchableOpacity onPress={toggleConfirmPasswordVisible} style={styles.eyeIcon}>
                        <Image source={confirmpasswordVisible ? Open : Close} style={styles.eyeImage} />
                    </TouchableOpacity>
                </View>
                {errors.confirmpassword && <Text style={styles.error}>{errors.confirmpassword}</Text>}
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    buttonText="Sign Up"
                    backgroundColor="rgba(246,176,39,1)"
                    textColor="#000000"
                    lineHeight="28"
                    fontFamily="Outfit_600SemiBold"
                    fontWeight="600"
                    borderRadius={8}
                    width='100%'
                    onPress={handleSignup}
                />
                <Text style={[styles.registerText, isDarkMode && styles.darkTitle]}>
                    Already have an account? <Text onPress={() => router.push("/login")} style={styles.registerLink}>Sign In</Text>
                </Text>

            </View>
        </ScrollView>
    );
};

export default Signup;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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
        alignItems: "center",
        alignContent: 'center',
        justifyContent: "center",
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
        fontSize: 14,
        marginBottom: 12,
    },
});
