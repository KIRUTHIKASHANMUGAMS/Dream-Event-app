import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({
    minWidth,
    buttonText,
    onPress,
    backgroundColor,
    textColor,
    borderColor,
    borderRadius,
    width,
    fontsize,
    paddingHorizontal,
    paddingVertical

}) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    backgroundColor: backgroundColor || '#F6B027',
                    borderColor: borderColor || '#F6B027',
                    borderRadius: borderRadius || 10,
                    width: width || '100%',
                    minWidth: minWidth || 145,
                    paddingHorizontal:paddingHorizontal ||  15,
                    paddingVertical:paddingVertical ||10
                },
            ]}
            onPress={onPress}
        >
            <Text style={[styles.buttonText, { color: textColor || '#ffffff', fontSize: fontsize || 18 }]}>
                {buttonText}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 15, // Consistent vertical padding
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center', // Center content horizontally
        borderWidth: 1,
        flexDirection: 'row', // Allow for row layout if needed
    },
    buttonText: {
        fontSize: 18,
        lineHeight: 28,
        textAlign: 'center',
        color: '#ffffff',
        fontWeight:600,
        fontFamily:"Outfit_600SemiBold"
    },
});

export default Button;
