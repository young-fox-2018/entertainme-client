import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Poster from './Poster/Poster'

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
                        query={gql`{

                            getMovies{
                                info
                                data {
                                _id
                                title
                                overview
                                poster_path
                                popularity
                                tag {
                                    text
                                }
                                }
                            }
                        }
                        `}
                    >
                        {({ loading, error, data }) => {
                            if (loading) return <Text>loading</Text>;
                            if (error) return <Text>error</Text>;

                            // return <Text>{JSON.stringify(data)}</Text>
                            return (
                                <FlatList
                                    data={data.getMovies.data}
                                    keyExtractor={(item, index) => index.toString()}
                                    horizontal={true}
                                    renderItem={({item}) => {
                                        return <Poster data={item} navigation={this.props.navigation}/>
                                    }}

                                />
                            )
                        }}
                    </Query>
                </View>
                <View style={{flex:1}}>
                    <Query
                        query={gql`{

                            getTv{
                                info
                                data {
                                _id
                                title
                                overview
                                poster_path
                                popularity
                                tag {
                                    text
                                }
                                }
                            }
                        }
                        `}
                    >
                        {({ loading, error, data }) => {
                            if (loading) return <Text>loading</Text>;
                            if (error) return <Text>error</Text>;

                            // return <Text>{JSON.stringify(data)}</Text>
                            return (
                                <FlatList
                                    data={data.getTv.data}
                                    horizontal={true}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({item}) => {
                                        return <Poster data={item} navigation={this.props.navigation}/>
                                    }}
                                />

                                

                            )
                            // data.getTv.data.map(({ _id, title }) => (
                            //     <Text key={_id}>{title}</Text>
                            // ));
                        }}
                    </Query>
                </View>
                
            </View>
        );
    }
}