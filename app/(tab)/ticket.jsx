import * as React from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
  Image
} from 'react-native';
import { useEffect, useState } from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure AsyncStorage is imported
import map from "../../assets/images/map.png";
import { ticketBookingStatus } from "../../components/api/upcomingEventApi";
import Button from '../../components/Button/Button';
import { useRouter } from 'expo-router';
import { useTheme } from '../../components/theme/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';


const FirstRoute = ({ pendingEvents, handleView, isDarkMode }) => (
  <View style={styles.routeContainer}>
    <View>
      {pendingEvents.length === 0 ? (
        <Text style={styles.ticketText}>No Pending Tickets</Text>
      ) : (
        <ScrollView>
          {pendingEvents.map((event) => (
          
              <View key={event._id} style={[styles.backgroundImage, isDarkMode && styles.darkBackgroundContainer]}>
                <View style={styles.mainContainer}>
                <Image source={{ uri: `http://192.168.0.98:8000/${event.imageUrl}` }} style={styles.personImage} onError={() => console.log('Failed to load image')} />
                  <View style={styles.eventContainer}>
                    <Text style={styles.ticketDetails}>
                      {new Date(event.eventDate).toLocaleDateString()} | {event.eventTime}
                    </Text>
                    <Text style={[styles.eventContent, isDarkMode && styles.darkTitle]}>{event.eventName}</Text>
                    <View style={styles.mapContainer}>
                      <Image source={map} style={styles.mapIcon} />
                      <Text style={[styles.venue, isDarkMode && styles.darkTitle]}>{event.location}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.bookingButton}>
                  <TouchableOpacity style={styles.button}>
                    <Button
                      buttonText="Cancel Booking"
                      backgroundColor={isDarkMode ? "rgba(64, 64, 64, 1)" : "white"}
                      textColor={isDarkMode ? "#fff" : "#000000"}
                      paddingVertical={10}
                      paddingHorizontal={2}
                      lineHeight="28"
                      fontFamily="Outfit_600SemiBold"
                      fontWeight="600"
                      borderRadius={8}
                     
                    />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.button}>
                    <Button
                      buttonText="View Ticket"
                      backgroundColor="rgba(246,176,39,1)"
                      textColor="#000000"
                      onPress={() => handleView(event._id)}
                      lineHeight="28"
                      paddingVertical={10}
                      paddingHorizontal={2}
                      fontFamily="Outfit_600SemiBold"
                      fontWeight="600"
                      borderRadius={8}
                   
                    />
                  </TouchableOpacity>
                </View>
              </View>
          )
          )}
        </ScrollView>
      )}
    </View>
  </View>
);


const SecondRoute = ({ completedEvents, isDarkMode }) => (
  <View style={styles.routeContainer}>
    {completedEvents.length === 0 ? (
      <Text style={styles.ticketText}>No Completed Tickets</Text>
    ) : (
      <ScrollView>
        {completedEvents.map((event, index) => (
          <View style={[styles.backgroundImage, isDarkMode && styles.darkBackgroundContainer]}>

            <View key={index} style={styles.mainContainer}>
              <Image source={{ uri: `http://192.168.0.98:8000/${event.imageUrl}` }} style={styles.personImage} onError={() => console.log('Failed to load image')} />
              <View style={styles.eventContainer}>
                <Text style={styles.ticketDetails}>
                  {new Date(event.eventDate).toLocaleDateString()} | {event.eventTime}
                </Text>
                <Text style={[styles.eventContent, isDarkMode && styles.darkTitle]}>{event.eventName}</Text>
                <View style={styles.mapContainer}>
                  <Image source={map} style={styles.mapIcon} />
                  <Text style={[styles.venue, isDarkMode && styles.darkTitle]}>{event.location}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    )}
  </View>
);

export default function TabViewExample() {
  const [index, setIndex] = useState(0);
  const { isDarkMode } = useTheme();

  const [pendingEvents, setPendingEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]); // Added state for completed events
  const routes = [
    { key: 'Pending', title: 'Pending' },
    { key: 'Completed', title: 'Completed' },
  ];
  const router = useRouter();

  const handleView = (id) => {
    router.push({
      pathname: "/paymentSuccessfully",
      params: { id: id },
    });
  };

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const userId = await AsyncStorage.getItem('@user_id');
        const response = await ticketBookingStatus(userId);
    
        setPendingEvents(response.pending || []); // Set pending events
        setCompletedEvents(response.completed || []); // Set completed events
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEventData();
  }, []);





  const _renderScene = SceneMap({
    Pending: () => <FirstRoute pendingEvents={pendingEvents} handleView={handleView} isDarkMode={isDarkMode} />,
    Completed: () => <SecondRoute completedEvents={completedEvents} isDarkMode={isDarkMode} />,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={_renderScene}
      onIndexChange={setIndex}
      style={[styles.container, isDarkMode && styles.darkContainer]}
      renderTabBar={(props) => (
        <View style={styles.containerMain}>
          <Icon name="chevron-back" size={24} color={isDarkMode ? 'rgba(255, 255, 255, 1)' : '#000000'} style={styles.arrowIcon} />
          <Text style={[styles.headerText, isDarkMode && styles.darkTitle]}>Ticket Booking</Text>
          <View style={[styles.tabBar, isDarkMode && styles.darkTarbar]}>
            {props.navigationState.routes.map((route, i) => {
              const opacity = props.position.interpolate({
                inputRange: props.navigationState.routes.map((x, i) => i),
                outputRange: props.navigationState.routes.map((inputIndex) =>
                  inputIndex === i ? 1 : 0.5
                ),
              });

              return (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.tabItem,

                    i === index
                      ? { backgroundColor: 'rgba(246, 176, 39, 1)' }
                      : { backgroundColor: isDarkMode ? "rgba(64, 64, 64, 1)" : "#ffffff" }, // Correctly using the conditional style
                  ]}
                  onPress={() => setIndex(i)}
                >
                  <Animated.Text style={{ opacity, ...styles.tabText, color: i === index ? 'black' : (isDarkMode ? "#fff" : "black") }}>
                    {route.title}
                  </Animated.Text>
                </TouchableOpacity>

              );
            })}
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  containerMain: {
    paddingTop: 30,
    margin: 20
  },
  darkTarbar: {
    backgroundColor: "rgba(64, 64, 64, 1)",

  },
  darkContainer: {
    backgroundColor: "#000000"
  },

  darkTitle: {
    color: "#fff"
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 13,
    borderRadius: 20

  },
  button:{
paddingVertical:10
  },
  bookingButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,

  },
  tabItem: {
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 20
  },
  tabText: {
    fontSize: 16,
  },
  routeContainer: {
    flex: 1,
    padding: 20,

  },
  ticketText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
  },
  ticketDetails: {
    fontSize: 14,
    color: "rgba(246, 176, 39, 1)",
  },
  eventContainer: {
    marginLeft: 20,
    gap: 10,
  },
  personImage: {
    width: 80,
    height: 109,
    borderRadius: 10,
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',


  },
  backgroundImage: {
    backgroundColor: 'white',
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    padding: 16,
    marginBottom: 20,
    borderRadius: 10,

  },
  darkBackgroundContainer: {
    backgroundColor: "rgba(64, 64, 64, 1)",
    shadowColor: "rgba(64, 64, 64, 1)",


  },
  eventContent: {
    fontWeight: "800",
    fontSize: 20,
    lineHeight: 22,
  },
  venue: {
    fontSize: 12,
    fontWeight: "400",
    color: '#000000',
    marginVertical: 5,
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
  arrowIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 35,
    left: '0%',
  },
});
