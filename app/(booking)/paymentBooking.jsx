import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Image } from 'expo-image';
import arrow from "../../assets/images/arrow.svg";
import person from "../../assets/images/person-3.png";
import map from "../../assets/images/map.png";
import gpay from "../../assets/images/gpay.png";
import paypal from "../../assets/images/paypal.png";
import ticket from "../../assets/images/ticket.png";
import Button from "../../components/Button/Button";
import { useRoute } from '@react-navigation/native';
import { upcomingEventById } from '../../components/api/upcomingEventApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useToast } from "react-native-toast-notifications";
import { seatBooking } from '../../components/api/upcomingEventApi';
import { useTheme } from '../../components/theme/ThemeContext';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import * as Linking from 'expo-linking';


const SearchComponent = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("googlePay");
    const [eventDetail, setEventDetail] = useState({})
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { isDarkMode } = useTheme();
    const handleSelect = (method) => {
        setSelectedPaymentMethod(method);
    };
    const toast = useToast()

    const route = useRoute();
    const { id } = route.params || {};
    const navigation = useNavigation();

    useEffect(() => {
        const handleDeepLink = (url) => {
            const route = url.replace(/.*?:\/\//g, ''); // Remove scheme
            if (route.includes('paymentSuccessfully')) {
                navigation.navigate('paymentSuccessfully'); // Navigate to your success page
            }
        };

        const linkingListener = Linking.addEventListener('url', ({ url }) => handleDeepLink(url));

        return () => {
            linkingListener.remove();
        };
    }, [navigation]);
    useEffect(() => {
        const fetchData = async () => {
            const seats = await AsyncStorage.getItem('@selectedSeats');
            const price = await AsyncStorage.getItem('@totalPrice');
            console.log("seats", seats, price)

            if (seats) {
                setSelectedSeats(JSON.parse(seats));
            }
            if (price) {
                setTotalPrice(JSON.parse(price));
            }
        };

        fetchData();
        console.log("Fetching event data for ID:", id);
        const fetchEventData = async (id) => {
            try {
                const response = await upcomingEventById({ id });
                setEventDetail(response.data); // Set the event details
            } catch (error) {
                console.log(error)
            }
        };

        fetchEventData(id);


    }, [id]);


    const handleBooking = async () => {
        const userId = await AsyncStorage.getItem('@user_id'); // Get user ID from AsyncStorage
        const datas = { eventId: id, userId, seatsBooked: selectedSeats };

    
        try {
            const response = await seatBooking(datas);
            const url = response.data.url; 
    
            if (url) {
                // Open the URL using Linking
                const supported = await Linking.canOpenURL(url);
                if (supported) {
                    await Linking.openURL(url);
    
                   
                } else {
                    Alert.alert('Error', 'Unable to open the URL');
                }
            } else {
                console.error('No URL returned from server');
            }
    
        } catch (err) {
            const errorMessage = err.message || 'Booking failed.';
            toast.show(errorMessage, {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                animationType: 'slide-in',
            });
        }
    };





    return (
        <ScrollView  contentContainerStyle={[styles.container, isDarkMode && styles.darkContainer]}>
            <View style={styles.iconContainer}>
                <Image source={arrow} style={styles.arrowIcon} />
                <View style={styles.mainContainer}>
                    <Image source={person} style={styles.personImage} />
                    <View style={styles.eventContainer}>
                        <Text style={[styles.eventContent, isDarkMode && styles.darkTitle]}>{eventDetail?.eventName}</Text>
                        <Text style={[styles.eventEndTime, isDarkMode && styles.darkTitle]}>{eventDetail?.eventDate}{eventDetail?.eventTime}</Text>
                    </View>
                </View>
            </View>

            <View style={[styles.addressContainer , isDarkMode && styles.darkcontainerDetails] }>
                <View style={styles.eventAddress}>
                    <Text style={[styles.eventtext ,isDarkMode && styles.darkTitle]}>LOCATION</Text>
                    <View style={styles.locationContainer}>
                        <Image source={map} style={styles.mapIcon} />
                        <Text style={[styles.eventDetails,isDarkMode && styles.darkTitle]}>{eventDetail?.location}</Text>
                    </View>
                </View>

                <View style={styles.eventAddress}>
                    <Text style={[styles.eventtext,isDarkMode && styles.darkTitle]}>DATE</Text>
                    <Text style={[styles.eventDetails,isDarkMode && styles.darkTitle]}>{eventDetail.eventDate}</Text>
                </View>

                <View style={styles.eventAddress}>
                    <Text style={[styles.eventtext,isDarkMode && styles.darkTitle]}>TIME</Text>
                    <Text style={[styles.eventDetails,isDarkMode && styles.darkTitle]}>12:00</Text>
                </View>

                <View style={styles.eventAddress}>
                    <Text style={[styles.eventtext,isDarkMode && styles.darkTitle]}>SEATS</Text>
                    <View style={[styles.seatList,isDarkMode && styles.darkTitle]}>
                        {selectedSeats.map((seat, index) => (
                            <Text key={index} style={[styles.eventDetails,isDarkMode && styles.darkTitle]}>{seat} , </Text>

                        ))}
                    </View>

                </View>
            </View>

            <View style={[styles.addressContainer ,isDarkMode && styles.darkcontainerDetails]}>
                <Text style={[styles.summary,isDarkMode && styles.darkTitle]}>SUMMARY</Text>
                <View style={styles.eventAddress}>
                    <Text style={[styles.eventtext,isDarkMode && styles.darkTitle]}>Sub-total</Text>
                    <Text style={[styles.eventDetails,isDarkMode && styles.darkTitle]}>{totalPrice}</Text>
                </View>
                <View style={styles.eventAddress}>
                    <Text style={[styles.eventtext,isDarkMode && styles.darkTitle]}>Charge fees</Text>
                    <Text style={[styles.eventDetails,isDarkMode && styles.darkTitle]}>0</Text>
                </View>
                <View style={[styles.dashedLine ,,isDarkMode && styles.darkDashboardLine]} />


                <View style={styles.eventAddress}>
                    <Text style={[styles.eventtext,isDarkMode && styles.darkTitle]}>Total</Text>
                    <Text style={[styles.eventDetails,isDarkMode && styles.darkTitle]}>{totalPrice}</Text>
                </View>
            </View>

            {/* <View style={styles.addressContainer}>
                <TouchableOpacity style={styles.eventAddress} onPress={() => handleSelect('googlePay')}>
                    <Text style={styles.eventtext}>
                        <Image source={gpay} style={styles.gpay} />
                        <Text style={styles.paymentText}> Google Pay </Text>
                    </Text>
                    <View style={styles.radioButton}>
                        {selectedPaymentMethod === 'googlePay' && <View style={styles.selectedCircle} />}
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.eventAddress} onPress={() => handleSelect('paypal')}>
                    <Text style={styles.eventtext}>
                        <Image source={paypal} style={styles.gpay} />
                        <Text style={styles.paymentText}> Paypal</Text>
                    </Text>
                    <View style={styles.radioButton}>
                        {selectedPaymentMethod === 'paypal' && <View style={styles.selectedCircle} />}
                    </View>
                </TouchableOpacity>
            </View> */}

            <View style={styles.buttonContainer}>
                <Button
                    buttonText="Buy Ticket"
                    onPress={handleBooking}
                    style={styles.buttonSkip}
                    backgroundColor="#F6B027"
                    borderColor="#F6B027"
                    textColor="#000000"
                    borderRadius={5}
                />
            </View>
        </ScrollView>
    );
};

export default SearchComponent;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: 'rgb(225, 225, 225)',
    },
    darkContainer: {
        backgroundColor: "#000000"
    },
    darkTitle: {
        color: "#fff"
    },
    darkDashboardLine:{
        borderColor: 'rgba(238, 238, 238, 1)',
    },
    darkcontainerDetails:{
        backgroundColor: "rgba(64, 64, 64, 1)",

    },
    arrowIcon: {
        width: 24,
        height: 24,
        position: 'absolute',
        top: 20,
        left: '0%',
    },
    seatList: {
        flexDirection: "row"
    },
    dashedLine: {
        height: 1,
        width: '100%',
        borderRadius: 1,
        borderWidth: 1,
        borderColor: ' rgba(71, 71, 71, 1)',
        borderStyle: 'dashed'
    },
    iconContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: 20,
    },
    personImage: {
        width: 80,
        height: 109,
        borderRadius: 10,
    },
    mainContainer: {
        flexDirection: 'row',
        top: 20,
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 30,
    },
    summary: {
        fontWeight: "700",
        fontSize: 16,
        lineHeight: 26,
    },
    eventContent: {
        fontWeight: "800",
        fontSize: 20,
        lineHeight: 22,
    },
    eventEndTime: {
        fontWeight: "400",
        fontSize: 14,
        lineHeight: 20,
    },
    eventContainer: {
        marginLeft: 20,
        gap: 10,
    },
    eventAddress: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        gap: 20,
    },
    addressContainer: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        gap: 10,
        borderRadius: 20,
        padding: 20,
        marginBottom: 30,
    },
    eventtext: {
        fontWeight: "700",
        fontSize: 14,
        lineHeight: 24,
        color: "rgba(71, 71, 71, 1)",
    },
    eventDetails: {
        fontWeight: "700",
        fontSize: 14,
        lineHeight: 24,
        color: "rgba(0, 0, 0, 1)",
    },
    hrContainer: {
        borderBottomWidth: 1,
        borderStyle: "dashed",
        borderRadius: 12,
        borderColor: 'rgba(230, 230, 230, 1)',
        marginBottom: 20,
    },
    gpay: {
        width: 15,
        height: 15,
    },
    eventMap: {
        paddingLeft: 5,
    },
    paymentText: {

        fontWeight: "700",
        fontSize: 14,
        lineHeight: 24,
        color: "rgba(0, 0, 0, 1)",
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgba(246, 176, 39, 1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'rgba(246, 176, 39, 1)',
    },
    mapIcon: {
        width: 15,
        height: 15,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    locationContainer: {
        flexDirection: "row",
        gap:5,
        alignItems:"center"
    }
});
