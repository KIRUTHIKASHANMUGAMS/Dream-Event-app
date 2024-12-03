import { StyleSheet, Text, View, ScrollView, Alert, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import arrow from "../../assets/images/arrow.svg";
import person from "../../assets/images/person-3.png";
import map from "../../assets/images/map.png";
import Button from "../../components/Button/Button";
import { upcomingEventById, seatBooking, paymentSuccess } from '../../components/api/upcomingEventApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, router } from 'expo-router';
import { useToast } from "react-native-toast-notifications";
import { useTheme } from '../../components/theme/ThemeContext';
import { useStripe } from '@stripe/stripe-react-native';
import { Asset } from 'expo-asset';
import config from "../../config";
import MapIcon from '../../assets/images/homeImage/mapIcon';



const SearchComponent = () => {
    const [eventDetail, setEventDetail] = useState({});
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { isDarkMode } = useTheme();
    const toast = useToast();
    const [imageUri, setImageUri] = useState(null);
    const [clientSecret, setClientSecret] = useState(null);
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const params = useLocalSearchParams();
    const { id } = params || {};


    useEffect(() => {
        const fetchData = async () => {
            const seats = await AsyncStorage.getItem('@selectedSeats');
            const price = await AsyncStorage.getItem('@totalPrice');

            if (seats) {
                setSelectedSeats(JSON.parse(seats));
            }
            if (price) {
                setTotalPrice(JSON.parse(price));
            }

            try {
                const response = await upcomingEventById({ id });

                const imageUri = Asset.fromURI(`${config.Image}/${response.data.imageUrl}`);
                setImageUri(imageUri.uri);
                setEventDetail(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);
    const eventDate = new Date(eventDetail.eventDate);
    const day = eventDate.getDate();
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];
    const month = monthNames[eventDate.getMonth()];
    const year = eventDate.getFullYear();

    const handleBooking = async () => {
        const userId = await AsyncStorage.getItem('@user_id');
        const bookingData = { eventId: id, userId, seatsBooked: selectedSeats };

        try {
            const response = await seatBooking(bookingData);
            setClientSecret(response.data.clientSecret);
 

            await handlePayment(response.data.clientSecret, response.data.booking._id);
        } catch (err) {
            toast.show(err.message || 'Booking failed.', {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                animationType: 'slide-in',
            });
        }
    };

    const handlePayment = async (clientSecret, bookingId) => {
        // Initialize the payment sheet
        const { error: initError } = await initPaymentSheet({
            paymentIntentClientSecret: clientSecret,
            merchantDisplayName: "Dream Event",
        });

        if (initError) {
            console.error('Error initializing payment sheet:', initError);
            Alert.alert(initError.message);
            return;
        }

        // Present the payment sheet
        const { error: presentError } = await presentPaymentSheet();

        if (presentError) {
            console.error('Error presenting payment sheet:', presentError);
            Alert.alert(presentError.message);
            return;
        }

        // Call handleSuccess after successful payment
        await handleSuccess(bookingId);
        Alert.alert('Payment Successful', 'Your booking has been confirmed!');
    };

    const handleSuccess = async (bookingId) => {
        try {
            await paymentSuccess(bookingId);

            router.push({
                pathname: "/successPage",
                params: { id: id },
            });

        } catch (error) {
            Alert.alert('Error', 'Failed to update booking status.');
        }
    };

    return (
        <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.darkContainer]}>
            <View style={styles.iconContainer}>

                <View style={styles.mainContainer}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.arrowIcon}>
                        <Icon name="chevron-back" size={24} color={isDarkMode ? 'rgba(255, 255, 255, 1)' : '#000000'} />
                    </TouchableOpacity>
                    <Image source={{ uri: imageUri }} style={styles.personImage} onError={() => console.log('Failed to load image')} />

                    <View style={styles.eventContainer}>
                        <Text style={[styles.eventContent, isDarkMode && styles.darkTitle]}>{eventDetail?.eventName}</Text>
                        <Text style={[styles.eventEndTime, isDarkMode && styles.darkTitle]}>{day} {month} , {year} | {eventDetail?.eventTime}</Text>
                    </View>
                </View>

            </View>

            <View style={[styles.addressContainer, isDarkMode && styles.darkcontainerDetails]}>
                <View style={styles.eventAddress}>
                    <Text style={[styles.eventtext, isDarkMode && styles.darkTitle]}>LOCATION</Text>
                    <View style={styles.locationContainer}>
                        <MapIcon />
                        <Text style={[styles.eventDetails, isDarkMode && styles.darkTitle]}>{eventDetail?.location}</Text>
                    </View>
                </View>
                <View style={styles.eventAddress}>
                    <Text style={[styles.eventtext, isDarkMode && styles.darkTitle]}>DATE</Text>
                    <Text style={[styles.eventDetails, isDarkMode && styles.darkTitle]}>{day} {month} , {year}</Text>
                </View>
                <View style={styles.eventAddress}>
                    <Text style={[styles.eventtext, isDarkMode && styles.darkTitle]}>TIME</Text>
                    <Text style={[styles.eventDetails, isDarkMode && styles.darkTitle]}>12:00</Text>
                </View>
                <View style={styles.eventAddress}>
                    <Text style={[styles.eventtext, isDarkMode && styles.darkTitle]}>SEATS</Text>
                    <View style={[styles.seatList, isDarkMode && styles.darkTitle]}>
                        {selectedSeats.map((seat, index) => (
                            <Text key={index} style={[styles.eventDetails, isDarkMode && styles.darkTitle]}>{seat}, </Text>
                        ))}
                    </View>
                </View>
            </View>

            <View style={[styles.addressContainer, isDarkMode && styles.darkcontainerDetails]}>
                <Text style={[styles.summary, isDarkMode && styles.darkTitle]}>SUMMARY</Text>
                <View style={styles.eventAddress}>
                    <Text style={[styles.eventtext, isDarkMode && styles.darkTitle]}>Sub-total</Text>
                    <Text style={[styles.eventDetails, isDarkMode && styles.darkTitle]}>{totalPrice}</Text>
                </View>
                <View style={styles.eventAddress}>
                    <Text style={[styles.eventtext, isDarkMode && styles.darkTitle]}>Charge fees</Text>
                    <Text style={[styles.eventDetails, isDarkMode && styles.darkTitle]}>0</Text>
                </View>
                
                <View style={[styles.dashedLine, isDarkMode && styles.darkDashboardLine]} />
                <View style={styles.eventAddress}>
                    <Text style={[styles.eventtext, isDarkMode && styles.darkTitle]}>Total</Text>
                    <Text style={[styles.eventDetails, isDarkMode && styles.darkTitle]}>{totalPrice}</Text>
                </View>
            </View>

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
    darkDashboardLine: {
        borderColor: 'rgba(238, 238, 238, 1)',
    },
    darkcontainerDetails: {
        backgroundColor: "rgba(64, 64, 64, 1)",
    },
    arrowIcon: {
        width: 24,
        height: 24,
        position: 'absolute',
        top: '5%',
        left: '0%',

        zIndex: 1,
    },
    locationContainer: {
        flexDirection: "row",
        gap: 2,
        alignItems: "center"

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
        marginBottom: 20,
    },
    personImage: {
        width: 80,
        height: 109,
        borderRadius: 10,
        marginLeft: 40,
    },
    mainContainer: {
        flexDirection: 'row',
        top: 20,
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 30,
        marginTop: 20
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
    buttonContainer: {
        marginTop: 20,
    },
});
