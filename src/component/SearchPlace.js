import React from 'react';
import {
    Text,
    TextInput,
    StyleSheet,
    View,
    ActivityIndicator,
    Pressable, Keyboard,
} from 'react-native';

const SearchPlace = (props) => {
    //const PLACE_URL = 'https://api.entur.io/geocoder/v1/autocomplete?size=20&lang=no';
    //const [isLoading, setLoading] = useState(false);
    //const [place, setPlace] = useState(props.isStartPlace ? props.initialPlace.start : props.initialPlace.stop);
    //const [places, setPlaces] = useState('');

    //console.log('SearchPlace, places: ' + JSON.stringify(props.places));

    /*
    const onChangePlace = (newPlace) => {
        setPlace(newPlace);
        console.log('Fetch places');
        //Keyboard.dismiss();
        fetchPlaces();
    };
    */
/*
    const fetchPlaces = async () => {
        try {
            setLoading(true);
            const response = await
                //https://api.entur.io/geocoder/v1/autocomplete?text=jernbane&size=20&lang=no
                //fetch('https://reactnative.dev/movies.json');
                fetch(PLACE_URL + '&text=' + place);
            const json = await response.json();
            console.log('fetch resp:' + json.features);
            setPlaces(json.features);
        } catch (error) {
            console.log('fetch resp failed');
            console.error(error);
        } finally {
            //console.log('fetch resp finally');
            setLoading(false);
        }
    };
*/
/*
    useEffect(() => {
        //setPlace(props.initialPlace);
        //console.log('Rerender with place: ' + props.initialPlace);
        console.log('Inside SearchPlace useEffect: ' + JSON.stringify(places));
        fetchPlaces();
    }, [] );
*/
    //const PlaceNames = [];
    return (
        <View style={styles.placesContainer}>
            {/*<Text style={styles.textHeader}>Search {props.isStartPlace ? 'start' : 'stop'} places</Text>*/}
            <View style={styles.searchContainer}>
                {/*<TextInput style={styles.textInput} onChangeText={setPlace} placeholder="E.g. Ekraveien" value={place}/>*/}
                <TextInput style={styles.textInput}
                           onChangeText={newPlace => props.onChangePlace(newPlace)}
                           placeholder="E.g. Ekraveien"
                           value={props.place}/>
                {/*<View style={styles.buttonContainer}>
                    <Button onPress={onChangePlace2}
                            title="Search"
                            color={'#000000'}
                    />
                </View>*/}
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
        //flexDirection: 'row',
        //flexWrap: 'wrap',
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
        backgroundColor: '#FFFFFFFF'
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
        //color: '#005491FF',
        color: 'black',
        justifyContent: 'center',
    }
});

export default SearchPlace;
