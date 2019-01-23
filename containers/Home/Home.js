import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { Query } from "react-apollo";

//components
import Poster from './Poster/Poster'

//queries
import getMovies from '../../queries/getMovies'
import getTv from '../../queries/getTv'

export default class Home extends Component {
    static navigationOptions = () =>{
        return {
            headerTitle: "Home"
        }
    };
    render() {
        return (
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    <Query
                    style={{flex:1}}
                        query={getMovies}
                    >
                        {({ loading, error, data }) => {
                            if (loading) return <Text>loading</Text>;
                            if (error) return <ScrollView><Text>{alert(JSON.stringify(error))}</Text></ScrollView>;
                            return (
                                <FlatList
                                    data={data.getMovies.data}
                                    keyExtractor={(item, index) => index.toString()}
                                    horizontal={true}
                                    renderItem={({item}) => {
                                        return <Poster data={item} navigation={this.props.navigation} type="movie"/>
                                    }}

                                />
                            )
                        }}
                    </Query>
                </View>
                <View style={{flex:1}}>
                    <Query
                        query={getTv}
                    >
                        {({ loading, error, data }) => {
                            if (loading) return <Text>loading</Text>;
                            if (error) return <ScrollView><Text>{alert(JSON.stringify(error))}</Text></ScrollView>;
                            return (
                                <FlatList
                                    data={data.getTv.data}
                                    horizontal={true}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({item}) => {
                                        return <Poster data={item} navigation={this.props.navigation} type="tv"/>
                                    }}
                                />
                            )
                        }}
                    </Query>
                </View>
                
            </View>
        );
    }
}