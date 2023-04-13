import React from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import { useQuery, gql } from '@apollo/client';
import TimeView from './TimeView';

const FetchTravel = (props) => {
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

    console.log('fetchtr start id: ' + props.startPlaceId);
    console.log('fetchtr stop id: ' + props.stopPlaceId);

    const { loading, error, data } = useQuery(GET_TRAVEL, {
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
            <ScrollView>
                <View>
                {!data || !data.trip || !data.trip.tripPatterns ? <Text/> :
                    data.trip.tripPatterns.map((trip, tripIndex) => {
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
    timeViewContainer: {
        padding: 5,
    },
});

export default FetchTravel;
