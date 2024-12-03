import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { upcomingEvent, nearBYEvent, popularEvent } from '../../components/api/upcomingEventApi';
import { useTheme } from '../../components/theme/ThemeContext';
import UpcomingEvents from '../../components/homePage/upcomingEvent';
import PopularEvents from '../../components/homePage/popularEvent';
import NearbyEvents from '../../components/homePage/nearByEvent';
import { AddBookmark, bookMarkById, DeleteBookMark } from '../../components/api/bookMarks';
import { useToast } from "react-native-toast-notifications";
import DashboardIcon from '../../assets/images/homeImage/dashboardIcon';
import Search from '../../assets/images/homeImage/search';
import Notification from '../../assets/images/homeImage/notification';
import Arrow from '../../assets/images/homeImage/arrow';

const HomeScreen = () => {
    const [event, setEvent] = useState([]);
    const [nearByEvent, setNearByEvent] = useState([]);
    const [popularEvents, setPopularEvents] = useState([]);
    const { isDarkMode } = useTheme();
    const toast = useToast();
    const [bookedEventIds, setBookedEventIds] = useState([]); // Initialized as empty array
    useEffect(() => {
        const fetchEvents = async () => {
            const userId = await AsyncStorage.getItem('@user_id');
            if (userId) {
                await Promise.all([eventDetail(), nearBYEvents(userId), popularEventList()]);
                try {
                    const response = await bookMarkById(userId); // Fetch booked events
                    setBookedEventIds(
                        response.map((booking) => ({
                            eventId: booking.eventId,
                            bookmarkId: booking._id
                        })) || [] // Default to empty array
                    );
                } catch (error) {
                    setBookedEventIds([]); // Set to empty array on error
                }
            } else {
                console.error("User ID is not available");
            }
        };
        fetchEvents();
    }, []);

    const handleClick = (eventDetails) => {
        router.push({ pathname: "/eventDetail", params: { id: eventDetails } });
    };

    const handleSeeAll = (eventType) => {
        router.push({ pathname: "/eventList", params: { eventType } });
    };

    const nearBYEvents = async (userId) => {
        try {
            const response = await nearBYEvent(userId);
            setNearByEvent(response.nearByEvents);
        } catch (error) {
        }
    };

    const handleBookmark = async (eventId) => {
        const userId = await AsyncStorage.getItem('@user_id');

        try {
            const data = { eventId, userId };
            const existingBookmark = bookedEventIds.find(bookmark => bookmark.eventId === eventId);
            console.log("existingBookmark", existingBookmark);

            if (existingBookmark) {
                console.log('Deleting Bookmark:', existingBookmark.bookmarkId);
                const response = await DeleteBookMark(existingBookmark.bookmarkId);
                setBookedEventIds((prevIds) => prevIds.filter((id) => id.bookmarkId !== existingBookmark.bookmarkId));
                toast.show(response.message, {
                    type: 'success',
                    placement: 'bottom',
                    duration: 3000,
                    animationType: 'slide-in',
                });
            } else {
                // Add bookmark
                const response = await AddBookmark(data);
                setBookedEventIds((prevIds) => [...prevIds, { eventId, bookmarkId: response.bookmarkId }]);
                toast.show(response.message, {
                    type: 'success',
                    placement: 'bottom',
                    duration: 3000,
                    animationType: 'slide-in',
                });
            }
        } catch (error) {
            toast.show(error.message, {
                type: 'error',
                placement: 'bottom',
                duration: 3000,
                animationType: 'slide-in',
            });
        }
    };

    const eventDetail = async () => {
        try {
            const response = await upcomingEvent();
            setEvent(response.data || []);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const popularEventList = async () => {
        try {
            const response = await popularEvent();
            setPopularEvents(response.data || []);
        } catch (error) {
            console.error("Error fetching popular events:", error);
        }
    };

    const handleNotification = () => {
        router.push("/notification");
    };

    return (
        <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.darkContainer]}>
            <View style={styles.header}>
                <View style={styles.imageContent}>
                    <Image source={require("../../assets/images/person-1.png")} style={styles.profileImage} />
                    <View style={styles.locationContainer}>
                        <Text style={styles.locationText}>Current Location</Text>
                        <Text style={styles.locationText}>New York, USA</Text>
                    </View>
                    <Arrow/>
                </View>
                <TouchableOpacity onPress={handleNotification}>
                    <Notification/>
                </TouchableOpacity>
            </View>
            <Text style={[styles.content, isDarkMode && styles.darkTitle]}>
                MAKE YOUR <Text style={styles.titleColor}>PARTY PLANS</Text> OUT HERE
            </Text>
            <View style={[styles.searchSection, isDarkMode && styles.darkSearch]}>
               <Search/>
                <TextInput
                    style={[styles.input, isDarkMode && styles.darkSearch]}
                    placeholder="Search"
                    placeholderTextColor={isDarkMode ? "#fff" : "#888"}
                    underlineColorAndroid="transparent"
                />
                <DashboardIcon />
            </View>

            <View>
                <UpcomingEvents events={event} handleClick={handleClick} onSeeAll={() => handleSeeAll('upcoming')} handleBookmark={handleBookmark} bookedEventIds={bookedEventIds} />
                <PopularEvents popularEvents={popularEvents} handleClick={handleClick} onSeeAll={() => handleSeeAll('popular')} handleBookmark={handleBookmark} bookedEventIds={bookedEventIds} />
                <NearbyEvents nearByEvents={nearByEvent} handleClick={handleClick} onSeeAll={() => handleSeeAll('nearby')} handleBookmark={handleBookmark} bookedEventIds={bookedEventIds} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    darkContainer: {
        backgroundColor: "#000",
    },
    darkTitle: {
        color: "#fff",
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
    imageContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 52,
        height: 52,
        borderRadius: 20,
        marginRight: 10,
    },
    darkSearch:{
        backgroundColor:"rgba(64, 64, 64, 1)",
        color:"#fff"
    },
    locationContainer: {
        marginRight: 10,
    },
    locationText: {
        fontSize: 12,
        color: '#666',
    },
    notificationIcon: {
        width: 24,
        height: 24,
    },
    arrowDown: {
        width: 10,
        height: 5,
        top: -7,
    },
    content: {
        fontWeight: "800",
        fontSize: 24,
        lineHeight: 34,
        marginBottom: 30,
    },
    titleColor: {
        color: "rgba(246, 176, 39, 1)",
    },
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(241, 241, 241, 1)',
        padding: 10,
        borderRadius: 10,
        marginBottom: 30,
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        backgroundColor: 'rgba(241, 241, 241, 1)',
        color: '#424242',
        padding: 10,
    },
});

export default HomeScreen;
