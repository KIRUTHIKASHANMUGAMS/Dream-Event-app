import { StyleSheet, Text, View, TextInput, TouchableOpacity, Switch, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Image } from 'expo-image';
import arrow from "../../assets/images/arrow.svg";
import emailIcon from "../../assets/images/email.png";
import lockIcon from "../../assets/images/Lock.png";
import Open from "../../assets/images/eye-open.svg";
import Close from "../../assets/images/eye-close.png";
import icon from "../../assets/images/icon-dream.png";
import Button from '../../components/Button/Button';
import { router } from 'expo-router';
import { login } from "../../components/api/authApi"; // Ensure this is correctly imported
import { useToast } from "react-native-toast-notifications"; // Import toast
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../components/theme/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';


const EmailIcon = () => <Image source={emailIcon} style={styles.icon} />;
const LockIcon = () => <Image source={lockIcon} style={styles.icon} />;

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [user, setUser] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const toast = useToast(); // Initialize toast
    const { isDarkMode } = useTheme();



    const togglePasswordVisible = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSignup = () => {
        router.push("/signup");
    };

    const handleChange = (name, value) => {
        setUser({ ...user, [name]: value }); // Corrected
    };

    const handleSubmit = async () => {


         router.push("/home")


        // if (!validateForm()) return;
        // const { email, password } = user;
        // const data = { email, password };

        // try {
        //     const response = await login(data);
        //     await AsyncStorage.setItem('@user_id', response.id);
        //     await AsyncStorage.setItem('@user_token', response.token);
        //     toast.show(response.message || 'Login successfully!', {
        //         type: 'success',
        //         placement: 'bottom',
        //         duration: 3000,
        //         animationType: 'slide-in',
        //     });
        //     setTimeout(() => {
        //         router.push({
        //             pathname: "(event)/event",
        //         });
        //     }, 3000)
        // } catch (err) {
        //     const errorMessage = err.message || 'Login failed.';
        //     toast.show(errorMessage, {
        //         type: 'danger',
        //         placement: 'bottom',
        //         duration: 3000,
        //         animationType: 'slide-in',
        //     });
        // }
    };

    const handlePasswordReset = () => {
        router.push("/forgotpassword");
    };

    const validateForm = () => {
        let errors = {};
        const { email, password } = user;

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

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.darkContainer]}>
            <View style={styles.iconContainer}>
                <Icon name="chevron-back" size={24} color={isDarkMode ? 'rgba(255, 255, 255, 1)' : '#000000'} style={styles.arrowIcon} />
                <Image source={icon} style={styles.centerIcon} />
            </View>


            <Text style={[styles.title, isDarkMode && styles.darkTitle]}> Login</Text>
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
                <View style={styles.inputBox}>
                    <LockIcon />
                    <TextInput
                        style={styles.input}
                        placeholder="Your password"
                        placeholderTextColor="rgba(128,128,128,1)"
                        onChangeText={(value) => handleChange("password", value)}
                        secureTextEntry={!passwordVisible}
                    />
                    <TouchableOpacity onPress={togglePasswordVisible} style={styles.eyeIcon}>
                        <Image source={passwordVisible ? Open : Close} style={styles.eyeImage} />
                    </TouchableOpacity>
                </View>
                {errors.password && <Text style={styles.error}>{errors.password}</Text>}
            </View>

            <View style={styles.rememberMeContainer}>
                <View style={styles.rememberMeContent}>
                    <Switch
                        value={rememberMe}
                        onValueChange={setRememberMe}
                        thumbColor={rememberMe ? "rgba(246,176,39,1)" : "#f4f3f4"}
                        trackColor={{ false: "#767577", true: "rgba(246,176,39,1)" }}
                    />
                    <Text style={[styles.rememberMeText, isDarkMode && styles.darkTitle]}>Remember Me</Text>
                </View>
                <TouchableOpacity onPress={handlePasswordReset}>
                    <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    buttonText="Sign In"
                    backgroundColor="rgba(246,176,39,1)"
                    textColor="#000000"
                    lineHeight="28"
                    fontFamily="Outfit_600SemiBold"
                    fontWeight="600"
                    borderRadius={8}
                    onPress={handleSubmit}
                    width='100%'
                />
                <Text style={[styles.registerText, isDarkMode && styles.darkTitle]}>
                    Don't have an account? <Text onPress={handleSignup} style={styles.registerLink}>Register</Text>
                </Text>
            </View>
        </ScrollView>
    );
};

export default Login;

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
