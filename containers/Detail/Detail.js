import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, Image, FlatList, Button, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Mutation } from "react-apollo";

//component
import Tag from './Tag/Tag'

//queries
import getMovies from '../../queries/getMovies'
import getTv from '../../queries/getTv'

//mutations
import deleteMovie from '../../mutations/deleteMovie'
import deleteTv from '../../mutations/deleteTv'

export default class Detail extends Component {
    static navigationOptions = ({ navigation }) =>{
        return {
            headerTitle: navigation.getParam('data').title,
            headerRight: (
                <View style={{flexDirection:"row"}}>
                    <Icon name="star" color="gold" size={32}></Icon>
                    <Text style={{fontSize:20, marginRight:10}}>
                        {navigation.getParam('data').popularity}
                    </Text>
                </View>
              ),
        }
    };
    render() {
        let width = Dimensions.get('window').width
        let data = this.props.navigation.getParam('data')
        let id = this.props.navigation.getParam('data')._id
        let type = this.props.navigation.getParam('type')
        return (
            <View style={{flex:1, alignItems:"center"}}>
                <View style={{flex:1}}>
                    <Image source={{uri: data.poster_path}}
                        style={{width:width, height:"100%"}} />
                </View>

                <View style={{flex:1, justifyContent:"space-between"}}>
                    <View style={{flex:2}}>
                        <FlatList
                            data={data.tag}
                            numColumns={4}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item}) => {
                                return <Tag data={item}/>
                            }}
                        />
                    </View>
                    <View style={{flex:3}}>
                        <View >
                            <Text>{data.overview}</Text>    
                        </View>
                    </View>
                    {type === 'movie' ?
                    <View style={{flex:1, flexDirection:"row", justifyContent:"space-around"}}>
                        <View>
                            <Button
                                onPress={() => this.props.navigation.navigate('Edit',{type:type, data:data})}
                                title="Edit"
                            />
                        </View>
                        <Mutation mutation={deleteMovie} refetchQueries={()=> {
                            return[{
                                query: getMovies
                            }]
                        }} >
                        { (deleteMovie, {loading, error, data}) => (
                            <View>
                            <Button 
                                title="Delete"
                                onPress={() => deleteMovie({variables:{id}})}
                            />
                            {loading && <Text>Loading...</Text>}
                            {error &&  <ScrollView><Text>{alert(JSON.stringify(error))}</Text></ScrollView>}
                            {data && this.props.navigation.navigate('Home')}
                            </View>
                        )}
                        </Mutation>
                    </View>
                    :
                    <View style={{flex:1, flexDirection:"row", justifyContent:"space-around"}}>
                        <View>
                            <Button
                                onPress={() => this.props.navigation.navigate('Edit',{type:type, data:data})}
                                title="Edit"
                            />
                        </View>
                        <Mutation mutation={deleteTv} refetchQueries={()=> {
                            return[{
                                query: getTv
                            }]
                        }} >
                        { (deleteTv, {loading, error, data}) => (
                            <View>
                            <Button 
                                title="Delete"
                                onPress={() => deleteTv({variables:{id}})}
                            />
                            {loading && <Text>Loading...</Text>}
                            {error &&  <ScrollView><Text>{alert(JSON.stringify(error))}</Text></ScrollView>}
                            {data && this.props.navigation.navigate('Home')}
                            </View>
                        )}
                        </Mutation>
                    </View>
                    }
                </View>
            </View>
        );
    }
}