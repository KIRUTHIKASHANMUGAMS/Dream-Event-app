import React from 'react';
import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native';
import Pagination from '../../Pagination/Pagination';
import Index3 from '../Index3/Index3';

const { width } = Dimensions.get('window');

const Index2 = ({ pages, totalPages, handleNextPress, handlePrevPress, activePageIndex, headingOpacity, descriptionOpacity, paginationOpacity }) => {
    return (
        <View style={styles.onboard_content}>
            <View style={styles.onboard_inside_content}>

                <Animated.Text style={[styles.heading, { opacity: headingOpacity }]}>
                    {pages[activePageIndex].heading}
                </Animated.Text>
                <Animated.Text style={[styles.description, { opacity: descriptionOpacity }]}>
                    {pages[activePageIndex].text}
                </Animated.Text>
                <Animated.View style={{ opacity: paginationOpacity }}>
                    <Pagination activePageIndex={activePageIndex} totalPages={totalPages} dotBackgroundColor="#E6E6FA" activeDotBackgroundColor="#F6B027" />
                </Animated.View>
                <Index3
                    activePageIndex={activePageIndex}
                    totalPages={totalPages}
                    handleNextPress={handleNextPress}
                    handlePrevPress={handlePrevPress}
                />
            </View>

        </View>
    );
};

export default Index2;

const styles = StyleSheet.create({
    onboard_content: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: '5%',
        paddingVertical: '5%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    onboard_inside_content: {
        alignItems: 'center',
    },
    heading: {
        fontSize: 30,
        lineHeight: 35,
        fontWeight: 800,
        textAlign: 'center',
        paddingTop: 30,
        paddingBottom: 16,
        color: '#FFFFFF', // Change to white for better contrast


    },
    description: {
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center',
        marginBottom: 30,
        color: '#E6E6FA', // Change to a lighter color for better contrast
    },
});
