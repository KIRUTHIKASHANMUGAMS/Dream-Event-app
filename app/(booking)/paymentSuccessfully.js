// import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { Image } from 'expo-image';
// import QRCode from 'react-native-qrcode-svg';
// import arrow from "../../assets/images/arrow.svg";
// import tick from "../../assets/images/tick.png";
// import person from "../../assets/images/person-3.png";
// import Button from "../../components/Button/Button";
// import { useRoute } from '@react-navigation/native';
// import { upcomingEventById } from '../../components/api/upcomingEventApi';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Print from 'expo-print';
// import { useTheme } from '../../components/theme/ThemeContext';
// import * as FileSystem from 'expo-file-system';

// const SearchComponent = () => {
//     const [eventDetails, setEventDetails] = useState(null);
//     const [userId, setUserId] = useState(null);
//     const route = useRoute();
//     const { id } = route.params || {};
//     const { isDarkMode } = useTheme();

//     useEffect(() => {
//         const fetchUserId = async () => {
//             const storedUserId = await AsyncStorage.getItem('@user_id');
//             setUserId(storedUserId);
//         };

//         fetchUserId();

//         const fetchEventData = async (id) => {
//             try {
//                 const response = await upcomingEventById({ id });
//                 setEventDetails(response.data);
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         fetchEventData(id);
//     }, [id]);

//     const getUserSeats = () => {
//         if (eventDetails && userId) {
//             return eventDetails.seats
//                 .filter(seat => seat.bookedBy === userId && seat.isBooked)
//                 .map(seat => seat.seatNumber)
//                 .join(', ');
//         }
//         return '';
//     };

//     const handleDownload = async () => {
//         if (!eventDetails || !userId) {
//             Alert.alert("Error", "Event details or user ID not available.");
//             return;
//         }
    
//         const seatsString = getUserSeats();
//         const htmlContent = `
//             <h1>${eventDetails.eventName}</h1>
//             <p>Location: ${eventDetails.location}</p>
//             <p>Date: ${eventDetails.eventDate}</p>
//             <p>Seats Booked: ${seatsString}</p>
//             <p>Scan your QR code at the entry gate.</p>
//         `;
    
//         try {
//             // Generate PDF
//             const { uri } = await Print.printToFileAsync({ html: htmlContent });
    
//             // Define destination path
//             const downloadDir = FileSystem.documentDirectory + 'my_pdf_download.pdf';
    
//             // Move PDF to download directory
//             await FileSystem.moveAsync({
//                 from: uri,
//                 to: downloadDir,
//             });
    
//             Alert.alert("Success", `PDF saved to: ${downloadDir}`);
//         } catch (error) {
//             console.log(error);
//             Alert.alert("Error", "Failed to generate or save PDF.");
//         }
//     };
//     return (
//         <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.darkContainer]}>
//         <View style={styles.iconContainer}>
//             <Image source={arrow} style={styles.arrowIcon} />
//         </View>
//         <View style={styles.booking}>
//             <Text style={[styles.ticketContainer, isDarkMode && styles.darkTitle]}>Tickets</Text>
//         </View>

//         <View style={[styles.addressContainer ,isDarkMode && styles.darkbackground]}>
//             <Image source={person} style={styles.person} />
//             {eventDetails ? (
//                 <>
//                     <Text style={[styles.eventTitle, isDarkMode && styles.darkTitle]}>{eventDetails.eventName}</Text>
//                     <View style={styles.dashedLine} />
//                     <View style={styles.eventDetailsContainer}>
//                         <View>
//                             <Text style={[styles.eventLabel, isDarkMode && styles.darkSubtitle]}>Location</Text>
//                             <Text style={[styles.eventText, isDarkMode && styles.darkTitle]}>{eventDetails?.location}</Text>
//                             <Text style={[styles.eventLabel, isDarkMode && styles.darkSubtitle]}>Date</Text>
//                             <Text style={[styles.eventText, isDarkMode && styles.darkTitle]}>{eventDetails.eventDate}</Text>
//                         </View>
//                         <View>
//                             <Text style={[styles.eventLabel, isDarkMode && styles.darkSubtitle]}>Seat</Text>
//                             <Text style={[styles.eventText, isDarkMode && styles.darkTitle]}>{getUserSeats()}</Text>
//                             <Text style={[styles.eventLabel, isDarkMode && styles.darkSubtitle]}>Time</Text>
//                             <Text style={[styles.eventText, isDarkMode && styles.darkTitle]}>12:00</Text>
//                         </View>
//                     </View>
//                     <View style={styles.dashedLine} />
//                     <View style={styles.barcodeDetails}>
//                         <QRCode
//                             value={`Event Name: ${eventDetails.eventName}, Seat Booked: ${getUserSeats()}`}
//                             size={200}
//                             color="black"
//                             backgroundColor="white"
//                         />
//                         <Text style={[styles.footerText, isDarkMode && styles.darkTitle]}>Scan your QR code at the entry gate</Text>
//                     </View>
//                 </>
//             ) : (
//                 <View>
//                     <Text style={styles.footerText}>Loading event details...</Text>
//                 </View>
//             )}
//         </View>

//         <View style={styles.bookingStyle}>
//             <Button
//                 buttonText="Download"
//                 backgroundColor="#F6B027"
//                 textColor="#000000"
//                 onPress={handleDownload}
//                 lineHeight="28"
//                 fontFamily="Outfit_600SemiBold"
//                 fontWeight="600"
//                 borderRadius={8}
//                 width='45%'
//             />
//         </View>
//     </ScrollView>
// );
// };


// export default SearchComponent;
// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         padding: 20,
//         backgroundColor: 'rgb(225, 225, 225)',
//     },
//     darkContainer: {
//         backgroundColor: "#000000",
//     },
//     darkbackground:{
//         backgroundColor:' rgba(64, 64, 64, 1)',

//     },
//     darkSubtitle: {
//         color: "rgba(238, 238, 238, 1)",
//     },
//     darkTitle: {
//         color: "#fff",
//     },
//     person: {
//         width: "100%",
//         height: 125,
//         borderRadius: 10,
//     },
//     iconContainer: {
//         width: "100%",
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: 'center',
//         marginBottom: 20,
//     },
//     bookingStyle: {
//         alignContent: "center",
//         flexDirection: "row",
//         justifyContent: "center",
//     },
//     arrowIcon: {
//         width: 24,
//         height: 24,
//         position: 'absolute',
//         top: 20,
//         left: '0%',
//     },
//     booking: {
//         alignItems: "center",
//         justifyContent: 'center',
//     },
//     centerIcon: {
//         width: 60,
//         height: 60,
//     },
//     dashedLine: {
//         height: 1,
//         width: '100%',
//         borderRadius: 1,
//         borderWidth: 1,
//         borderColor: 'rgba(71, 71, 71, 1)',
//         borderStyle: 'dashed',
//     },
//     ticketContainer: {
//         fontWeight: "700",
//         fontSize: 24,
//         lineHeight: 26,
//         textAlign: "center",
//     },
//     addressContainer: {
//         backgroundColor: "rgba(255, 255, 255, 1)",
//         borderRadius: 20,
//         padding: 15,
//         marginBottom: 30,
//         alignItems: "flex-start",
//         gap: 15,
//         marginTop: 30,
//     },
//     eventTitle: {
//         fontWeight: "700",
//         fontSize: 18,
//         marginBottom: 10,
//     },
//     eventDetailsContainer: {
//         flexDirection: 'row',
//         justifyContent: "space-between",
//         width: '100%',
//     },
//     eventLabel: {
//         fontWeight: "400",
//         fontSize: 14,
//         color: "rgba(71, 71, 71, 1)",
//         lineHeight: 17,
//         marginTop: 10,
//     },
//     eventText: {
//         fontWeight: "700",
//         fontSize: 14,
//         color: "rgba(0, 0, 0, 1)",
//         lineHeight: 24,
//         marginBottom: 10,
//     },
//     barcodeDetails: {
//         alignItems: 'center',
//         justifyContent: "center",
//         textAlign: "center",
//         marginVertical: 20,
//         width: "100%",
//     },
//     footerText: {
//         marginBottom: 10,
//         marginTop: 10,
//         fontSize: 12,
//         color: "rgba(71, 71, 71, 1)",
//     },
// });





import { StyleSheet, Text, View, ScrollView, Alert,TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import QRCode from 'react-native-qrcode-svg';
import arrow from "../../assets/images/arrow.svg";
import tick from "../../assets/images/tick.png";
import person from "../../assets/images/person-3.png";
import Button from "../../components/Button/Button";
import { router ,useLocalSearchParams } from "expo-router";
import { upcomingEventById } from '../../components/api/upcomingEventApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Print from 'expo-print';
import { useTheme } from '../../components/theme/ThemeContext';
import * as FileSystem from 'expo-file-system';
import Icon from 'react-native-vector-icons/Ionicons';


const SearchComponent = () => {
    const [eventDetails, setEventDetails] = useState(null);
    const [userId, setUserId] = useState(null);
    const params = useLocalSearchParams();
    const { id } = params || {};
     const { isDarkMode } = useTheme();
     const [userSeats, setUserSeats] = useState('');


    useEffect(() => {
        const fetchUserId = async () => {
            const storedUserId = await AsyncStorage.getItem('@user_id');
            setUserId(storedUserId);
        };
        const fetchUserSeats = async () => {
            const seats = await AsyncStorage.getItem('@selectedSeats');

            setUserSeats(seats ? JSON.parse(seats).join(', ') : ''); // Assuming seats are stored as a JSON array
        };
    

        fetchUserId();
        fetchUserSeats()

        const fetchEventData = async (id) => {
            try {

                const response = await upcomingEventById({ id });
                setEventDetails(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchEventData(id);
    }, [id]);

 

    const handleDownload = async () => {
        if (!eventDetails || !userId) {
            Alert.alert("Error", "Event details or user ID not available.");
            return;
        }
    
        const seatsString = userSeats;
        const htmlContent = `
            <h1>${eventDetails.eventName}</h1>
            <p>Location: ${eventDetails.location}</p>
            <p>Date: ${eventDetails.eventDate}</p>
            <p>Seats Booked: ${seatsString}</p>
            <p>Scan your QR code at the entry gate.</p>
        `;
    
        try {
            // Generate PDF
            const { uri } = await Print.printToFileAsync({ html: htmlContent });
    
            // Define destination path
            const downloadDir = FileSystem.documentDirectory + 'my_pdf_download.pdf';
    
            // Move PDF to download directory
            await FileSystem.moveAsync({
                from: uri,
                to: downloadDir,
            });
    
            Alert.alert("Success", `PDF saved to: ${downloadDir}`);
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Failed to generate or save PDF.");
        }
    };
    return (
        <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.darkContainer]}>
        <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.arrowIcon}>
                    <Icon name="chevron-back" size={24} color={isDarkMode ? 'rgba(255, 255, 255, 1)' : '#000000'} />
                </TouchableOpacity>        
                </View>
        <View style={styles.booking}>
            <Text style={[styles.ticketContainer, isDarkMode && styles.darkTitle]}>Tickets</Text>
        </View>

        <View style={[styles.addressContainer ,isDarkMode && styles.darkbackground]}>
            <Image source={person} style={styles.person} />
            {eventDetails ? (
                <>
                    <Text style={[styles.eventTitle, isDarkMode && styles.darkTitle]}>{eventDetails.eventName}</Text>
                    <View style={styles.dashedLine} />
                    <View style={styles.eventDetailsContainer}>
                        <View>
                            <Text style={[styles.eventLabel, isDarkMode && styles.darkSubtitle]}>Location</Text>
                            <Text style={[styles.eventText, isDarkMode && styles.darkTitle]}>{eventDetails?.location}</Text>
                            <Text style={[styles.eventLabel, isDarkMode && styles.darkSubtitle]}>Date</Text>
                            <Text style={[styles.eventText, isDarkMode && styles.darkTitle]}>{eventDetails.eventDate}</Text>
                        </View>
                        <View>
                            <Text style={[styles.eventLabel, isDarkMode && styles.darkSubtitle]}>Seat</Text>
                            <Text style={[styles.eventText, isDarkMode && styles.darkTitle]}>{userSeats}</Text>
                            <Text style={[styles.eventLabel, isDarkMode && styles.darkSubtitle]}>Time</Text>
                            <Text style={[styles.eventText, isDarkMode && styles.darkTitle]}>12:00</Text>
                        </View>
                    </View>
                    <View style={styles.dashedLine} />
                    <View style={styles.barcodeDetails}>
                        <QRCode
                            value={`Event Name: ${eventDetails.eventName}, Seat Booked: ${userSeats}`}
                            size={200}
                            color="black"
                            backgroundColor="white"
                        />
                        <Text style={[styles.footerText, isDarkMode && styles.darkTitle]}>Scan your QR code at the entry gate</Text>
                    </View>
                </>
            ) : (
                <View>
                    <Text style={styles.footerText}>Loading event details...</Text>
                </View>
            )}
        </View>

        <View style={styles.bookingStyle}>
            <Button
                buttonText="Download"
                backgroundColor="#F6B027"
                textColor="#000000"
                onPress={handleDownload}
                lineHeight="28"
                fontFamily="Outfit_600SemiBold"
                fontWeight="600"
                borderRadius={8}
                width='45%'
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
        backgroundColor: "#000000",
    },
    darkbackground:{
        backgroundColor:' rgba(64, 64, 64, 1)',

    },
    darkSubtitle: {
        color: "rgba(238, 238, 238, 1)",
    },
    darkTitle: {
        color: "#fff",
    },
    person: {
        width: "100%",
        height: 125,
        borderRadius: 10,
    },
    iconContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: 20,
        marginTop:20
    },
    bookingStyle: {
        alignContent: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    arrowIcon: {
        width: 24,
        height: 24,
        position: 'absolute',
        top: 20,
        left: '0%',
    },
    booking: {
        alignItems: "center",
        justifyContent: 'center',
    },
    centerIcon: {
        width: 60,
        height: 60,
    },
    dashedLine: {
        height: 1,
        width: '100%',
        borderRadius: 1,
        borderWidth: 1,
        borderColor: 'rgba(71, 71, 71, 1)',
        borderStyle: 'dashed',
    },
    ticketContainer: {
        fontWeight: "700",
        fontSize: 24,
        lineHeight: 26,
        textAlign: "center",
    },
    addressContainer: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderRadius: 20,
        padding: 15,
        marginBottom: 30,
        alignItems: "flex-start",
        gap: 15,
        marginTop: 30,
    },
    eventTitle: {
        fontWeight: "700",
        fontSize: 18,
        marginBottom: 10,
    },
    eventDetailsContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: '100%',
    },
    eventLabel: {
        fontWeight: "400",
        fontSize: 14,
        color: "rgba(71, 71, 71, 1)",
        lineHeight: 17,
        marginTop: 10,
    },
    eventText: {
        fontWeight: "700",
        fontSize: 14,
        color: "rgba(0, 0, 0, 1)",
        lineHeight: 24,
        marginBottom: 10,
    },
    barcodeDetails: {
        alignItems: 'center',
        justifyContent: "center",
        textAlign: "center",
        marginVertical: 20,
        width: "100%",
    },
    footerText: {
        marginBottom: 10,
        marginTop: 10,
        fontSize: 12,
        color: "rgba(71, 71, 71, 1)",
    },
});