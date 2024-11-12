import React, { useState, useRef, useEffect, useCallback } from "react";
import { View, StyleSheet, Dimensions, ScrollView, StatusBar, Animated, Image, BackHandler, SafeAreaView } from "react-native";
import { pages } from "../../data/onboard";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import Index2 from "../Index/Index2/Index2";


import {
    
    Outfit_100Thin,
    Outfit_200ExtraLight,
    Outfit_300Light,
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
    Outfit_800ExtraBold,
    Outfit_900Black,
  } from '@expo-google-fonts/outfit';

const { width } = Dimensions.get('window');
SplashScreen.preventAutoHideAsync();

export default function onboard() {
    const swiperRef = useRef(null);
    const totalPages = pages.length;
    const [activePageIndex, setActivePageIndex] = useState(0);
    const [fontsLoaded] = useFonts({
        Outfit_100Thin,
        Outfit_200ExtraLight,
        Outfit_300Light,
        Outfit_400Regular,
        Outfit_500Medium,
        Outfit_600SemiBold,
        Outfit_700Bold,
        Outfit_800ExtraBold,
        Outfit_900Black,
      });
    
    const headingOpacity = useRef(new Animated.Value(1)).current;
    const descriptionOpacity = useRef(new Animated.Value(1)).current;
    const paginationOpacity = useRef(new Animated.Value(1)).current;

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    useEffect(() => {
        if (fontsLoaded) {
            animateContent();
        }
    }, [activePageIndex, fontsLoaded]);

    const animateContent = () => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(headingOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
                Animated.timing(descriptionOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
            ]),
            Animated.parallel([
                Animated.timing(headingOpacity, { toValue: 1, duration: 200, useNativeDriver: true }),
                Animated.timing(descriptionOpacity, { toValue: 1, duration: 200, useNativeDriver: true }),
            ])
        ]).start();
    };

    const handleImageScroll = (event) => {
        const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width);
        setActivePageIndex(pageIndex);
    };

    const handleNextPress = () => {
        const nextIndex = Math.min(activePageIndex + 1, totalPages - 1);
        swiperRef.current.scrollTo({ x: nextIndex * width, animated: true });
        setActivePageIndex(nextIndex);
    };

    const handlePrevPress = () => {
        if (activePageIndex === 0) {
            BackHandler.exitApp();
        } else {
            const prevIndex = Math.max(activePageIndex - 1, 0);
            swiperRef.current.scrollTo({ x: prevIndex * width, animated: true });
            setActivePageIndex(prevIndex);
        }
    };

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView style={styles.safearea} onLayout={onLayoutRootView}>
            <StatusBar translucent />
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                ref={swiperRef}
                onScroll={handleImageScroll}
                scrollEventThrottle={16}
                contentContainerStyle={{ width: width * totalPages }}
                style={styles.scrollView}
            >
                {pages.map((page, index) => (
                    <View key={index} style={[styles.page, { width }]}>
                        <Image source={page.image} style={styles.image} />
                    </View>
                ))}
            </ScrollView>
            <Index2
                pages={pages}
                totalPages={totalPages}
                handleNextPress={handleNextPress}
                handlePrevPress={handlePrevPress}
                activePageIndex={activePageIndex}
                headingOpacity={headingOpacity}
                descriptionOpacity={descriptionOpacity}
                paginationOpacity={paginationOpacity}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safearea: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 20,
    },
});
