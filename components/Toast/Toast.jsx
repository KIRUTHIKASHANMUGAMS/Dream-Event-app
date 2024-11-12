// CustomToast.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomToast = ({ message, success }) => {
    return (
        <View style={[styles.toastContainer, success ? styles.success : styles.error]}>
            <Text style={styles.toastText}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    toastContainer: {
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    success: {
        backgroundColor: 'green',
    },
    error: {
        backgroundColor: 'red',
    },
    toastText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default CustomToast;
