import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, ImageBackground } from 'react-native';
import { Image } from 'expo-image';
import person from "../../assets/images/person-3.png"; // Background image
import arrow from "../../assets/images/arrowWhite.svg"; // Back arrow image
import reserved from "../../assets/images/reserved-seat.png";
import selected from "../../assets/images/selected-seat.png";
import available from "../../assets/images/available-seat.png";
import Button from '../../components/Button/Button';
import { seatBooking } from '../../components/api/upcomingEventApi';
import { useToast } from "react-native-toast-notifications";
import { router, useLocalSearchParams } from 'expo-router';
import { upcomingEventById } from '../../components/api/upcomingEventApi';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure AsyncStorage is imported
import { useTheme } from '../../components/theme/ThemeContext';



export default function App() {
  const [selectedMovie, setSelectedMovie] = useState(null); // Initialize with null
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState(new Set()); // Track booked seats
  const [loading, setLoading] = useState(true); // Track loading state

  const { isDarkMode } = useTheme();

  const params = useLocalSearchParams();

  const { id } = params || {};
  const toast = useToast(); // For showing notifications

  // Fetch movie data when component mounts
  useEffect(() => {



    const fetchEventData = async (id) => {
      try {
        const response = await upcomingEventById({ id });
        setSelectedMovie(response.data); // Set the event details
        const booked = new Set(response.data.seats.filter(seat => seat.isBooked===true).map(seat => seat.seatNumber));
       console.log("jjjjjjjjjjjj" ,booked)
        setBookedSeats(booked);
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false); // Set loading to false after the data is fetched
      }
    };

    fetchEventData(id);


  }, [id]);

  // Function to handle seat selection
  const handleSeatSelection = (seat) => {
    if (bookedSeats.has(seat)) {
      toast.show('Seat already booked', 'This seat has already been booked.', {
        type: 'success',
        placement: 'bottom',
        duration: 3000,
        animationType: 'slide-in',
      });
      return;
    }

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat)); // Deselect the seat
    } else {
      setSelectedSeats([...selectedSeats, seat]); // Select the seat
    }
  };

  const handleBooking = async () => {


    if (selectedSeats.length === 0) {
      toast.show('No seats selected', 'Please select at least one seat to book.', {
        type: 'success',
        placement: 'bottom',
        duration: 3000,
        animationType: 'slide-in',
      });
      return;
    }
    const totalPrice = selectedSeats.length * selectedMovie.price;
    await AsyncStorage.setItem('@selectedSeats', JSON.stringify(selectedSeats));
    await AsyncStorage.setItem('@totalPrice', JSON.stringify(totalPrice));

    router.push({
      pathname: "/paymentBooking",
      params: { id: id },
    });
  }


  // Handle loading state
  if (loading) {
    return <Text>Loading...</Text>;
  }

  // If no selectedMovie is found
  if (!selectedMovie) {
    return <Text>No movie data found!</Text>;
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.darkContainer]}>
      <ImageBackground source={person} style={styles.backgroundImage}>
        <View style={styles.header}>
          <Image source={arrow} style={styles.arrowIcon} />
        </View>
      </ImageBackground>

      <Text style={styles.title}>Choose Your Seat</Text>

      <View style={styles.cinema}>
        <View style={styles.screen} />
        <View style={styles.seats}>
          {selectedMovie.seats.map(seat => {
            const isSelected = selectedSeats.includes(seat.seatNumber);
            const isOccupied = seat.isBooked;
            const isBooked = bookedSeats.has(seat.seatNumber);
    


            return (
              <TouchableOpacity
                key={seat.seatNumber}
                style={[
                  isSelected ? styles.selectedSeat : styles.availableSeat,
                  isOccupied ? styles.occupiedSeat : {},
                ]}
                onPress={isOccupied || isBooked ? null : () => handleSeatSelection(seat.seatNumber)}
              >
                <View>
                  <Image
                    source={isOccupied ? reserved : (isBooked ? { uri: 'black' } : (isSelected ? selected : available))}
                    style={styles.chairImage}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.booked]} />
          <Text style={[styles.legendText, isDarkMode && styles.darkSubtitle]}>Reserved</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.available]} />
          <Text style={[styles.legendText, isDarkMode && styles.darkSubtitle]}>Available</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.selected]} />
          <Text style={[styles.legendText, isDarkMode && styles.darkSubtitle]}>Selected</Text>
        </View>
      </View>

      {/* Booking Info */}
      <Text style={styles.info}>
        You have selected <Text style={styles.count}>{selectedSeats.length}</Text> seats for the price of <Text style={styles.total}>${selectedSeats.length * selectedMovie.price}</Text>
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.price}>
          Price: <Text style={styles.priceAmount}>${selectedSeats.length * selectedMovie.price} /person</Text>
        </Text>

        <TouchableOpacity style={styles.button} >
          <Button
            buttonText="Book Now"
            backgroundColor="rgba(246,176,39,1)"
            textColor="#000000"
            onPress={handleBooking}
            lineHeight="28"
            fontFamily="Outfit_600SemiBold"
            fontWeight="600"
            borderRadius={8}
            width="100%"
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    gap: 10,
  },
  darkContainer: {
    backgroundColor: "#000000"
  },
  title: {
    fontSize: 24,
    color: '#000000',
    fontWeight: "700",
    marginBottom: 20,
    lineHeight: 34,
    justifyContent: "center",
  },
  cinema: {
    marginBottom: 18,
    alignItems: 'center',
  },
  seats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    width: '100%',
  },
  chairImage: {
    width: 20,
    height: 20,
    margin: 10,
  },


  infoContainer: {
    marginTop: 20,

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center",
    width: '100%',
  },
  info: {
    color: '#000000',
    textAlign: 'center',
  },
  count: {
    color: '#000000',
  },
  total: {
    color: '#000000',
  },
  price: {
    color: '#000000',
    marginTop: 10,
  },
  priceAmount: {
    fontWeight: 'bold',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  backgroundImage: {
    padding: 20,
    width: 393,
    height: 300,
    paddingTop: 60,
    justifyContent: "flex-start",
  },
  arrowIcon: {
    width: 24,
    height: 24,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 5,
  },
  booked: {
    backgroundColor: "rgba(0,0,0,1)",
  },
  available: {
    backgroundColor: "rgba(71, 71, 71, 1)",
  },

  selected: {
    backgroundColor: "rgba(246, 176, 39, 1)",
  },
  legendText: {
    color: '#000000',
  },
});
