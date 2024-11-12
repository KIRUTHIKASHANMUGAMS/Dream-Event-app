import React from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from "expo-router";
import Button from '../../Button/Button';

const Index3 = ({ activePageIndex, totalPages, handleNextPress, handlePrevPress }) => {

  const handleCreateAccountPress = () => {
    router.push('/onboardLogin');
  };

  return (
    <View style={styles.page_button_container}>
      {activePageIndex === totalPages - 1 ? (
        <View style={{ width: '100%' }}>
          <Button buttonText="Get Started" textColor="#000000"
            onPress={handleCreateAccountPress} />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Button
            buttonText="Skip"
            style={styles.buttonSkip}
            onPress={handleCreateAccountPress}
            backgroundColor="transparent"
            borderColor="#F6B027"
            borderRadius={5}
            width='45%'

          />
          <Button
            buttonText="Next"
            onPress={handleNextPress}
            backgroundColor="#F6B027"
            textColor="#000000"
            lineHeight="28"
            fontFamily="Outfit_600SemiBold"
            fontWeight="600"

            borderRadius={8}
            width='45%'
          />
        </View>
      )}
    </View>
  );
};

export default Index3;

const styles = StyleSheet.create({
  page_button_container: {
    marginBottom: 37,
    paddingTop: 10,
    width: '100%',

  },

  buttonSkip: {
    marginRight: 10,
    fontSize: 18,
    lineHeight: 28,
    fontWeight: 600,
    textColor: "#ffffff",

  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
});
