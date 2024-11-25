import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import event from "../../assets/images/event.png";
import arrow from "../../assets/images/arrow.svg";
import icon from "../../assets/images/icon-dream.png";
import healthIcon from "../../assets/images/icon-health.png";
import communityIcon from "../../assets/images/icon-community.png";
import sportsIcon from "../../assets/images/icon-sports.png";
import businessIcon from "../../assets/images/icon-business.png";
import travelIcon from "../../assets/images/icon-travel.png";
import designIcon from "../../assets/images/icon-design.png";
import musicIcon from "../../assets/images/icon-music.png";
import foodIcon from "../../assets/images/icon-food.png";
import educationIcon from "../../assets/images/icon-education.png";
import filmIcon from "../../assets/images/icon-film.png";
import gamingIcon from "../../assets/images/icon-gaming.png";
import Button from '../../components/Button/Button';
import { router } from 'expo-router';
import { chooseEvent } from '../../components/api/chooseEventApi';
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure you import AsyncStorage
import { useTheme } from '../../components/theme/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';



const ChooseEventScreen = () => {
  const [selectedEvents, setSelectedEvents] = useState([]);
  const toast = useToast();

  const { isDarkMode } = useTheme();

  const handleToggleEvent = (value) => {
    setSelectedEvents((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((event) => event !== value) // Deselect
        : [...prevSelected, value] // Select
    );
  };

  const handleSkip=async()=>{
    router.push("/home")
  }
  const handleSubmit = async () => {
    const userId = await AsyncStorage.getItem('@user_id');

    const data = { userId, events: selectedEvents };

    console.log(data);

    try {
      const response = await chooseEvent(data);
      toast.show(response.message, {
        type: 'success',
        placement: 'bottom',
        duration: 3000,
        animationType: 'slide-in',
      });

      setTimeout(() => {
        router.push({
          pathname: "/location",
        });
      }, 3000);

    } catch (err) {
      const errorMessage = err.message || 'Submission failed.';
      toast.show(errorMessage, {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        animationType: 'slide-in',
      });
    }
  };

  const eventOptions = [
    { label: 'Health', value: 'health', icon: healthIcon },
    { label: 'Community', value: 'community', icon: communityIcon },
    { label: 'Sports', value: 'sports', icon: sportsIcon },
    { label: 'Business', value: 'business', icon: businessIcon },
    { label: 'Travel', value: 'travel', icon: travelIcon },
    { label: 'Design', value: 'design', icon: designIcon },
    { label: 'Music & Entertainment', value: 'music', icon: musicIcon },
    { label: 'Food & Drink', value: 'food', icon: foodIcon },
    { label: 'School & Education', value: 'education', icon: educationIcon },
    { label: 'Film & Media', value: 'film', icon: filmIcon },
    { label: 'Gaming', value: 'gaming', icon: gamingIcon },
  ];

  return (
    <ScrollView  contentContainerStyle={[styles.container, isDarkMode && styles.darkContainer]}>
       <View style={styles.iconContainer}>
       <TouchableOpacity onPress={() => router.back()} style={styles.arrowIcon} >
                    <Icon name="chevron-back" size={24} color={isDarkMode ? 'rgba(255, 255, 255, 1)' : '#000000'} />
                </TouchableOpacity>              
                  <Image source={icon} style={styles.centerIcon} />
            </View>
      <Text style={[styles.title, isDarkMode && styles.darkTitle]}>Choose Your Favorite Event</Text>
      <Text style={[styles.description, isDarkMode && styles.darkSubtitle] }>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.
      </Text>
      <Image source={event} style={styles.image} />
      <View style={styles.optionsContainer}>
        {eventOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[styles.optionButton,isDarkMode && styles.darkOption,  selectedEvents.includes(option.value) && styles.selectedOption]}
            onPress={() => handleToggleEvent(option.value)}
          >
            <Image source={option.icon} style={styles.optionIcon} />
            <Text style={[styles.optionText, isDarkMode && styles.darkTitle]}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          buttonText="Skip"
          style={styles.buttonSkip}
          backgroundColor="transparent"
          onPress={handleSkip}
          borderColor="#F6B027"
          textColor={isDarkMode ? "#fff" : "#000000"}
          borderRadius={5}
          width='45%'
        />
        <Button
          buttonText="Finish"
          backgroundColor="#F6B027"
          onPress={handleSubmit}
          textColor="#000000"
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: '#fff',
  },
  iconContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 20,
    marginTop:20
  },
  
  buttonSkip: {
    marginRight: 10,
    fontSize: 18,
    lineHeight: 28,
    fontWeight: 600,
    color: "#000000",
  },
  title: {
    marginTop: 30,
    fontFamily: "Outfit_700Bold",
    fontSize: 30,
    lineHeight: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    marginBottom: 30,
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    color: 'rgba(71,71,71,1)',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  darkOption:{
    backgroundColor: "rgba(64, 64,64, 1)",

  },
  arrowIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 20,
    left: '0%',
  },
  centerIcon: {
    width: 60,
    height: 60,
    top: 20,
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    margin: 5,
    flexDirection: 'row',
  },
  selectedOption: {
    backgroundColor: '#F6B027', // Change to your desired selected color
  },
  optionIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  darkContainer: {
    backgroundColor: "#000000"
},
darkSubtitle: {
    color: "rgba(238, 238, 238, 1)"

},
darkTitle: {
    color: "#fff"
},
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
});

export default ChooseEventScreen;
