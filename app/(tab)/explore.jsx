// import React, { useEffect, useState } from 'react';
// import { StyleSheet, View, Text } from 'react-native';
// import MapView, { Marker, Callout } from 'react-native-maps';
// import * as Location from 'expo-location';
// import AsyncStorage from '@react-native-async-storage/async-storage'; 
// import { nearBYEvent } from '../../components/api/upcomingEventApi';

// const SearchComponent = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [filteredEvents, setFilteredEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [nearByEvent, setNearByEvent] = useState([]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       const userId = await AsyncStorage.getItem('@user_id');
//       console.log("userId ", userId);

//       if (userId) {
//         await nearBYEvents(userId);
//       } else {
//         console.error("User ID is not available");
//       }
//     };

//     fetchEvents();
//   }, []);

//   const nearBYEvents = async (userId) => {
//     try {
//       const response = await nearBYEvent(userId);
//       console.log("response", response);
//       setNearByEvent(response.nearByEvents);
//     } catch (error) {
//       console.error("Error fetching nearby events:", error);
//     }
//   };

//   useEffect(() => {
//     const getLocation = async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status === 'granted') {
//         const location = await Location.getCurrentPositionAsync({});
//         setUserLocation(location.coords);
//       }
//     };

//     getLocation();
//   }, []);

//   useEffect(() => {
//     if (userLocation && nearByEvent.length > 0) {
//       const eventsWithinRadius = filterEventsWithinRadius(userLocation, nearByEvent);
//       setFilteredEvents(eventsWithinRadius);
//     }
//   }, [userLocation, nearByEvent]);

//   const getDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371;
//     const dLat = (lat2 - lat1) * (Math.PI / 180);
//     const dLon = (lon2 - lon1) * (Math.PI / 180);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c;
//   };

//   const filterEventsWithinRadius = (userLocation, nearByEvent) => {
//     return nearByEvent.filter(event => {
//       const distance = getDistance(userLocation.latitude, userLocation.longitude, event.location.lat, event.location.long);
//       console.log("distance", distance);
//       return distance <= 10; // 10 km
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: userLocation ? userLocation.latitude : 11.0175638,
//           longitude: userLocation ? userLocation.longitude : 76.9913345,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//         region={selectedEvent ? {
//           latitude: selectedEvent.location.lat,
//           longitude: selectedEvent.location.long,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         } : null}
//       >
//         {filteredEvents.map(event => (
//           <Marker
//             key={event._id}
//             coordinate={{ latitude: event.location.lat, longitude: event.location.long }}
//             onPress={() => {
//               setSelectedEvent(event);
//             }}
//           >
           
//           </Marker>
//         ))}
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
// });

// export default SearchComponent;
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
 
const SearchComponent = () => {
  return (
    <View>
      <Text>SearchComponent</Text>
    </View>
  )
}
 
export default SearchComponent
 
const styles = StyleSheet.create({})