import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, ImageBackground, Dimensions } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Ionicons } from '@expo/vector-icons';
import location from "../../assets/images/white-location.png";
import remove from "../../assets/images/remove.png";
import { useTheme } from '../../components/theme/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { bookMarkById, DeleteBookMark } from '../../components/api/bookMarks';
import config from "../../config";
import { router } from 'expo-router';
import { useToast } from "react-native-toast-notifications";

const { width } = Dimensions.get('window');

export default function App() {
  const [bookmarkedEvents, setBookmarkedEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem('@user_id');
        const response = await bookMarkById(userId);
        setBookmarkedEvents(response);
      } catch (error) {
      }
    };

    fetchData();
  }, []);

  const { isDarkMode } = useTheme();
  const handleBackPress = () => {
    // Handle back press logic here
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.iconContainer}>
        <Icon name="chevron-back" size={24} color={isDarkMode ? 'rgba(255, 255, 255, 1)' : '#000000'} style={[styles.arrowIcon]} onPress={handleBackPress} />
        <Text style={[styles.headerText, isDarkMode && styles.darkTitle]}>Bookmark</Text>
      </View>
      <SwipeListCard swipeList={bookmarkedEvents} setBookmarkedEvents={setBookmarkedEvents} />
    </View>
  );
}

function SwipeListCard({ swipeList = [], setBookmarkedEvents }) {
  const { isDarkMode } = useTheme();
  const toast = useToast();

  const deleteBookMark = async (id) => {
    try {
      const response = await DeleteBookMark(id); // Call the API to delete bookmark
      if (response) { // Assuming response has a success property
        // Remove the item from the state
        setBookmarkedEvents(prevEvents => prevEvents.filter(event => event._id !== id));
        toast.show("Bookmark deleted successfully", {
          type: 'success',
          placement: 'bottom',
          duration: 3000,
          animationType: 'slide-in',
        });
      } else {
        toast.show(response.message || "Failed to delete bookmark", {
          type: 'error',
          placement: 'bottom',
          duration: 3000,
          animationType: 'slide-in',
        });
      }
    } catch (error) {
      toast.show("Failed to delete bookmark", {
        type: 'error',
        placement: 'bottom',
        duration: 3000,
        animationType: 'slide-in',
      });
    }
  };

  const handleClick = (eventDetails) => {
    router.push({ pathname: "/eventDetail", params: { id: eventDetails } });
  };

  return (
    <View>
    {swipeList.length === 0 ? (
      <Text style={[styles.noBookmarksText, isDarkMode && styles.darkTitle]}>
        No bookmarks available.
      </Text>
    ) : (
    <SwipeListView
      data={swipeList}
      keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
      renderItem={({ item }) => {
        const eventDate = new Date(item.eventDate);
        const day = eventDate.getDate();
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];
        const month = monthNames[eventDate.getMonth()];
        const imageUri = { uri: `${config.Image}/${item.imageUrl}` }; // Handle image source

        return (
          <View style={styles.card}>
            {item && (
              <ImageBackground source={imageUri} resizeMode="cover" style={styles.popularCalender}>
                <View style={styles.popularGroup}>
                  <View style={styles.popularDate}>
                    <Text style={[styles.titlecontentEvent, isDarkMode && styles.darkTitle]}>
                      {day} <Text style={[styles.juneContent, isDarkMode && styles.darkTitle]}>{month}</Text>
                    </Text>
                  </View>
                  <View>
                    <Ionicons name="bookmark" size={20} color="rgba(246, 176, 39, 1)" />
                  </View>
                </View>
                <View>
                  <Text style={styles.titleContent}>{item.eventName}</Text>
                </View>
                <View style={styles.popularGroupend}>
                  <View style={styles.contentMain}>
                    <Image source={location} style={styles.imageIcon} />
                    <Text style={styles.titleText}>{item.location}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleClick(item.eventId)} style={styles.button}>
                    <Text style={styles.buttonText}>Book Ticket</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            )}
          </View>
        );
      }}
      renderHiddenItem={({ item }) => (
        <View style={styles.hiddenItemContainer}>
          <TouchableOpacity style={styles.hiddenItemButton} onPress={() => deleteBookMark(item._id)}>
            <Image source={remove} style={styles.hiddenItemText} />
          </TouchableOpacity>
        </View>
      )}
      rightOpenValue={-100}
      />
    )}
  </View>
);
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  darkContainer: {
    backgroundColor: "#000000"
  },
  darkTitle: {
    color: "#fff"
  },
  headerText: {
    top: 20,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 20,
    marginTop:20
  },
  arrowIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 20,
    left: '0%',
  },
  titlecontentEvent: {
    width: 45,
    fontSize: 16,
    fontWeight: "700",
    color: '#000000',
    backgroundColor: "rgba(246, 176, 39, 1)",
    padding: 5,
    textAlign: "center"
  },
  juneContent: {
    fontSize: 10,
    fontWeight: "700"
  },
  titleContent: {
    marginTop: 20,
    fontWeight: "700",
    fontSize: 16,
    color: "rgba(255, 255, 255, 1)"
  },
  popularGroupend: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  popularDate: {
    flexDirection: "row",
    color: "#fff",
    alignItems: "center"
  },
  imageIcon: {
    width: 16,
    height: 16,
    marginRight: 5
  },
  contentMain: {
    flexDirection: "row",
    alignItems: "center",
  },
  noBookmarksText: {
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
   margin:"20%",
    textAlign: "center", // Center align the text
},

  
  popularGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 10
  },
  card: {
    borderRadius: 8,
    paddingBottom: 20
  },
  popularCalender: {
    width: width * 0.9,
    height: 150,
    padding: 15,
    marginRight: 10,
    justifyContent: 'space-between',
    borderRadius: 10,
    overflow: 'hidden',
  },
  titleText: {
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 12,
    marginVertical: 5,
  },
  locationText: {
    color: '#555555',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#FFAA00',
    borderRadius: 4,
    padding: 6
  },
  hiddenItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    width: 353,
    height: 150,
  },
  hiddenItemButton: {
    width: 60,
    height: 138,
    backgroundColor: 'rgba(246, 176, 39, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  hiddenItemText: {
    width: 30,
    height: 30,
  },
});