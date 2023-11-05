import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getCurrentDate, getCurrentTime } from '../utils/time'
import { commonStyle } from "../utils/commonStyle";

export class CustomTime extends React.Component {

    state = {
        currentTime: null,//"00:00:00",
        currentData: null//"0000:00:00"
    }
    componentDidMount(){
        setInterval(() => {
            this.setState({
                currentTime: getCurrentTime(),
                currentData: getCurrentDate()
            })
        }, 1000)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.time}>{ this.state.currentTime }</Text>
                <Text style={styles.date}>{ this.state.currentData }</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: 120,
    },
    time: {
        fontSize: 35,
        marginTop: 20,
        color: 'white',
    },
    date: {
        fontSize: 20,
        marginTop: 20,
        color: 'white',
    }

})