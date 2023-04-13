import React, {useState, useEffect} from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import FetchTravel from './FetchTravel';
import SearchPlace from './SearchPlace';
import {View, Keyboard, Text, Pressable, StyleSheet, TouchableOpacity, Image, Button} from 'react-native';

const Travel = () => {
    const PLACE_URL = 'https://api.entur.io/geocoder/v1/autocomplete?size=20&lang=no';
    const ICON_SWAP_URL = 'https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Aswap_vert%3AFILL%400%3Bwght%40400%3BGRAD%400%3Bopsz%4048';
    const INITIAL_START_PLACE = 'Ekraveien';
    const INITIAL_STOP_PLACE = 'Jernbanetorget';
    const INITIAL_START_PLACE_ID = 'NSR:StopPlace:59764';
    const INITIAL_STOP_PLACE_ID = 'NSR:StopPlace:58366';

    const [startPlace, setStartPlace] = useState(INITIAL_START_PLACE);
    const [stopPlace, setStopPlace] = useState(INITIAL_STOP_PLACE);
    const [startPlaceId, setStartPlaceId] = useState(INITIAL_START_PLACE_ID);
    const [stopPlaceId, setStopPlaceId] = useState(INITIAL_STOP_PLACE_ID);

    const [startPlaces, setStartPlaces] = useState('');
    const [stopPlaces, setStopPlaces] = useState('');

    const [isLoadingStartPlace, setLoadingStartPlace] = useState(false);
    const [isLoadingStopPlace, setLoadingStopPlace] = useState(false);

    const [isResetStopPlace, setResetStopPlace] = useState(false);

    const client = new ApolloClient({
        uri: 'https://api.entur.io/journey-planner/v3/graphql/',
        cache: new InMemoryCache(),
    });

    const onPressStartPlace = (startPlace) => {
        console.log('Selected start place Id: ' + startPlace.id);
        console.log('Selected start place Name: ' + startPlace.name);
        setStartPlace(startPlace.name);
        setStartPlaceId(startPlace.id);
        Keyboard.dismiss();
    };

    const onPressStopPlace = (stopPlace) => {
        console.log('Selected stop place Id: ' + stopPlace.id);
        console.log('Selected stop place Name: ' + stopPlace.name);
        setStopPlace(stopPlace.name);
        setStopPlaceId(stopPlace.id);
        Keyboard.dismiss();
    };

    const onChangeStartPlace = (newStartPlace) => {
        setStartPlace(newStartPlace);
        console.log('Fetch start places');
    };

    const onChangeStopPlace = (newStopPlace) => {
        setStopPlace(newStopPlace);
        console.log('Fetch stop places');
    };

    const fetchPlaces = async (place, retries) => {
        try {
            const response = await fetch(PLACE_URL + '&text=' + place);
            const json = await response.json();
            console.log('retries: ' + retries);
            console.log('Fetch resp: ' + place + ' : ' + json.features);

            if (response.ok) {
                return json.features;
            }

            if (!json.features && retries > 0) {
                console.log('##### Empty fetch respons, retry: ' + retries);
                return fetchPlaces(place, retries - 1);
            }
            return json.features;
        } catch (error) {
            console.log('fetch resp failed');
            console.error(error);
        } finally {
            console.log('fetch resp finally');
        }
    };

    const swap = () => {
        console.log('Do swap places');
        setStartPlace(stopPlace);
        setStopPlace(startPlace);
        setStartPlaceId(stopPlaceId);
        setStopPlaceId(startPlaceId);
    };

    const resetStopPlaces = () => {
        console.log('Reset stop places1');
        setResetStopPlace(true);

        //setStartPlace(INITIAL_STOP_PLACE);
        setStartPlace(INITIAL_START_PLACE);
        setStopPlace(INITIAL_STOP_PLACE);
        setStartPlaceId(INITIAL_START_PLACE_ID);
        setStopPlaceId(INITIAL_STOP_PLACE_ID);
    };

    useEffect(() => {
        console.log('useEff start');
        setLoadingStartPlace(true);
        fetchPlaces(startPlace, 3)
            .then(startPlaces => {
                if (!startPlaces?.length) {
                    console.log('Empty start places');
                }
                setStartPlaces(startPlaces);
            })
            .finally(() => {
                console.log('fetch start resp finally');
                setLoadingStartPlace(false);
                setResetStopPlace(false);
            });
    }, [startPlace, startPlaceId, isResetStopPlace]);

    useEffect(() => {
        console.log('useEff stop');
        setLoadingStopPlace(true);
        fetchPlaces(stopPlace, 3)
            .then(stopPlaces => {
                if (!stopPlaces?.length) {
                    console.log('Empty stop places');
                }
                setStopPlaces(stopPlaces);
            })
            .finally(() => {
                console.log('fetch stop resp finally');
                setLoadingStopPlace(false);
                setResetStopPlace(false);
            });
    }, [stopPlace, stopPlaceId, isResetStopPlace]);
    return (
      <View style={styles.container}>
          <View style={styles.resetContainer}>
              <Text style={styles.sectionTitle}> Finn T-bane</Text>
              <TouchableOpacity
                  style={styles.swapButton}
                  onPress={() => resetStopPlaces()}>
                  <Image source={require('./asset/reset.png')}/>
              </TouchableOpacity>
          </View>

          <View style={styles.placesContainer}>
              <Text style={styles.textHeader}>Fra T-bane stasjon</Text>
              <SearchPlace
                  isLoading={isLoadingStartPlace}
                  place={startPlace}
                  places={startPlaces}
                  onChangePlace={onChangeStartPlace}
                  onPressPlace={onPressStartPlace}
                  isStartPlace={true}/>
          </View>

          <TouchableOpacity
              style={styles.swapButton}
              onPress={() => swap()}>
              <Image source={require('./asset/sort.png')}/>
          </TouchableOpacity>

          <View style={styles.placesContainer}>
              <Text style={styles.textHeader}>Til T-bane stasjon</Text>
              <SearchPlace
                  isLoading={isLoadingStopPlace}
                  place={stopPlace}
                  places={stopPlaces}
                  onChangePlace={onChangeStopPlace}
                  onPressPlace={onPressStopPlace}
                  isStartPlace={false}/>
          </View>

          <View style={styles.timeContainer}>
              <ApolloProvider client={client}>
                  <FetchTravel startPlaceId={startPlaceId} stopPlaceId={stopPlaceId}/>
              </ApolloProvider>
          </View>
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E8E8E8',
        marginBottom: 0,
        height: '100%',
        //flexDirection: 'row',
        //flexWrap: 'wrap',
    },
    resetContainer: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        //flexWrap: 'wrap',
        //alignContent: 'space-between',
        //alignItems: 'flex-end',
    },
    sectionTitle: {
        paddingLeft: 10,
        paddingTop: 10,
        fontSize: 24,
        fontWeight: '600',
    },
    placesContainer: {
        backgroundColor: '#F5EFDCFF',
        marginLeft: 10,
        marginRight: 10,
        margin: 2,
        borderWidth:1,
        borderColor: '#BEBEBE',
        borderRadius: 10,
        //flexDirection: 'row',
        //flexWrap: 'wrap',
    },
    swapButton: {
        width: 40,
        height: 40,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        paddingLeft: 0,
        paddingRight: 0,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#BEBEBE',
        borderRadius: 10,
        backgroundColor: '#96D3FFFF',
    },
    swapText: {
        marginLeft: 0,
        padding: 0,
        fontSize: 15,
        fontWeight: '600',
        color: '#005491FF',
        justifyContent: 'center',
    },
    textHeader: {
        fontSize: 14,
        fontWeight: '600',
        padding: 5,
        paddingBottom: 0,
        /*textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',*/
    },
    timeContainer: {
        marginLeft: 10,
        margin: 10,
        //display: 'flex',
        //height: 1200,
        //flex: 1,
        flexDirection: 'row',
        //flexWrap: 'wrap',
        //alignContent: 'space-evenly',
        //justifyContent: 'space-around',
        //alignItems: 'stretch',
    },
});

export default Travel;
