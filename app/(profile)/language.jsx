import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { Image } from 'expo-image';
import arrow from "../../assets/images/arrow.svg";
import Button from '../../components/Button/Button';


const SearchComponent = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("English");
    const handleSelect = (method) => {
        setSelectedPaymentMethod(method);
    };
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.iconContainer}>
                <Image source={arrow} style={styles.arrowIcon} />
                <Text style={styles.centerIcon}>Choose the Language</Text>
            </View>



            <View style={styles.mainContent}>
                <Text style={styles.contentText}>Suggested</Text>

                <TouchableOpacity style={styles.eventAddress} onPress={() => handleSelect('Mandarin')}>
                    <Text style={styles.eventtext}>

                        <Text style={styles.paymentText}> Mandarin</Text>
                    </Text>
                    <View style={styles.radioButton}>
                        {selectedPaymentMethod === 'Mandarin' && <View style={styles.selectedCircle} />}
                    </View>
                </TouchableOpacity>


                <TouchableOpacity style={styles.eventAddress} onPress={() => handleSelect('English')}>
                    <Text style={styles.eventtext}>

                        <Text style={styles.paymentText}> English (UK)</Text>
                    </Text>
                    <View style={styles.radioButton}>
                        {selectedPaymentMethod === 'English' && <View style={styles.selectedCircle} />}
                    </View>
                </TouchableOpacity>


                <Text style={styles.contentText}>Others</Text>


                <TouchableOpacity style={styles.eventAddress} onPress={() => handleSelect('Hindi')}>
                    <Text style={styles.eventtext}>

                        <Text style={styles.paymentText}>Hindi</Text>
                    </Text>
                    <View style={styles.radioButton}>
                        {selectedPaymentMethod === 'Hindi' && <View style={styles.selectedCircle} />}
                    </View>
                </TouchableOpacity>



                <TouchableOpacity style={styles.eventAddress} onPress={() => handleSelect('Spanish')}>
                    <Text style={styles.eventtext}>

                        <Text style={styles.paymentText}>Spanish</Text>
                    </Text>
                    <View style={styles.radioButton}>
                        {selectedPaymentMethod === 'Spanish' && <View style={styles.selectedCircle} />}
                    </View>
                </TouchableOpacity>



                
                <TouchableOpacity style={styles.eventAddress} onPress={() => handleSelect('French')}>
                    <Text style={styles.eventtext}>

                        <Text style={styles.paymentText}>French</Text>
                    </Text>
                    <View style={styles.radioButton}>
                        {selectedPaymentMethod === 'French' && <View style={styles.selectedCircle} />}
                    </View>
                </TouchableOpacity>


                
                
                <TouchableOpacity style={styles.eventAddress} onPress={() => handleSelect('Arabic')}>
                    <Text style={styles.eventtext}>

                        <Text style={styles.paymentText}>Arabic</Text>
                    </Text>
                    <View style={styles.radioButton}>
                        {selectedPaymentMethod === 'Arabic' && <View style={styles.selectedCircle} />}
                    </View>
                </TouchableOpacity>


                        
                <TouchableOpacity style={styles.eventAddress} onPress={() => handleSelect('Russian')}>
                    <Text style={styles.eventtext}>

                        <Text style={styles.paymentText}>Russian</Text>
                    </Text>
                    <View style={styles.radioButton}>
                        {selectedPaymentMethod === 'Russian' && <View style={styles.selectedCircle} />}
                    </View>
                </TouchableOpacity>


                
                        
                <TouchableOpacity style={styles.eventAddress} onPress={() => handleSelect('Indonesia')}>
                    <Text style={styles.eventtext}>

                        <Text style={styles.paymentText}>Indonesia</Text>
                    </Text>
                    <View style={styles.radioButton}>
                        {selectedPaymentMethod === 'Indonesia' && <View style={styles.selectedCircle} />}
                    </View>
                </TouchableOpacity>


                        
                <TouchableOpacity style={styles.eventAddress} onPress={() => handleSelect('Vietnamese')}>
                    <Text style={styles.eventtext}>

                        <Text style={styles.paymentText}>Vietnamese</Text>
                    </Text>
                    <View style={styles.radioButton}>
                        {selectedPaymentMethod === 'Vietnamese' && <View style={styles.selectedCircle} />}
                    </View>
                </TouchableOpacity>

            

            </View>
            <View style={styles.buttonContainer}>
                <Button
                    buttonText="Save"
                    backgroundColor="rgba(246,176,39,1)"
                    textColor="#000000"
                    lineHeight="28"
                    fontFamily="Outfit_600SemiBold"
                    fontWeight="600"
                    borderRadius={8}
                    width='100%'
                />

            </View>
        </ScrollView>
    )
}

export default SearchComponent

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    contentText: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: "900"
    },
    mainContent: {
        gap: 20,
        marginTop: 30
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "flex-end",
        gap: 10,
    },
    eventtext: {
        fontWeight: "700",
        fontSize: 14,
        lineHeight: 24,
        color: "rgba(71, 71, 71, 1)",
    },
    selectedCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'rgba(246, 176, 39, 1)',
    },
    eventAddress: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        gap: 20,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgba(246, 176, 39, 1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paymentText: {

        fontWeight: "400",
        fontSize: 14,
        lineHeight: 24,
        color: "rgba(0, 0, 0, 1)",
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
        top: 28,
        left: '0%',
    },
    centerIcon: {

        top: 20,
        fontWeight: "700",
        fontSize: 24,
        lineHeight: 34
    },
})