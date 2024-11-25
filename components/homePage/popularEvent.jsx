import React from 'react';
import { View, Text, ScrollView, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import config from "../../config";

const PopularEvents = ({ popularEvents, handleClick, onSeeAll, handleBookmark, bookedEventIds }) => {
    return (
        <View>
            <View style={styles.categoryContainerAll}>
                <Text style={styles.sectionTitle}>Popular Events</Text>
                <TouchableOpacity onPress={onSeeAll}>
                    <Text style={styles.sectionAll}>See All</Text>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {popularEvents?.trendingEventList?.length > 0 &&
                    popularEvents.trendingEventList.map((details) => {
                        const eventDate = new Date(details.eventDate);
                        const day = eventDate.getDate();
                        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];
                        const month = monthNames[eventDate.getMonth()];
                        const years = eventDate.getFullYear();
                        const imageUri = Asset.fromURI(`${config.Image}/${details.imageUrl}`);
                        const isBooked = bookedEventIds.some(bookmark => bookmark.eventId === details._id);
                        return (
                            <ImageBackground source={imageUri} resizeMode="cover" style={styles.popularCalender} key={details._id}>
                                <View style={styles.popularGroup}>
                                    <View style={styles.popularDate}>
                                        <Ionicons name="calendar" size={20} color="#fff" />
                                        <Text style={styles.date}>{day} {month} {years}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => handleBookmark(details._id)}>
                                        <Ionicons
                                            name={isBooked ? "bookmark" : "bookmark-outline"}
                                            size={20}
                                            color={isBooked ? "rgba(246, 176, 39, 1)" : "rgba(246, 176, 39, 1)"}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.popularGroupend}>
                                    <View>
                                        <Text style={styles.title}>{details.eventName}</Text>
                                    </View>
                                    <View>
                                        <TouchableOpacity onPress={() => handleClick(details._id)} style={styles.button}>
                                            <Text style={styles.buttonText}>Book Ticket</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ImageBackground>
                        );
                    })}
            </ScrollView>
        </View>
    );
};

export default PopularEvents;


const styles = StyleSheet.create({
    container: {
        flexgrow: 1,
        backgroundColor: '#fff',

        padding: 16,
    },
    darkSearch: {
        backgroundColor: " rgba(64, 64, 64, 1)"

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
        marginTop: 30,
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
        width: 250,
        height: 234,
        padding: 10,
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
        alignItems: "center",
        justifyContent:"center",
        alignContent:"center",
        padding:10,
        borderRadius:5,
        backgroundColor: "rgba(30, 27, 28, 1)",
        

 
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
        marginTop: 10,

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

