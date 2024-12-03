import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { upcomingEvent, nearBYEvent, popularEvent } from '../../components/api/upcomingEventApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Frame from "../../assets/images/Frame.png";
import Person1 from "../../assets/images/person-2.png";
import group from "../../assets/images/group.png";
import map from "../../assets/images/map.png";
import arrow from "../../assets/images/arrow.svg";
import { Image } from 'expo-image';
import config from "../../config";
import { Asset } from 'expo-asset';
import { useTheme } from '../../components/theme/ThemeContext';
import { useLocalSearchParams, router } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';



const { width } = Dimensions.get('window');
const HomeScreen = () => {
    const [events, setEvents] = useState([]);
    const [userId, setUserId] = useState(null);
    const { isDarkMode } = useTheme();
    const params = useLocalSearchParams();
    const { eventType } = params || {};


    useEffect(() => {
        const fetchUserId = async () => {
            const storedUserId = await AsyncStorage.getItem('@user_id');
            setUserId(storedUserId);
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                let response;
                switch (eventType) {
                    case 'upcoming':
                        response = await upcomingEvent();
                        break;
                    case 'popular':
                        response = await popularEvent();
                        break;
                    case 'nearby':
                        response = await nearBYEvent(userId);
                        break;
                    default:
                        response = [];
                }
                setEvents(response.data || []);
            } catch (error) {
                console.error(`Error fetching ${eventType} events:`, error);
            }
        };

        fetchEvents();
    }, [eventType, userId]);

    const handleClick = (id) => {
        // Handle ticket booking logic here
        console.log(`Booking ticket for event ID: ${id}`);
    };

    return (
        <ScrollView contentContainerStyle={[styles.containerDetails, isDarkMode && styles.darkContainerDetails]}>




            {eventType === 'upcoming' && (
                <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.darkContainer]}>

                    <View style={styles.iconContainer}>

                        <TouchableOpacity onPress={() => router.back()} style={styles.arrowIcon}>
                            <Icon name="chevron-back" size={24} color={isDarkMode ? 'rgba(255, 255, 255, 1)' : '#000000'} />
                        </TouchableOpacity>
                        <Text style={[styles.headerText, isDarkMode && styles.darkTitle]}>Upcoming Event</Text>


                    </View>

                    {events.length > 0 ? (
                        <View style={styles.popularGroup}>
                            {events.map((details) => {
                                const eventDate = new Date(details.eventDate);
                                const day = eventDate.getDate();
                                const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];
                                const month = monthNames[eventDate.getMonth()];
                                const imageUri = Asset.fromURI(`${config.Image}/${details.imageUrl}`);

                                return (
                                    <ImageBackground source={imageUri} resizeMode="cover" style={styles.upcomingevent} key={details._id}>
                                        <View style={styles.dateContainer}>
                                            <Text style={styles.titlecontent}>{day} <Text style={styles.juneContent}>{month}</Text></Text>
                                        </View>
                                        <View style={styles.details}>
                                            <View style={styles.group}>
                                                <Text style={styles.title}>{details.eventName}</Text>
                                                <Ionicons name="bookmark" size={20} color="rgba(246, 176, 39, 1)" />
                                            </View>
                                            <View style={styles.mapContainer}>
                                                <Image source={map} style={styles.mapIcon} />
                                                <Text style={styles.venue}>{details.location}</Text>
                                            </View>
                                            <View style={styles.group}>
                                                <Image source={group} />
                                                <View style={styles.group}>
                                                    <Text style={styles.price}>$ {details.price}.00</Text>
                                                    <TouchableOpacity onPress={() => handleClick(details._id)} style={styles.button}>
                                                        <Text style={styles.buttonText}>Book Ticket</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </ImageBackground>
                                );
                            })}
                        </View>
                    ) : (
                        <View style={styles.noEvent}>
                            <Text>No Upcoming Events</Text>
                        </View>
                    )}
                </ScrollView>
            )}

            {/* Popular Events Section */}
            {eventType === 'popular' && (


                <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.darkContainer]} >

                    <View style={styles.iconContainer}>

                        <TouchableOpacity onPress={() => router.back()} style={styles.arrowIcon}>
                            <Icon name="chevron-back" size={24} color={isDarkMode ? 'rgba(255, 255, 255, 1)' : '#000000'} />
                        </TouchableOpacity>
                        <Text style={[styles.headerText, isDarkMode && styles.darkTitle]}>Popular Event</Text>


                    </View>

                    {events.trendingEventList?.length > 0 ? (
                        events.trendingEventList.map((details) => {
                            const eventDate = new Date(details.eventDate);
                            const day = eventDate.getDate();
                            const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];
                            const month = monthNames[eventDate.getMonth()];
                            const imageUri = Asset.fromURI(`${config.Image}/${details.imageUrl}`);

                            return (
                                <ImageBackground source={imageUri} resizeMode="cover" style={styles.popularCalender} key={details._id}>
                                    <View style={styles.popularGroup}>
                                        <View style={styles.popularDate}>
                                            <Ionicons name="calendar" size={20} color="#fff" />
                                            <Text style={styles.date}>{day} {month} {eventDate.getFullYear()}</Text>
                                        </View>
                                        <Ionicons name="bookmark" size={20} color="rgba(246, 176, 39, 1)" />
                                    </View>
                                    <View style={styles.popularGroupend}>
                                        <Text style={styles.title}>{details.eventName}</Text>
                                        <TouchableOpacity onPress={() => handleClick(details._id)} style={styles.button}>
                                            <Text style={styles.buttonText}>Book Ticket</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ImageBackground>
                            )
                        })
                    ) : (
                        <View style={styles.noEvent}>
                            <Text>No Upcoming Events</Text>
                        </View>
                    )}
                </ScrollView>
            )}

            {/* Nearby Events Section */}

            {eventType === 'nearBY' && (
                <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.darkContainer]}>


                    <View style={styles.iconContainer}>

                        <TouchableOpacity onPress={() => router.back()} style={styles.arrowIcon}>
                            <Icon name="chevron-back" size={24} color={isDarkMode ? 'rgba(255, 255, 255, 1)' : '#000000'} />
                        </TouchableOpacity>
                        <Text style={[styles.headerText, isDarkMode && styles.darkTitle]}>Nearby Event</Text>


                    </View>
                    {events.length > 0 ? (
                        events.map((details) => {
                            const eventDate = new Date(details.eventDate);
                            const day = eventDate.getDate();
                            const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];
                            const month = monthNames[eventDate.getMonth()];
                            const imageUri = Asset.fromURI(`${config.Image}/${details.imageUrl}`);

                            return (
                                <View key={details._id} style={styles.nearContainer}>
                                    <ImageBackground source={imageUri} resizeMode="cover" style={styles.popularCalender}>
                                        <View style={styles.popularGroup}>
                                            <View style={styles.dateContainer}>
                                                <Text style={styles.titlecontent}>{day} <Text style={styles.juneContent}>{month}</Text></Text>
                                            </View>
                                            <Ionicons name="bookmark" size={20} color="rgba(246, 176, 39, 1)" />
                                        </View>
                                    </ImageBackground>
                                    <View style={styles.nearByContent}>
                                        <Text style={styles.nearContent}>{details.eventName}</Text>
                                        <View style={styles.mapContainer}>
                                            <Image source={map} style={styles.mapIcon} />
                                            <Text style={styles.venueContent}>{details.location.address}, {details.location.city}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => handleClick(details._id)} style={styles.button}>
                                            <Text style={styles.buttonText}>Book Ticket</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })
                    ) : (
                        <View style={styles.noEvent}><Text>No events</Text></View>
                    )}
                </ScrollView>

            )}
        </ScrollView>
    );
};





const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    containerDetails:{
        flexGrow: 1,   
        backgroundColor: '#fff',
    },
    darkContainerDetails: {
        backgroundColor: "#00000"
    },
    arrowIcon: {
        width: 24,
        height: 24,
        position: 'absolute',
        top: 30,
        left: '0%',
    },
    iconContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 20
    },

    containerMain: {
        backgroundColor: 'rgba(241, 241, 241, 1)',
        borderRadius: 8,
        padding: 10,
        marginRight: 16,

    },
    categoryContainerAll: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30
    },
    darkContainer: {
        backgroundColor: "#000000"
    },
    darkTitle: {
        color: "#fff"
    },
    dateNearBy: {
        fontWeight: "700",
        fontSize: 18,
        lineHeight: 20,
        color: "#fff",
    },
    dashedLine: {
        height: 1,
        width: '100%',
        borderRadius: 1,
        borderWidth: 0.1,
        borderColor: 'rgba(71, 71, 71, 1)',
        borderStyle: 'dashed',
        marginTop: 20
    },
    juneContent: {
        fontWeight: "400",
        fontSize: 10,
    },
    dateContainer: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "rgba(30, 27, 28, 1)"

    },
    nearByContent: {
        gap: 9,

    },
    noEvent: {
        width: "100%",
        textAlign: "center"
    },
    nearContent: {
        fontWeight: "700",
        fontSize: 16,
        lineHeight: 22

    },

    sectionAll: {
        fontSize: 12,
        fontWeight: "700",
        lineHeight: 12,
        color: "rgba(246, 176, 39, 1)"


    },
    popularCalender: {
        width: width * 0.9,
        height: (width * 0.9) * (234 / 352),
        padding: 20,
        marginRight: 10,
        justifyContent: 'space-between',
        borderRadius: 10, // Add border radius for rounded corners
        overflow: 'hidden', // Ensure children do not overflow
    },
    upcomingevent: {
        width: width * 0.9,
        height: (width * 0.9) * (234 / 352),
        justifyContent: 'space-between',
        borderRadius: 10, // Add border radius for rounded corners
        overflow: 'hidden', // Ensure children do not overflow
        marginRight: 10,
        paddingRight: 10
    },
    popularGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginRight: 10

    },
    nearContainer: {
        alignItems: "center",
        gap: 10

    },
    popularGroupend: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    popularDate: {
        flexDirection: "row",
        color: "#fff",
        alignItems: "center"
    },

    mapContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    mapIcon: {
        width: 16,
        height: 16,
        marginRight: 5
    },
    dateContaner: {


        justifyContent: 'flex-end',
        alignItems: "flex-end",
        padding: 10

    },
    mainContainer: {
        flexDirection: 'row',
        top: 20,
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 30,
        marginTop: 20
    },
    group: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: 'space-around'
    },
    eventCard: {
        borderRadius: 8,

    },
    image: {
        width: 275,
        height: 234,

    },
    titleColor: {
        color: "rgba(0, 0, 0, 0.6)",

    }
    ,
    details: {
        padding: 10,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        gap: 5,
        justifyContent: 'flex-end',
        display: "flex"


    },
    content: {
        fontWeight: "800",
        fontSize: 24,
        lineHeight: 34,
        marginBottom: 30
    },
    date: {
        fontSize: 12,
        lineHeight: 12,
        fontWeight: "400",
        color: '#fff',
        marginLeft: 10
    },
    venue: {
        fontSize: 12,
        fontWeight: "400",
        color: '#fff',
        marginVertical: 5,
    },

    venueContent: {
        fontSize: 12,
        fontWeight: "400",
        color: '#000000',
        marginVertical: 5,
    },
    price: {
        fontSize: 12,
        fontWeight: "400",
        fontWeight: 'bold',
        lineHeight: 14,
        color: "rgba(255, 204, 0, 1.00)",
    },
    button: {
        backgroundColor: '#FFCC00',
        paddingVertical: 10,
        paddingHorizontal: 20, // Add horizontal padding for better button size
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center', // Centers text within the button

        marginLeft: 10


    },
    buttonText: {
        fontWeight: 'bold',
        color: '#000',
    },
    person: {
        width: 275,
        height: 234,
        justifyContent: "flex-end"
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,

    },
    imageContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 52,
        height: 52,
        borderRadius: 20, // Circular image
        marginRight: 10,
    },
    locationContainer: {
        marginRight: 10,
    },
    locationText: {
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 15,
        color: '#666',
    },

    notificationIcon: {
        width: 24,
        height: 24,
    },
    arrowIcon: {
        width: 52,
        height: 52
    },
    imagecontent: {
    },
    locationText: {
        fontSize: 14,
        color: '#666',
    },
    title: {
        lineHeight: 22,

        fontSize: 16,
        fontWeight: "700",
        color: 'rgba(255, 255, 255, 1)',
    },
    titlecontent: {
        width: 50,
        fontSize: 16,
        fontWeight: "700",
        color: 'rgba(255, 255, 255, 1)',
        backgroundColor: "rgba(30, 27, 28, 1)",
        padding: 10,
        textAlign: "center"


    },
    titleColor: {
        color: "rgba(246, 176, 39, 1)"


    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    categoryButton: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        marginRight: 20
    },
    categoryText: {
        color: '#333',
        fontWeight: "700",
        fontSize: 16,
        lineHeight: 26,
        paddingLeft: 10

    },
    arrowDown: {
        width: 10,
        height: 5,
        top: -7
    },
    sectionTitle: {
        fontSize: 20,
        lineHeight: 30,
        fontWeight: '700',

    },
    eventContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    eventCard: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 10,
    },
    eventTitle: {
        fontWeight: 'bold',
    },
    eventDate: {
        color: '#666',
    },
    eventPrice: {
        color: '#ff6347',
        marginTop: 5,
    },
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(241, 241, 241, 1)',
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        paddingLeft: 10,
        borderRadius: 10,
        marginBottom: 30

    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        backgroundColor: 'rgba(241, 241, 241, 1)',
        color: '#424242',
    },
    headerText: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 10,
        top: 10,
    },
    arrowIcon: {
        width: 24,
        height: 24,
        position: 'absolute',
        top: 10,
        left: '0%',
    },

});

export default HomeScreen