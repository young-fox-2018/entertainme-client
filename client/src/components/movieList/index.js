import React, { Component } from 'react'
import {Text, FlatList, TouchableOpacity, Image} from 'react-native'

import { Query } from "react-apollo"
import {moviesQuery} from '../../graphql/queries'

import Loading from '../../components/loading'

class MovieList extends Component {
    state = {  }
    static navigationOptions({ navigation }) {
        return {
            title: "EntertainMe | Movies",
            headerTintColor: '#083D77',
            // headerStyle: { backgroundColor: '#D5DBDB' },
        }
    }
    render() { 
        return (
            <Query query={moviesQuery}>
            {({loading, error, data}) => {
                const {navigate} = this.props.navigation
                if (loading) return <Loading />
                if (error) return <Text>Oops something went wrong...</Text>
                return (
                    <FlatList
                        horiontal="false"
                        numColumns="3"
                        data={data.movies.data}
                        renderItem={(({item}) => (
                            <TouchableOpacity onPress={() => navigate('Detail', {data: item, type: "movies"})}>
                                <Image 
                                    style={{width: 135, height: 199, marginTop: 1, marginBottom: 1, marginRight: 1, marginLeft: 1}}
                                    source={{uri: `${item.poster_path}`}}
                                />
                            </TouchableOpacity>
                        ))}
                        keyExtractor={((item, index) => index.toString())}
                    />
                )
            }}
            </Query>
        )
    }
}
 
export default MovieList