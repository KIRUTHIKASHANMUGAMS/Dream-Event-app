import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import onboard from "../../assets/images/onboard-4.png";
import facebook from "../../assets/images/Facebook-logo.svg";
import apple from "../../assets/images/Apple-logo.svg";
import google from "../../assets/images/Google-logo.svg";
import { Image } from 'expo-image';
import Button from '../../components/Button/Button';
import { router } from "expo-router";

const Onboard = () => {
    
  const handleCreateAccountPress = () => {
    router.push('/login');
  };
    return (
        <View style={styles.container}>
            <Image source={onboard} style={styles.image} />
            <View style={styles.overlay}>
                <Text style={styles.heading}>Welcome Back</Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Image source={facebook} style={styles.icon} />
                        <Text style={styles.buttonText}>Continue with Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Image source={google} style={styles.icon} />
                        <Text style={styles.buttonText}>Continue with Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Image source={apple} style={styles.icon} />
                        <Text style={styles.buttonText}>Continue with Apple</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.separatorContainer}>
                    <View style={styles.separator} />
                    <Text style={styles.orText}>OR</Text>
                    <View style={styles.separator} />
                </View>

                <View style={styles.buttonContainer}>
                    <Button

                        buttonText="Login With Email"
                        backgroundColor="#F6B027"
                        textColor="#000000"
                        onPress={handleCreateAccountPress}

                        lineHeight="28"
                        fontFamily="Outfit_600SemiBold"
                        fontWeight="600"
                        borderRadius={8}
                        width='100%'
                    />
                </View>

                <View style={styles.buttonContainerRegister}>
                    <Text style={styles.account}>Don’t have an account? </Text>
                    <TouchableOpacity>
                        <Text style={styles.register}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default Onboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end', // Align content to the bottom
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    image: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    overlay: {
        flex: 1,
        justifyContent: 'flex-end', // Align content to the bottom
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        paddingBottom: 40, // Add padding to the bottom
    },
    heading: {
        fontFamily: "Outfit_800ExtraBold",
        fontSize: 30,
        lineHeight: 40,
        color: '#F5F6F8',
        marginBottom: 20,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: "center",
        marginBottom: 10, // Adjust for spacing
    },
    button: {
        backgroundColor: "rgba(255, 255, 255, 0.102)",
        paddingVertical: 15,
        borderRadius: 12,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 20, // Added vertical margin for spacing
    },
    separator: {
        flex: 1,
        borderColor: '#ffffff',
        borderStyle: "dotted",
        borderWidth: 1,
        marginHorizontal: 10,
    },
    orText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 12,
    },
    account: {
        fontSize: 14,
        lineHeight: 24,
        color: '#F5F6F8',
        fontFamily: "Outfit_600SemiBold",
    },
    buttonContainerRegister: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    register: {
        textDecorationLine: 'none',
        color: "#F6B027",
        fontSize: 14,
        lineHeight: 24,
        marginLeft: 5, 
        fontFamily: "Outfit_600SemiBold",
    },
});
