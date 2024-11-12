import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.locationText}>Current Location</Text>
                <Text style={styles.title}>MAKE YOUR PARTY PLANS</Text>
                <TextInput style={styles.searchInput} placeholder="Search" />
            </View>

            <ScrollView>
                <View style={styles.categoryContainer}>
                    <TouchableOpacity style={styles.categoryButton}>
                        <Text style={styles.categoryText}>Music & Entertainment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}>
                        <Text style={styles.categoryText}>Sports</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}>
                        <Text style={styles.categoryText}>Film</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>Upcoming Events</Text>
                <View style={styles.eventContainer}>
                    <EventCard title="Chapter Elvis" date="10 JUN" price="$30.00" />
                    <EventCard title="Cheering" date="10 JUN" price="$20.00" />
                </View>

                <Text style={styles.sectionTitle}>Popular Events</Text>
                <View style={styles.eventContainer}>
                    <EventCard title="Club Hell Yea" date="08 OCT 2024" price="Book Ticket" />
                    <EventCard title="Let's Dance" date="15 SEP 2024" price="Book Ticket" />
                </View>

                <Text style={styles.sectionTitle}>Nearby Events</Text>
                <View style={styles.eventContainer}>
                    <EventCard title="Gliding Lights Children" date="10 JUN" price="Book Ticket" />
                    <EventCard title="Gretels" date="12 JUN" price="Book Ticket" />
                </View>
            </ScrollView>
        </View>
    );
};

const EventCard = ({ title, date, price }) => (
    <View style={styles.eventCard}>
        <Text style={styles.eventTitle}>{title}</Text>
        <Text style={styles.eventDate}>{date}</Text>
        <Text style={styles.eventPrice}>{price}</Text>
    </View>
);

const App = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} options={{
                    tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
                }} />
                {/* Add other tabs/screens here */}
            </Tab.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        marginBottom: 20,
    },
    locationText: {
        fontSize: 14,
        color: '#666',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    categoryButton: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    categoryText: {
        color: '#333',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    eventContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    eventCard: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 10,
        width: '45%',
        marginBottom: 10,
    },
    eventTitle: {
        fontWeight: 'bold',
    },
    eventDate: {
        color: '#666',
    },
    eventPrice: {
        color: '#ff6347',
        marginTop: 5,
    },
});

export default App;
