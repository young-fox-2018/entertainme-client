import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, Image } from 'react-native';

export default class Detail extends Component {
    static navigationOptions = ({ navigation }) =>{
        return {
            headerTitle: navigation.getParam('data').title
        }
    };
    render() {
        let width = Dimensions.get('window').width
        let data = this.props.navigation.getParam('data')
        return (
            <View style={{flex:1, alignItems:"center"}}>
                <View style={{flex:1}}>
                    <Image source={{uri: data.poster_path}}
                        style={{width:width, height:"100%"}} />
                </View>

                <View style={{flex:1, justifyContent:"space-between"}}>
                    <View>
                        <View style={{flexDirection:'row', justifyContent:"space-around"}}>
                            <Text>{data.title}</Text>
                            <Text>{data.popularity}</Text>
                        </View>
                        <Text>{JSON.stringify(data.tag)}</Text>

                    </View>
                    <View style={{flex:1, paddingTop:20}}>
                        <View >
                            <Text>{data.overview}</Text>    
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}