import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import person from "../../assets/images/person-3.png";
import arrow from "../../assets/images/arrowWhite.svg";
import { Image } from 'expo-image';
import map from "../../assets/images/map.png";
import group from "../../assets/images/group.png";
import eventArrow from "../../assets/images/event-arrow.png";
import card from "../../assets/images/card.png";
import googlemap from "../../assets/images/googlemap.png";
import Button from '../../components/Button/Button';
import { router, useLocalSearchParams } from 'expo-router';
import { upcomingEventById } from '../../components/api/upcomingEventApi';
import { useTheme } from '../../components/theme/ThemeContext';
import MapIcon from '../../assets/images/homeImage/mapIcon';






const EventDetail = () => {
    const [eventDetail, setEventDetail] = useState({})
    const { isDarkMode } = useTheme();
    const params = useLocalSearchParams();

    const { id } = params || {};
    useEffect(() => {
        searchData()
    }, [id])

    const searchData = async () => {
        try {
            const response = await upcomingEventById({ id });
            setEventDetail(response.data || []);

        } catch (error) {

            console.error("Error fetching events:", error);
        }
    }
    const eventDate = new Date(eventDetail.eventDate);
    const day = eventDate.getDate();
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];
    const month = monthNames[eventDate.getMonth()];

    const handlePress = () => {
        router.push({
            pathname: "/eventBooking",
            params: { id: id },
        });
    }
    return (
        <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.darkContainer]}>
            <ImageBackground
                source={person}
                style={styles.backgroundImage}
            >
                <View style={styles.header}>

                    <TouchableOpacity onPress={() => router.back()} style={styles.arrowIcon} >
                        <Icon name="chevron-back" size={24} color={isDarkMode ? 'rgba(255, 255, 255, 1)' : '#fff'} />
                    </TouchableOpacity>
                </View>

            </ImageBackground>

            <View style={[styles.topContainer, isDarkMode && styles.darkcontent]}>

                <View style={styles.cheeryContent}>
                    <View style={styles.eventContent}>
                        <Text style={[styles.eventTitle, isDarkMode && styles.darkTitle]}>{eventDetail.eventName}</Text>
                        <Image source={eventArrow} style={styles.eventImage} />
                    </View>
                    <View style={styles.dateContainer}><Text style={styles.eventDate}>{day} </Text ><Text style={styles.eventContent}>{month}</Text></View>
                </View>

                <View style={styles.mapContainer}>
                    <MapIcon/>
                    <Text style={[styles.eventLocation, isDarkMode && styles.darkSubtitle]}>{eventDetail?.location}</Text>
                </View>


                <Text style={[styles.eventDescription, isDarkMode && styles.darkSubtitle]}>
                    {eventDetail.content}
                </Text>

                <View style={styles.groupContainer}>
                    <Image source={group} style={styles.groupImage} />
                    <Text style={[styles.rupee, isDarkMode && styles.darkTitle]}>${eventDetail.price}</Text>

                </View>


            </View>





            <View style={styles.cardContainer}>
                <ImageBackground source={card} style={styles.cardDetails} >

                </ImageBackground>

            </View>

            <View style={styles.cardContainer}>
                <ImageBackground source={googlemap} style={styles.cardDetails} >

                </ImageBackground>
                <Button
                    buttonText="Choose Your Seat"
                    backgroundColor="rgba(246,176,39,1)"
                    textColor="#000000"
                    onPress={handlePress}
                    lineHeight="28"
                    fontFamily="Outfit_600SemiBold"
                    fontWeight="600"
                    borderRadius={8}
                    width='100%'
                />
            </View>



        </ScrollView>
    );
}

export default EventDetail;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,

    },
    darkContainer: {
        backgroundColor: "#000000"
    },
    darkSubtitle: {
        color: "rgba(238, 238, 238, 1)"

    },
    darkcontent: {
        backgroundColor: "rgba(64, 64, 64, 1)",


    },
    darkTitle: {
        color: "#fff"
    },

    mapContainer: {
        flexDirection: "row",
        alignItems:"center"
    },
    topContainer: {

        backgroundColor: "#fff",
        width: 320,
        borderRadius: 20,
        marginHorizontal: 20,
        padding: 30,
        marginTop: -50,



    },
    cardContainer: {
        marginHorizontal: 20,
        marginTop: 20,
        gap: 20
    },
    cardDetails: {
        width: 320,
        height: 172,
    },
    eventImage: {
        width: 20,
        height: 18,
        marginLeft: 10
    },


    eventArrow: {
        width: 20,
        height: 18,

    },
    cheeryContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    backgroundImage: {
        padding: 20,
        width: 393,
        height: 415,
        paddingTop: 60,
        justifyContent: "flex-start",
    },
    groupContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10
    },
    rupee: {
        fontSize: 14,
        fontWeight: "900",
        lineHeight: 24
    },
    groupImage: {
        width: 75,
        height: 30
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    arrowIcon: {
        width: 24,
        height: 24,
    },
    eventTitle: {
        fontSize: 20,
        fontWeight: "800",
        lineHeight: 22,
        color: '#000000',
        marginBottom: 10,
    },
    eventLocation: {
        fontSize: 12,
        lineHeight: 22,
        fontWeight: "400",
        color: '#000000',
        marginBottom: 5,
        marginLeft: 10
    },
    eventDate: {
        width: 45,
        borderRadius: 5,
        fontSize: 18,
        fontWeight: "bold",
        alignContent: "center",
        color: '#000000',
        textAlign: "center",

    },
    eventContent: {
        fontSize: 10,
        fontWeight: "400",
        flexDirection: "row",
        alignItems: "center",
        flexDirection: "row",
        color: "#000000"
    },
    dateContainer: {
        alignItems: "center",
        backgroundColor: " rgba(246, 176, 39, 1)",
        borderRadius: 5,
        padding: 5,

    },
    eventDescription: {
        fontSize: 14,
        fontWeight: "400",
        color: '#000000',

    },
});
