import React from 'react';
import {
    Text,
    TextInput,
    StyleSheet,
    View,
    ActivityIndicator,
    Pressable,
} from 'react-native';

const SearchPlace = (props) => {
    return (
        <View style={styles.placesContainer}>
            <View style={styles.searchContainer}>
                <TextInput style={styles.textInput}
                           onChangeText={newPlace => props.onChangePlace(newPlace)}
                           placeholder="E.g. Ekraveien"
                           value={props.place}/>
            </View>

            <View style={styles.resultPlacesContainer}>
                {!props.places ? <Text/> :
                    props.isLoading ? <ActivityIndicator/> :
                        props.places.map((feature) => {
                            if (Array.isArray(feature?.properties?.category) && feature.properties?.category?.includes('metroStation')) {
                                const label = props.isStartPlace ? 'start' : 'stop';
                                console.log(label + ' name: ' + JSON.stringify(feature.properties?.name));
                                console.log(label + ' place id: ' + JSON.stringify(feature.properties?.id));
                                return (
                                    <Pressable key={feature.properties?.id}
                                               onPress={() => props.onPressPlace(feature.properties)}
                                               style={styles.resultPlacesButton}>
                                        <Text key={feature.properties?.id}
                                              style={styles.placesText}>{feature.properties?.name}</Text>
                                    </Pressable>

                                );
                            }
                        })
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    placesContainer: {
        marginLeft: 10,
        marginRight: 10,
        margin: 10,
        borderWidth:0,
    },
    textHeader: {
        fontSize: 14,
        fontWeight: '600',
        padding: 10,
        paddingBottom: 0,
    },
    searchContainer: {
        flexDirection: 'row',
    },
    textInput: {
        flex: 3,
        height: 40,
        marginLeft: 10,
        marginRight: 20,
        margin: 5,
        borderWidth: 1,
        borderColor: '#BEBEBE',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#FFFFFFFF',
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'center',
        padding: 0,
        margin: 5,
        borderRadius: 10,
    },
    resultPlacesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    resultPlacesButton: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        paddingLeft: 0,
        paddingRight: 0,
        marginTop: 2,
        marginBottom: 5,
        marginLeft: 10,
        borderRadius: 15,
        backgroundColor: '#96D3FFFF',
    },
    placesText: {
        marginLeft: 0,
        padding: 0,
        fontSize: 15,
        fontWeight: '600',
        color: 'black',
        justifyContent: 'center',
    },
});

export default SearchPlace;
