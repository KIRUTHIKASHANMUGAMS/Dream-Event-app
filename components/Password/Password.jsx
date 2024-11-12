import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useContext } from 'react';
import Open from "../../assets/images/eye-open.svg";
import { Image } from 'expo-image';


const Close = () => (
    <Image source={require("../../assets/images/eye-close.png")} style={styles.icon} />
  );

const Password = ({ label, passwordVisible, setPasswordVisible, placeholder, keyboardType, Icon }) => {
    const placeholderColor = '#505050';
    const togglePasswordVisible = () => {
        setPasswordVisible(!passwordVisible);
    };
    return (
        <View style={styles.inputBox}>
            {label && <Text style={[styles.label, { color: "#000000" }]}>{label}</Text>}
            <View style={styles.inputWrapper}>
                {Icon && <Icon style={styles.icon} />}
                <TextInput
                    style={[styles.passwordInput, { color: "#000000", backgroundColor:  "#000000", borderColor: 'rgba(255, 255, 255, 0.08)' }]}
                    placeholderTextColor={placeholderColor}
                    placeholder={placeholder}
                    secureTextEntry={!passwordVisible}
                    keyboardType={keyboardType}
                />
                <TouchableOpacity style={styles.box}>
                    <TouchableOpacity style={styles.eye} onPress={togglePasswordVisible}>
                        {passwordVisible ? ( <Open />) : (<Close />)}
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Password;

const styles = StyleSheet.create({
    inputBox: {
        gap: 10,
    },
    label: {
        fontSize: 14,
        lineHeight: 24,
        color: '#121212',
        textTransform: 'capitalize',
    },
    inputWrapper: {

    },
    passwordInput: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        paddingLeft: 40,
        paddingRight: 45,
        borderRadius: 6,
        backgroundColor: '#f6f6f6',
        borderColor: 'transparent',
        borderWidth: 1,
        position: 'relative',
    },
    box: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        height: '100%',
        width: '17%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    eye: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    icon: {
        position: 'absolute',
        left: 10,
        bottom: 19,
        zIndex: 100,
        pointerEvents: 'none',
    },
});
