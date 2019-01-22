import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

export default class Poster extends Component {
    render() {
        return (
            <TouchableOpacity 
                style={{flex:1, justifyContent:"center", marginRight:5}}
                onPress={() => this.props.navigation.navigate("Detail",{data:this.props.data})}
                >
                <Image source={{uri: this.props.data.poster_path}}
                    style={{width: 150, height: 150}} />
                <Text style={{width: 150, height: 50}} >{this.props.data.title}</Text>
                {/* <Text>{JSON.stringify(this.props.data.title)}</Text> */}
            </TouchableOpacity>
        );
    }
}