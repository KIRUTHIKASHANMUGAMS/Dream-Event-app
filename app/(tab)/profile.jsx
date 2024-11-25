import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing Ionicons
import { Image } from 'expo-image';
import Profile from "../../assets/images/profile-image.png";
import User from "../../assets/images/profileImage/User";
import DarkMode from "../../assets/images/profileImage/DarkMode"
import Notification from "../../assets/images/profileImage/Notification";
import Language from "../../assets/images/profileImage/Language";
import Invite from "../../assets/images/profileImage/Invite";
import Center from "../../assets/images/profileImage/Center";
import Camera from "../../assets/images/profileImage/Camera";
import Button from "../../components/Button/Button";
import { router } from 'expo-router';
import { useTheme } from "../../components/theme/ThemeContext";

const Profiles = () => <Image source={Profile} style={styles.profileImage} />;


const ProfileScreen = () => {
  const [notification, setNotification] = React.useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();


  const toggleSwitchNotification = () => setNotification(previousState => !previousState);
  const trackColor = {
    false: "#767577",
    true: "rgba(255, 255, 255, 1)",
  };

  const thumbColor = isDarkMode ? "#f5dd4b" : "rgba(255, 255, 255, 1)";

  return (
    <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.arrowIcon}>
          <Icon name="chevron-back" size={24} color={isDarkMode ? 'rgba(255, 255, 255, 1)' : '#000000'} />
        </TouchableOpacity>

        <Text style={[styles.centerIcon, isDarkMode && styles.darkText]}>Profile</Text>
      </View>

      <View style={styles.image_box}>
        <View style={styles.image_container}>
          <Profiles />
          <TouchableOpacity style={[styles.circle]}>
            <Camera />
          </TouchableOpacity>
        </View>

        <Text style={[styles.profileName, isDarkMode && styles.darkText]}>Robert</Text>
        <Text style={[styles.profileEmail, isDarkMode && styles.darkText]}>abc@gmail.com</Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={() => router.push("(profile)/changeProfile")} style={[styles.option, isDarkMode && styles.DarkOption]}>
          <View style={styles.picIcon}>
            <User />

            <Text style={[styles.optionText, isDarkMode && styles.darkText]}>Profile</Text>
          </View>
          <Icon name="chevron-forward" size={24} color={isDarkMode ? 'rgba(255, 255, 255, 1)' : '#000000'} />
        </TouchableOpacity>

        <View style={[styles.option, isDarkMode && styles.DarkOption]}>
          <View style={styles.picIcon}>
            <Notification />
            <Text style={[styles.optionText, isDarkMode && styles.darkText]}>Notification</Text>
          </View>
          <Switch
            value={notification}
            onValueChange={toggleSwitchNotification}
            style={styles.switch}
          />
        </View>

        <View style={[styles.option, isDarkMode && styles.DarkOption]}>
          <View style={styles.picIcon}>
            <DarkMode />
            <Text style={[styles.optionText, isDarkMode && styles.darkText]}>Dark Mode</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            trackColor={trackColor}
            thumbColor={thumbColor}

            style={styles.switch}
          />
        </View>

        <TouchableOpacity style={[styles.option, isDarkMode && styles.DarkOption]} onPress={() => router.push("(profile)/language")}>
          <View style={styles.picIcon}>
            <Language />
            <Text style={[styles.optionText, isDarkMode && styles.darkText]}>Language</Text>
          </View>
          <Icon name="chevron-forward" size={24} color={isDarkMode ? '#ffffff' : '#000000'} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.option, isDarkMode && styles.DarkOption]} onPress={() => router.push("(profile)/inviteFriend")}>
          <View style={styles.picIcon}>
            <Invite />
            <Text style={[styles.optionText, isDarkMode && styles.darkText]}>Invite Friends</Text>
          </View>
          <Icon name="chevron-forward" size={24} color={isDarkMode ? '#ffffff' : '#000000'} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.option, isDarkMode && styles.DarkOption]} onPress={() => router.push("(profile)/helpCenter")}>
          <View style={styles.picIcon}>
            <Center />
            <Text style={[styles.optionText, isDarkMode && styles.darkText]}>Help Center</Text>
          </View>
          <Icon name="chevron-forward" size={24} color={isDarkMode ? '#ffffff' : '#000000'} />
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <Button
            buttonText="LogOut"
            backgroundColor="rgba(246,176,39,1)"
            textColor="#000000"
            lineHeight="28"
            fontFamily="Outfit_600SemiBold"
            fontWeight="600"
            borderRadius={8}
            width='100%'
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  darkContainer: {
    backgroundColor: '#000000',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 19,
    height: 18,
  },
  image_box: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  cameraIcon: {
    width: 13,
    height: 11

  },
  darkText: {
    color: '#fff',
  },
  switch: {
    width: 39,
    height: 20,

  },
  circle: {
    position: 'absolute',
    backgroundColor: "rgba(246, 176, 39, 1)",
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    width: 30,
    height: 30,
    right: 0,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#888',
  },
  optionsContainer: {
    marginTop: 20,
  },
  picIcon: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    alignContent: "center",
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: "rgba(241, 241, 241, 1)",
    marginBottom: 20


  },
  DarkOption: {
    backgroundColor: "rgba(64, 64, 64, 1)",

  },

  optionText: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "500",
    marginLeft: 20
  },
  buttonContainer: {
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: '#f39c12',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  arrowIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 20,
    left: '0%',
  },
  centerIcon: {

    top: 20,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',


    marginBottom: 10,
  },
  iconContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 20,
  },


});

export default ProfileScreen;
