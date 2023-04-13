import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const TimeView = (props) => {
    const getFormattedTime = (date) => {
        const time = new Date(date).toLocaleTimeString([], { hour12: false, hour: "2-digit", minute: "2-digit" });
        return time;
    };

    const isStartDelayed = (leg) => {
        console.log('Form start times exp: ' + getFormattedTime(leg.expectedStartTime));
        console.log('Form start times aimed: ' + getFormattedTime(leg.aimedStartTime));
        console.log('tripIndex: ' + props.tripIndex);
        return getFormattedTime(leg.expectedStartTime) !== getFormattedTime(leg.aimedStartTime);
    };
    const isEndDelayed = (leg) => {
        return getFormattedTime(leg.expectedEndTime) !== getFormattedTime(leg.aimedEndTime);
    };

    return (
        <View>
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
    timeContainerOuter: {
        flexDirection: 'column',
        padding: 5,
    },
    timeContainer: {
        flexDirection: 'row',
    },
    left: {
        flex: 1,
    },
    right: {
      flex: 1,
    },
    timeText: {
        fontSize: 20,
        fontWeight: '600',
        padding: 5,
        paddingBottom: 0,
    },
    timeTextDelayed: {
        padding: 0,
        paddingLeft: 5,
        paddingBottom: 0,
    },
    timeHidden: {
        display: 'none',
    },
    timeTextStrikeThrough: {
        fontSize: 20,
        fontWeight: '300',
        padding: 5,
        paddingBottom: 0,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'double',
    },
});
export default TimeView;
