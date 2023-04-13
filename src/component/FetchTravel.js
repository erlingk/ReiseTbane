import React, {useEffect, useState} from 'react';
import {Text, FlatList, StyleSheet, View, ScrollView, ActivityIndicator, Pressable} from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { format, subHours } from 'date-fns';
import TimeView from './TimeView';

const FetchTravel = (props) => {
    const GET_TRAVEL2 = gql`
  query Trip($fromPlace: String!,
             $toPlace: String!,
             $date: DateTime!) {
  trip(
    from: {
      place: $fromPlace
    },
    to: {
      place: $toPlace
    },
    modes: {
      transportModes: [{
        transportMode: rail
      }]
    },
    dateTime: $date
  ) {
    tripPatterns {
      duration
      walkDistance
      legs {
        expectedStartTime
        expectedEndTime
        mode
        distance
        line {
          id
          publicCode
        }
      }
    }
  }
  }
 `;

    const GET_TRAVEL3 = gql`
  query Trip($fromPlace: String!,
             $toPlace: String!) {
  trip(
    from: {
      place: $fromPlace
    },
    to: {
      place: $toPlace
    }
  ) {
    tripPatterns {
      duration
      walkDistance
      legs {
        expectedStartTime
        expectedEndTime
        mode
        distance
        line {
          id
          publicCode
        }
      }
    }
  }
  }
 `;

    const GET_TRAVEL4 = gql`
  query Trip($fromLat: Float!,
             $fromLong: Float!,
             $toLat: Float!,
             $toLong: Float!) {
  trip(
    from: {
      coordinates: {
        latitude: $fromLat
        longitude: $fromLong
      }
    },
    to: {
      coordinates: {
        latitude: $toLat
        longitude: $toLong
      }
    },
    modes: {
      accessMode: foot
      egressMode: foot
      transportModes: [{
        transportMode: metro
        transportSubModes: [metro]
      }]
    }
  ) {
    tripPatterns {
      aimedStartTime
      aimedEndTime
      legs {
        mode
        distance
        aimedStartTime
        aimedEndTime
        line {
          id
          publicCode
        }
      }
    }
  }
  }
 `;

    const GET_TRAVEL = gql`
  query Trip($fromPlace: String!,
             $toPlace: String!) {
  trip(
    from: {
      place: $fromPlace
    },
    to: {
      place: $toPlace
    },
    modes: {
      accessMode: foot
      egressMode: foot
      transportModes: [{
        transportMode: metro
        transportSubModes: [metro]
      }]
    }
  ) {
    tripPatterns {
      legs {
        mode
        distance
        expectedStartTime
        aimedStartTime
        aimedEndTime
        expectedEndTime
        line {
          id
          publicCode
        }
      }
    }
  }
  }
 `;

    const DT_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx";
    const rawDate = new Date();
    //console.log('Raw date: ' + rawDate);
    const date = format(rawDate, DT_FORMAT);
    const dateSub = format(subHours(rawDate, 2), DT_FORMAT);


    //console.log('Sub 2 hour. ' + dateSub);
    const toPlace = 'NSR:StopPlace:385';
    //console.log('toplace: ' + toPlace);
/*
start name: "Ekraveien"
start place id: "NSR:StopPlace:59764"
stop name: "Jernbanetorget"
stop place id: "NSR:StopPlace:58366"
 */

    const fromLat = 59.950611;
    const fromLong = 10.637662;
    const toLat = 59.911898;
    const toLong = 10.75038;

    //date: '2022-12-07T17:35:58.648+01:00',
    //date: '2022-12-15T12:29:34.385+01:00',
    /*
    query Trip($fromPlace: String!,
             $toPlace: String!) {
     */

    console.log('fetchtr start id: ' + props.startPlaceId);
    console.log('fetchtr stop id: ' + props.stopPlaceId);

    const { loading, error, data } = useQuery(GET_TRAVEL, {
        /*variables: { fromLat: fromLat,
                     fromLong: fromLong,
                     toLat: toLat,
                     toLong: toLong,
                     date: '2022-12-07T17:35:58.648+01:00',*/
        variables: {
            fromPlace: props.startPlaceId,
            toPlace: props.stopPlaceId,
        },
        context: {
            headers: {
                'ET-Client-Name': 'erling-test',
            },
        },
    });

    /*const getFormattedTime = (date) => {
        return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };*/

  if (loading) {return <Text>Loading...</Text>;}
  if (error) {return <Text>Error : {error.message}</Text>;}

    /*return (
        <FlatList
            showsVerticalScrollIndicator={true}
            keyExtractor={(item, index) => index.toString()}
            data={data.trip.tripPatterns}
            /!*listKey={(item, index) => index}*!/
            renderItem={({ item }) => (
                <View style={styles.timeViewContainer}>
                    {/!*<Text>Duration Ekraveien til Jernbanetorget: {item.duration}</Text>*!/}
                    <FlatList data={item.legs}
                              showsVerticalScrollIndicator={true}
                              keyExtractor={(item, index) => index.toString()}
                              /!*listKey={(item, index) => index}*!/
                              renderItem={({item, index}) => {
                                  if (item.mode === 'metro') {
                                      return (
                                          <TimeView leg={item}/>
                                      );
                                  }
                              }
                    }
                    />
                </View>
            )
            }
        />
    );*/

    return (
        <View style={{flex: 1}}>
            <ScrollView style={styles.fetchTravelContainer}>
                <View>
                {!data || !data.trip || !data.trip.tripPatterns ? <Text/> :
                    data.trip.tripPatterns.map((trip, tripIndex) => {
                        //console.log('tripIndex: ' + tripIndex);
                        return (
                            <View style={styles.timeViewContainer} key={tripIndex}>
                                {trip.legs.map((leg, legIndex) => {
                                    if (leg.mode === 'metro') {
                                        console.log('start time: ' + leg.expectedStartTime);
                                        return (
                                            <View key={legIndex}>
                                            <TimeView leg={leg} tripIndex={tripIndex} key={legIndex}/>
                                            </View>
                                        );
                                    }
                                })
                                }
                            </View>
                        );
                    })
                }
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    fetchTravelContainer: {
        //showsVerticalScrollIndicator: true,
        //flex: 1,
        //width:'80%',
        //height:'100%',
        //flexGrow: 1,
    },
    timeViewContainer: {
        //flex: 1,
        //flexGrow: 1,
        //flexDirection: 'column',
        padding: 5,
        //flexWrap: 'wrap',
        //alignContent: 'space-between',
        //alignItems: 'flex-end',
    },
});

export default FetchTravel;
