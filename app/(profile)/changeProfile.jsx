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
import Profile from "../../assets/images/profile-icon.png";


import healthIcon from "../../assets/images/icon-health.png";
import communityIcon from "../../assets/images/icon-community.png";
import sportsIcon from "../../assets/images/icon-sports.png";
import businessIcon from "../../assets/images/icon-business.png";
import travelIcon from "../../assets/images/icon-travel.png";
import designIcon from "../../assets/images/icon-design.png";
import musicIcon from "../../assets/images/icon-music.png";
import foodIcon from "../../assets/images/icon-food.png";
import educationIcon from "../../assets/images/icon-education.png";
import filmIcon from "../../assets/images/icon-film.png";
import gamingIcon from "../../assets/images/icon-gaming.png";







const EmailIcon = () => <Image source={emailIcon} style={styles.icon} />;
const LockIcon = () => <Image source={lockIcon} style={styles.icon} />;
const ProfileIcon = () => <Image source={Profile} style={styles.icon} />;


const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [user, setUser] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const toast = useToast(); // Initialize toast
    const [selectedEvents, setSelectedEvents] = useState([]);


    const handleToggleEvent = (value) => {
        setSelectedEvents((prevSelected) =>
            prevSelected.includes(value)
                ? prevSelected.filter((event) => event !== value) // Deselect
                : [...prevSelected, value] // Select
        );
    };


    const togglePasswordVisible = () => {
        setPasswordVisible(!passwordVisible);
    };



    const eventOptions = [
        { label: 'Health', value: 'health', icon: healthIcon },
        { label: 'Community', value: 'community', icon: communityIcon },
        { label: 'Sports', value: 'sports', icon: sportsIcon },
        { label: 'Business', value: 'business', icon: businessIcon },
        { label: 'Travel', value: 'travel', icon: travelIcon },
        { label: 'Design', value: 'design', icon: designIcon },
        { label: 'Music & Entertainment', value: 'music', icon: musicIcon },
        { label: 'Food & Drink', value: 'food', icon: foodIcon },
        { label: 'School & Education', value: 'education', icon: educationIcon },
        { label: 'Film & Media', value: 'film', icon: filmIcon },
        { label: 'Gaming', value: 'gaming', icon: gamingIcon },
    ];

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
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.iconContainer}>
                <Image source={arrow} style={styles.arrowIcon} />
                <Text style={styles.centerIcon}>Change Profile</Text>
            </View>



            <View style={styles.inputContainer}>
                <View style={styles.inputBox}>
                    <ProfileIcon />

                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        placeholderTextColor="rgba(128,128,128,1)"
                        onChangeText={(value) => handleChange("email", value)}
                        keyboardType="email-address"
                    />
                </View>
                {errors.email && <Text style={styles.error}>{errors.email}</Text>}
                <View style={styles.inputBox}>
                    <EmailIcon />
                    <TextInput
                        style={styles.input}
                        placeholder="abc@email.com"
                        placeholderTextColor="rgba(128,128,128,1)"
                        onChangeText={(value) => handleChange("password", value)}
                        secureTextEntry={!passwordVisible}
                    />

                </View>
                {errors.password && <Text style={styles.error}>{errors.password}</Text>}
            </View>

            <View style={styles.optionsContainer}>
                {eventOptions.map((option) => (
                    <TouchableOpacity
                        key={option.value}
                        style={[styles.optionButton, selectedEvents.includes(option.value) && styles.selectedOption]}
                        onPress={() => handleToggleEvent(option.value)}
                    >
                        <Image source={option.icon} style={styles.optionIcon} />
                        <Text style={styles.optionText}>{option.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>


            <View style={styles.buttonContainer}>
                <Button
                    buttonText="Save"
                    backgroundColor="rgba(246,176,39,1)"
                    textColor="#000000"
                    lineHeight="28"
                    fontFamily="Outfit_600SemiBold"
                    fontWeight="600"
                    borderRadius={8}
                    onPress={handleSubmit}
                    width='100%'
                />

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
    
    inputContainer: {
        marginTop: 30
    },
    optionButton: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        margin: 5,
        flexDirection: 'row',
      },
      selectedOption: {
        backgroundColor: '#F6B027', // Change to your desired selected color
      },
      optionIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
      },
      optionText: {
        fontSize: 16,
        color: '#333',
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
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginBottom: 20,
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
        top: 28,
        left: '0%',
    },
    centerIcon: {

        top: 20,
        fontWeight: "700",
        fontSize: 24,
        lineHeight: 34
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

