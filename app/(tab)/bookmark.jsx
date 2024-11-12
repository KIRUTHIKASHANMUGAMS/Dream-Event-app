import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Frame from "../../assets/images/Frame.png";
import { Ionicons } from '@expo/vector-icons';
import location from "../../assets/images/white-location.png";
import remove from "../../assets/images/remove.png";
import { useTheme } from '../../components/theme/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

export default function App() {
  const swipeListItems = [
    { id: '1', date: '10 JUNE', title: 'Music Concert', location: 'Ellis Fords, Altenwerthberg' },
    { id: '2', date: '10 JUNE', title: 'Music Concert', location: 'Laurels, Fort Adastad' },
    { id: '3', date: '10 JUNE', title: 'Music Concert', location: 'Dietrich Harbors, Markshaven' },
    { id: '4', date: '10 JUNE', title: 'Music Concert', location: 'Dietrich Harbors, Markshaven' },
    { id: '5', date: '10 JUNE', title: 'Music Concert', location: 'Dietrich Harbors, Markshaven' },
    { id: '6', date: '10 JUNE', title: 'Music Concert', location: 'Dietrich Harbors, Markshaven' },
    { id: '7', date: '10 JUNE', title: 'Music Concert', location: 'Dietrich Harbors, Markshaven' },
  ];
  const { isDarkMode } = useTheme();

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.iconContainer}>
      <Icon name="chevron-back" size={24} color={isDarkMode ? 'rgba(255, 255, 255, 1)' : '#000000'} style={styles.arrowIcon} />
      <Text style={[styles.headerText, isDarkMode && styles.darkTitle]}>Bookmark</Text>
      </View>
      <SwipeListCard swipeList={swipeListItems} />
    </View>
  );
}

function SwipeListCard({ swipeList = [] }) {
  const { isDarkMode } = useTheme();
  return (
    <SwipeListView
      data={swipeList}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <ImageBackground source={Frame} resizeMode="cover" style={styles.popularCalender}>
            <View style={styles.popularGroup}>
              <View style={styles.popularDate}>
                <Text style={[styles.titlecontentEvent, isDarkMode && styles.darkTitle]}>
                  10 <Text style={[styles.juneContent, isDarkMode && styles.darkTitle]}>JUNE</Text>
                </Text>
              </View>
              <View>
                <Ionicons name="bookmark" size={20} color="rgba(246, 176, 39, 1)" />
              </View>
            </View>
            <View><Text style={styles.titleContent}>{item.title}</Text></View>
            <View style={styles.popularGroupend}>
              <View style={styles.contentMain}>
                <Image source={location} style={styles.imageIcon} />
                <Text style={styles.titleText}>{item.location}</Text>
              </View>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Book Ticket</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      )}
      renderHiddenItem={({ item }) => (
        <View style={styles.hiddenItemContainer}>
          <TouchableOpacity style={styles.hiddenItemButton}>
            <Image source={remove} style={styles.hiddenItemText} />
          </TouchableOpacity>
        </View>
      )}
      rightOpenValue={-100}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
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
  date: {
    color: '#000000',
    backgroundColor: "rgba(246, 176, 39, 1)",
    width: 45,
    height: 45,
    textAlign: "center",

    fontWeight: 'bold',
    fontSize: 16,
  },
  popularCalender: {
    width: 346,
    height: 150,
    padding: 15,
    marginRight: 10,
    justifyContent: 'space-between',
    borderRadius: 10, // Add border radius for rounded corners
    overflow: 'hidden', // Ensure children do not overflow
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
  buttonText: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: '700',
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
    justifyContent: "center",
    alignItems: 'center',

    textAlign: "center",
    borderRadius: 4,
  },
  hiddenItemText: {
    width: 26,
    height: 26,
    borderRadius: 12,
  },
});
