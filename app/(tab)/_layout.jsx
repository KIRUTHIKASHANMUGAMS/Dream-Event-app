import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Tabs, router } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Home from '../../assets/images/tabImage/home';
import Explore from '../../assets/images/tabImage/explore';
import Ticket from '../../assets/images/tabImage/ticket';
import BookMark from '../../assets/images/tabImage/bookMark';
import Person from '../../assets/images/tabImage/person';
import { useTheme } from "../../components/theme/ThemeContext";


const TabBarButton = ({ children, onPress, accessibilityState, title }) => {
    const isSelected = accessibilityState.selected;
    const { isDarkMode } = useTheme();

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.tabButton,
                isSelected ? styles.activeTabButton : null,
            ]}
            accessibilityLabel={title}
        >
            <View style={[styles.iconContainer, isSelected ? styles.activeIconContainer : null]}>
                {children}
                <Text style={[styles.title, isDarkMode && styles.darkTitle, isSelected ? styles.active_text : null]}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};
const TabsLayout = () => {
    const { isDarkMode } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? "#000000" : "#ffffff" }]}>

            <Tabs
                screenOptions={({ route }) => ({
                    tabBarShowLabel: false,
                    tabBarButton: (props) => (
                        <TabBarButton {...props} title={route.name} />
                    ),
                    tabBarStyle: [styles.tabBar, isDarkMode && styles.darkTabbarContainer],
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        let IconComponent;

                        switch (route.name) {
                            case 'home':
                                IconComponent = <Home color={focused && "rgba(246, 176, 39, 1)"} />
                                break;
                            case 'explore':
                                IconComponent = <Explore color={focused && "rgba(246, 176, 39, 1)"} />;
                                break;
                            case 'ticket':
                                IconComponent = <Ticket color={focused && "rgba(246, 176, 39, 1)"} />;
                                break;
                            case 'bookmark':
                                IconComponent = <BookMark color={focused && "rgba(246, 176, 39, 1)"} />;
                                break;
                            case 'profile':
                                IconComponent = <Person color={focused && "rgba(246, 176, 39, 1)"} />;
                                break;
                            default:
                                IconComponent = null;
                                break;
                        }

                        return IconComponent ? IconComponent : null;
                    }

                })}
            >
                <Tabs.Screen name="home" options={{ title: 'Home' }} />
                <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
                <Tabs.Screen name="ticket" options={{ title: 'Ticket' }} />
                <Tabs.Screen name="bookmark" options={{ title: 'Bookmark' }} />
                <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
            </Tabs>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        position: 'relative',
    },
    circle: {
        position: 'absolute',
        bottom: 50,
        left: '42%',
        width: 58,
        height: 58,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        borderRadius: 100,
    },
    tabBar: {
        width: '100%',
        maxHeight: 85,
        height: '100%',
        borderTopWidth: 0,
        elevation: 0,
        borderRadius: 10,

        paddingTop: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    darkTabbarContainer: {
        backgroundColor: "#000000",
        color: '#fff'
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    darkTitle: {
        color: "#fff"
    },
    iconContainer: {
        maxHeight: 40,
    },
    activeIconContainer: {},
    activeTabButton: {
        gap: 15,
    },
    title: {
        marginTop: 3,
        color: 'rgba(71, 71, 71, 1)',
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 16,
        fontFamily: 'Outfit_400Regular',
        textTransform: 'capitalize',
    },
    active_text: {
        fontSize: 12,
        lineHeight: 16,
        fontFamily: 'Outfit_400Regular',
        color: 'rgba(246, 176, 39, 1)',
    }
});

export default TabsLayout;
