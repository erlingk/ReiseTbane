import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

const TimeView = (props) => {
    const getFormattedTime = (date) => {
        const time = new Date(date).toLocaleTimeString([], { hour12: false, hour: "2-digit", minute: "2-digit" });
        return time;
    };

    const isStartDelayed = (leg) => {
        console.log('Form start times exp: ' + getFormattedTime(leg.expectedStartTime));
        console.log('Form start times aimed: ' + getFormattedTime(leg.aimedStartTime));
        console.log('tripIndex: ' + props.tripIndex);
        //return props.tripIndex === 0 || props.tripIndex === 5 ? true :
        return getFormattedTime(leg.expectedStartTime) !== getFormattedTime(leg.aimedStartTime);
    };
    const isEndDelayed = (leg) => {
        //return props.tripIndex === 2 || props.tripIndex === 5 ? true :
        return getFormattedTime(leg.expectedEndTime) !== getFormattedTime(leg.aimedEndTime);
    };
    //console.log('expectedStartTime: ' + props.leg.expectedStartTime);
    //console.log('aimedStartTime: ' + props.leg.aimedStartTime);

    //console.log('tripIndex: ' + props.tripIndex);

    /*return (
        <View style={styles.timeContainer} key={props.tripIndex}>
            {isStartDelayed(props.leg) ?
                <View style={styles.timeContainer2}>
                    <Text  style={styles.timeTextStrikeThrough}>{getFormattedTime(props.leg.aimedStartTime)}</Text>
                    <Text style={styles.timeText}>{getFormattedTime(props.leg.expectedStartTime)}</Text>
                </View>
                :
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{getFormattedTime(props.leg.expectedStartTime)}</Text>
                    <Text style={styles.timeText}>{getFormattedTime(props.leg.expectedStartTime)}</Text>
                </View>
            }
            <Text style={styles.timeText}>-</Text>
            {isEndDelayed(props.leg) ?
                <View style={styles.timeContainer}>
                    <Text  style={styles.timeTextStrikeThrough}>{getFormattedTime(props.leg.aimedEndTime)}</Text>
                    <Text style={styles.timeText}>{getFormattedTime(props.leg.expectedEndTime)}</Text>
                </View>
                :
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{getFormattedTime(props.leg.expectedEndTime)}</Text>
                    <Text style={styles.timeText}>{getFormattedTime(props.leg.expectedEndTime)}</Text>
                </View>
            }
        </View>
    );*/
    /*return (
        <View style={styles.timeContainer} key={props.tripIndex}>
            <View style={styles.timeContainer}>
                <Text  style={isStartDelayed(props.leg) ? styles.timeTextStrikeThrough : styles.timeHidden}>{getFormattedTime(props.leg.aimedStartTime)}</Text>
                <Text style={styles.timeText}>{getFormattedTime(props.leg.expectedStartTime)}</Text>
            </View>
            <Text style={styles.timeText}>-</Text>
            <View style={styles.timeContainer}>
                <Text  style={isEndDelayed(props.leg) ? styles.timeTextStrikeThrough : styles.timeHidden}>{getFormattedTime(props.leg.aimedEndTime)}</Text>
                <Text style={styles.timeText}>{getFormattedTime(props.leg.expectedEndTime)}</Text>
            </View>
        </View>
    );*/
    return (
        <View style={styles.timeViewContainer}>
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{getFormattedTime(props.leg.expectedStartTime)}</Text>
                    <Text style={styles.timeText}>-</Text>
                    <Text style={styles.timeText}>{getFormattedTime(props.leg.expectedEndTime)}</Text>
                </View>
                {isStartDelayed(props.leg) || isEndDelayed(props.leg) ?
                    <View style={styles.timeContainer}>
                        <Text style={styles.timeTextDelayed}>Opprinnelig Tid:</Text>
                        <Text style={styles.timeTextDelayed}>{getFormattedTime(props.leg.aimedStartTime)}</Text>
                        <Text style={styles.timeTextDelayed}>-</Text>
                        <Text style={styles.timeTextDelayed}>{getFormattedTime(props.leg.aimedEndTime)}</Text>
                    </View>
                    :
                    <View/>
                }
        </View>
    );
};

const styles = StyleSheet.create({
    timeViewContainer: {
        //flex: 1,
        //width:'80%',
        //height:'100%',
    },
    timeContainerOuter: {
        //flex: 1,
        //flexGrow: 1,
        flexDirection: 'column',
        padding: 5,
        //flexWrap: 'wrap',
        //alignContent: 'space-between',
        //alignItems: 'flex-end',
    },
    timeContainer: {
        //flex: 1,
        flexDirection: 'row',
        //flexWrap: 'wrap',
        //alignContent: 'space-between',
        //alignItems: 'flex-end',
    },
    left: {
        flex: 1,
    },
    right: {
      flex: 1,
    },
    timeText: {
        //flexBasis: '50%',
        fontSize: 20,
        fontWeight: '600',
        padding: 5,
        paddingBottom: 0,
    },
    timeTextDelayed: {
        //flexBasis: '50%',
        //fontSize: 20,
        //fontWeight: '600',
        padding: 0,
        paddingLeft: 5,
        paddingBottom: 0,
    },
    timeHidden: {
        display: 'none',
    },
    timeTextStrikeThrough: {
        //flexBasis: '50%',
        fontSize: 20,
        fontWeight: '300',
        padding: 5,
        paddingBottom: 0,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'double',
    },
});
export default TimeView;
