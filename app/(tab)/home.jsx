import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import person from "../../assets/images/person-1.png"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import arrowDown from "../../assets/images/arrow-down.png";
import notification from "../../assets/images/Notification.png";
import search from "../../assets/images/search.png";
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
import Person1 from "../../assets/images/person-2.png";
import group from "../../assets/images/group.png";
import map from "../../assets/images/map.png";
import { Ionicons } from '@expo/vector-icons';
import Frame from "../../assets/images/Frame.png"
import Frame2 from "../../assets/images/Frame2.png"
import { router } from 'expo-router';
import { upcomingEvent, nearBYEvent, popularEvent } from '../../components/api/upcomingEventApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from "../../config";
import { Asset } from 'expo-asset';


import { useTheme } from '../../components/theme/ThemeContext';



const Tab = createBottomTabNavigator();


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

const HomeScreen = () => {
    const [event, setEvent] = useState([]);
    const [nearByEvent, setNearByEvent] = useState([]);
    const [popularEvents, setPopularEvents] = useState([]);
    const { isDarkMode } = useTheme();

    const handleClick = (eventDetails) => {
        console.log("eventDetails", eventDetails)
        router.push({
            pathname: "/eventDetail",
            params: { id: eventDetails },
        });
    }

    useEffect(() => {
        const fetchEvents = async () => {
            const userId = await AsyncStorage.getItem('@user_id');
            console.log("userId ", userId);

            if (userId) {
                await eventDetail();
                await nearBYEvents(userId);
                await popularEventList()

            } else {
                console.error("User ID is not available");
            }
        };


        fetchEvents();
    }, []); // This should only run once


    const handleSeeAll = (eventType) => {
        router.push({
            pathname: "/eventList",
            params: { eventType: eventType },
        });
    };
    const nearBYEvents = async (userId) => {
        try {
            const response = await nearBYEvent(userId);
            console.log("response", response)
            setNearByEvent(response.nearByEvents);
        } catch (error) {
            console.error("Error fetching nearby events:", error);
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

            console.error("Error fetching events:", error);
        }
    };

    return (
        <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.darkContainer]}>
            <View style={styles.header}>
                <View style={styles.imageContent}>
                    <Image source={person} style={styles.profileImage} />
                    <View style={styles.locationContainer}>
                        <Text style={styles.locationText}>Current Location</Text>
                        <Text style={styles.locationText}>New York, USA</Text>
                    </View>
                    <Image source={arrowDown} style={styles.arrowDown} />
                </View>
                <Image source={notification} style={styles.notificationIcon} />
            </View>
            <Text style={[styles.content, isDarkMode && styles.darkTitle]}>
                MAKE YOUR <Text style={styles.titleColor}>PARTY PLANS </Text>OUT HERE
            </Text>
            <View style={[styles.searchSection ,isDarkMode && styles.darkSearch]}>

                <Image source={search} style={styles.searchIcon} />
                <TextInput
                    style={[styles.input ,isDarkMode && styles.darkSearch]}
                    placeholder="Search"
                    placeholderTextColor="#888"
                    underlineColorAndroid="transparent"
                />

            </View>

            <View>
              

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.categoryContainer}>

                        {eventOptions.map((option) => (
                            <TouchableOpacity
                                key={option.value}
                                style={[styles.categoryButton ,isDarkMode && styles.darkSearch]}

                            >
                                <Image source={option.icon} style={styles.optionIcon} />
                                <Text style={[styles.categoryText ,isDarkMode && styles.darkTitle]}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}

                    </View>
                </ScrollView>
                <View style={styles.categoryContainerAll}>
                    <Text style={[styles.sectionTitle , isDarkMode && styles.darkTitle]}>Upcoming Events</Text>

                    <TouchableOpacity onPress={() => handleSeeAll('upcoming')}>

                        <Text style={styles.sectionAll}>See All</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.popularGroup}>
                        {event.map((details) => {
                            const eventDate = new Date(details.eventDate);
                            const day = eventDate.getDate();
                            const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];
                            const month = monthNames[eventDate.getMonth()];
                            const imageUri = Asset.fromURI(`${config.Image}/${details.imageUrl}`);


                            return (

                                <ImageBackground source={imageUri} resizeMode="cover" style={styles.upcomingevent} key={details._id}>
                                    <View style={styles.dateContaner}>
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
                            )
                        })}
                    </View>
                </ScrollView>



                <View style={styles.dashedLine} />


                <View style={styles.eventCard}>



                    <View style={styles.categoryContainerAll}>

                        <Text style={[styles.sectionTitle ,isDarkMode && styles.darkTitle]}>Popular Events</Text>
                        <TouchableOpacity onPress={() => handleSeeAll('popular')}>

                            <Text style={styles.sectionAll}>See All</Text>
                        </TouchableOpacity>

                    </View>


                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {popularEvents?.trendingEventList?.length > 0 &&
                        popularEvents.trendingEventList.map((details) => {
                            const eventDate = new Date(details.eventDate);
                            const day = eventDate.getDate();
                            const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];
                            const month = monthNames[eventDate.getMonth()];
                            const years = eventDate.getFullYear()
                            const imageUri = Asset.fromURI(`${config.Image}/${details.imageUrl}`);


                            return (



                                <ImageBackground source={imageUri} resizeMode="cover" style={styles.popularCalender} key={details._id} >

                                    <View style={styles.popularGroup}>
                                        <View style={styles.popularDate}><Ionicons name="calendar" size={20} color="#fff" />

                                            <Text style={styles.date}>{day} {month} {years}</Text>


                                        </View>
                                        <View>
                                            <Ionicons name="bookmark" size={20} color="rgba(246, 176, 39, 1)" />
                                        </View>

                                    </View>

                                    <View style={styles.popularGroupend}>

                                        <View >
                                            <Text style={styles.title}>{details.eventName}</Text>
                                        </View>
                                        <View>

                                            <TouchableOpacity onPress={() => handleClick(details._id)} style={styles.button}>
                                                <Text style={styles.buttonText}>Book Ticket</Text>
                                            </TouchableOpacity></View>
                                    </View>
                                </ImageBackground>
                            )
                        })}

                </ScrollView>
                <View style={styles.dashedLine} />


                <View style={styles.eventCard}>

                    <View style={styles.categoryContainerAll}>
                        <Text style={[styles.sectionTitle ,isDarkMode && styles.darkTitle]}>
                            Nearby Events
                        </Text>
                        <TouchableOpacity onPress={() => handleSeeAll('nearby')}>

                            <Text style={styles.sectionAll}>See All</Text>
                        </TouchableOpacity>
                    </View>


                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {nearByEvent?.nearByEvent?.length > 0 ? (
                        nearByEvent.map((details) => {
                            const eventDate = new Date(details.eventDate);
                            const day = eventDate.getDate();
                            const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];
                            const month = monthNames[eventDate.getMonth()];
                            const imageUri = Asset.fromURI(`${config.Image}/${details.imageUrl}`);


                            return ( // Add return statement here
                                <View key={details._id} style={styles.nearContainer}>
                                    <ImageBackground source={imageUri} resizeMode="cover" style={styles.popularCalender} key={details._id}>
                                        <View style={styles.popularGroup}>
                                            <View style={styles.dateContainer}>
                                                <Text style={styles.titlecontent}>{day} <Text style={styles.juneContent}>{month}</Text></Text>
                                            </View>
                                            <View>
                                                <Ionicons name="bookmark" size={20} color="rgba(246, 176, 39, 1)" />
                                            </View>
                                        </View>
                                    </ImageBackground>
                                    <View style={styles.nearByContent}>
                                        <Text style={styles.nearContent}>{details.eventName}</Text>
                                        <View style={styles.mapContainer}>
                                            <Image source={map} style={styles.mapIcon} />
                                            <Text style={styles.venueContent}>{details.location.address}, {details.location.city}</Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={styles.button}>
                                                <Text style={styles.buttonText}>Book Ticket</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            );
                        })
                    ) : (
                        <View style={styles.noEvent}><Text>No events</Text></View>
                    )}




                </ScrollView>


                <ScrollView>





                </ScrollView>
            </View>
        </ScrollView>
    );
};



const styles = StyleSheet.create({
    container: {
        flexgrow: 1,
        backgroundColor: '#fff',

        padding: 16,
    },
    darkSearch:{
        backgroundColor:" rgba(64, 64, 64, 1)"

    },
    darkContainer: {
        backgroundColor: "#000000"
    },
    darkTitle: {
        color: "#fff"
    },
    categoryContainerAll: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30,
        marginTop:30,
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
        width: 220,
        height: 234,
        padding: 20,
        marginRight: 10,
        justifyContent: 'space-between',
        borderRadius: 10, // Add border radius for rounded corners
        overflow: 'hidden', // Ensure children do not overflow
    },
    upcomingevent: {
        width: 275,
        height: 234,
        justifyContent: 'space-between',
        borderRadius: 10, // Add border radius for rounded corners
        overflow: 'hidden', // Ensure children do not overflow
        marginRight: 10
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
});

export default HomeScreen