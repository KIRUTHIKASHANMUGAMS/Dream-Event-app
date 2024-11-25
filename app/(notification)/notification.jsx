import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Clock from '../../assets/images/notification/Clock';
import Gift from '../../assets/images/notification/Gift';
import Booking from "../../assets/images/notification/Booking";
import { useTheme } from '../../components/theme/ThemeContext';
const NotificationScreen = () => {
    const { isDarkMode } = useTheme();
    return (
        <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.darkContainer]}>
            <View style={styles.iconContainerImage}>
                <Icon name="chevron-back" size={24} color={isDarkMode ? 'rgba(255, 255, 255, 1)' : '#000000'} style={styles.arrowIcon} />


                <Text style={[styles.centerIcon, isDarkMode && styles.darkText]}>Notification</Text>
            </View>

            <View style={[styles.card ,isDarkMode && styles.darkbackground]}>
                <View style={styles.iconContainer}>
                    <Clock />
                </View>
                <View style={styles.cardContent}>
                    <Text style={[styles.title, isDarkMode && styles.darkText]}>Reminder</Text>
                    <Text style={[styles.content,isDarkMode && styles.darkcontent]}>Event is starting in 22:00</Text>
                </View>
                <View style={styles.timeContainer}>
                    <Text style={[styles.time ,isDarkMode && styles.darkcontent]}>Now</Text>
                </View>
            </View>
            <View style={[styles.card ,isDarkMode && styles.darkbackground]}>
                <View style={styles.iconContainer}>
                    <Gift />
                </View>
                <View style={styles.cardContent}>
                <Text style={[styles.title, isDarkMode && styles.darkText]}>Cashback</Text>
                    <Text style={[styles.content ,isDarkMode && styles.darkcontent]}>You've Got an Cashback For the Event Booking</Text>
                </View>
                <View style={styles.timeContainer}>
                    <Text style={[styles.time ,isDarkMode  && styles.darkcontent]}>5d</Text>
                </View>
            </View>
            <View style={[styles.card ,isDarkMode && styles.darkbackground]}>
                <View style={styles.iconContainer}>
                    <Booking />
                </View>
                <View style={styles.cardContent}>
                <Text style={[styles.title, isDarkMode && styles.darkText]}>Booking</Text>
                    <Text style={[styles.content ,isDarkMode && styles.darkcontent]}>Your Ticket Is Successfully Booking!</Text>
                </View>
                <View style={styles.timeContainer}>
                    <Text style={[styles.time ,isDarkMode  && styles.darkcontent]}>1h</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    arrowIcon: {
        width: 24,
        height: 24,
        position: 'absolute',
        top: 20,
        left: '0%',
    },
    darkContainer: {
        backgroundColor: '#000000',
    },
    darkText: {
        color: "#fff"
    },
    darkbackground:{
        backgroundColor: '#404040',
        shadowColor: 'rgba(0, 0, 0, 0.5)',


    },
    darkcontent:{
        color: '#808080',

    },
    centerIcon: {

        top: 20,
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',


        marginBottom: 10,
    },
    iconContainerImage: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: 20,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backIcon: {
        position: 'absolute',
        left: 0,
    },
    headerText: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        shadowOpacity: 1,
        elevation: 5,
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconContainer: {
        backgroundColor: 'rgba(241, 241, 241, 1)',
        borderRadius: 8,
        padding: 10,
        marginRight: 16,
    },
    cardContent: {
        flex: 1,
    },
    timeContainer: {
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 24,
        color: 'rgba(0, 0, 0, 1)',
    },
    content: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 24,
        color: 'rgba(71, 71, 71, 1)',
    },
    time: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 24,
        color: 'rgba(128, 128, 128, 1)',
    },
});

export default NotificationScreen;