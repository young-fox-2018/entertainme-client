import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

export default class Tag extends Component {
    render() {
        return (
            <View style={{}}>
                <Text style={styles.tag}>{this.props.data.text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tag: {
        backgroundColor: "lightblue",
        borderRadius: 10,
        borderColor: '#ddd',
        textAlign: 'center',
        margin:5,
        paddingHorizontal: 10
    },
});
