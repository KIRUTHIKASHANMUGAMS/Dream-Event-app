import React from 'react';
import { Text, View, TouchableOpacity ,StyleSheet} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';


export default function SwipeListCard({
    swipeList = [],
}) {
    return (
        <>
            <SwipeListView
                data={swipeList}
                height={430}
                renderItem={(data, index) => (
                    <View key={index} style={styles.renderItemContainer}>
                        <View style={styles.listCard}>
                            <Text style={styles.listCardTextOne}>{data.item}</Text>
                            <Text>{'<----'}</Text>
                        </View>
                    </View>
                )}
                renderHiddenItem={(data, index) => (
                    <View style={styles.hiddenItemContainer}>
                
                        <TouchableOpacity style={[ styles.hiddenItemButton ]}>
                            <Text style={styles.hiddenItemText}>Delete</Text>
                        </TouchableOpacity>
                    
                    </View>
                )}
                rightOpenValue={-230}
            />
        </>
    );
}

const styles = StyleSheet.create({
    renderItemContainer: {
        marginVertical: 10,
    },
    listCard: {
        backgroundColor: '#F8F7F1',
        borderWidth: 1,
        borderRadius: 8,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listCardTextOne: {
        color: '#000000',
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    hiddenItemContainer: {
        marginVertical: 16,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    hiddenItemButton: {
        marginRight: 10,
        backgroundColor: '#191919',
        borderRadius: 4,
        padding: 10,
    },
    hiddenItemText: {
        color: '#FFFFFF',
        height: 20,
    },
})