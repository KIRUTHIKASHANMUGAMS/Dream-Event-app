import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

import { Image } from 'expo-image';
import React from 'react'
import invite from "../../assets/images/invite-icon.png";
import coins from "../../assets/images/coins.png";
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';

const Invite = () => <Image source={invite} style={styles.icon} />;
const Coins = () => <Image source={coins} style={styles.iconCoin} />;

const SearchComponent = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => router.back()} style={styles.arrowIcon}>
                    <Icon name="chevron-back" size={24} color={'#000000'} />
                </TouchableOpacity>
                <Text style={styles.centerIcon}>Invite Friends</Text>
            </View>

            <View style={styles.imageContainer}>

                <Invite />
                <Text style={styles.mainHeading} >Earn Upto 500 Coins</Text>
                <Text style={styles.textContent}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
            </View>

            <View style={styles.codeContainer}>
                <Text style={styles.codeText}>qubbiely35674yt</Text>
                <TouchableOpacity >
                    <Coins />
                </TouchableOpacity>
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
        marginTop: 20
    },
    codeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: "center",
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        padding: 10,
        width: '100%',
        maxWidth: 400,
        marginTop: 50
    },
    codeText: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        textAlign: "center"
    },

    mainHeading: {
        fontWeight: "800",
        fontSize: 24,
        lineHeight: 30,
        marginTop: 40
    },
    arrowIcon: {
        width: 24,
        height: 24,
        position: 'absolute',
        top: 28,
        left: '0%',
    },
    imageContainer: {
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 104,
    },
    icon: {
        width: 353,
        height: 197
    },
    iconCoin: {
        width: 24,
        height: 24
    },
    textContent: {
        fontWeight: "400",
        textAlign: "center",
        fontSize: 14,
        paddingTop: 20,
        lineHeight: 24
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