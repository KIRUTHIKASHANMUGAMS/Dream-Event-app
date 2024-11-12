import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import React from 'react'
import arrow from "../../assets/images/arrow.svg";
import Button from '../../components/Button/Button';
import helpDisk from "../../assets/images/helpDisk.png";



const HelpDisk = () => <Image source={helpDisk} style={styles.iconCoin} />;

const SearchComponent = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.iconContainer}>
                <Image source={arrow} style={styles.arrowIcon} />
                <Text style={styles.centerIcon}>Need help? Talk to us</Text>
            </View>

            <View style={styles.imageContainer}>

                <HelpDisk />
                <Text style={styles.textContent}>Alternatively, call us on (021) 888888888 or email us applications.support@gmail.com on for futher assistance</Text>


            </View>

            <View style={styles.buttonMain}>
                <View style={styles.buttonContainer}>

           
                <Button
                    buttonText="Chat With Us"
                    style={styles.buttonSkip}
                    backgroundColor="transparent"
                    textColor="#000000"
                    borderColor="#F6B027"
                    borderRadius={5}
                    width='45%'

                />
                <Button
                    buttonText="Send a Email"
                    backgroundColor="#F6B027"
                    textColor="#000000"
                    lineHeight="28"
                    fontFamily="Outfit_600SemiBold"
                    fontWeight="600"

                    borderRadius={8}
                    width='45%'
                />
                     </View>
            </View>
        </ScrollView>
    )
}

export default SearchComponent

const styles = StyleSheet.create({

    iconContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: 20,
    },
    textContent: {
        fontWeight: "400",
        textAlign: "center",
        fontSize: 14,
        paddingTop: 20,
        lineHeight: 24
    },
    iconCoin: {
        width: 273,
        height: 273
    },
    buttonSkip: {
        marginRight: 10,
        fontSize: 18,
        lineHeight: 28,
        fontWeight: 600,
        textColor: "#000000",

    },

    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
    },
    buttonMain: {
        flex: 1,
        justifyContent: "flex-end",
        gap: 10,
    },
    imageContainer: {
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 50,
    },
    arrowIcon: {
        width: 24,
        height: 24,
        position: 'absolute',
        top: 28,
        left: '0%',
    },
    centerIcon: {

        top: 20,
        fontWeight: "700",
        fontSize: 24,
        lineHeight: 34
    },
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
})