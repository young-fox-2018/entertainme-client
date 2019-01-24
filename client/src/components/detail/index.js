import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, ScrollView, Image, Button } from 'react-native'

import { Mutation } from "react-apollo"
import { deleteMovieQuery, deleteSeriesQuery, moviesQuery, seriesQuery } from '../../graphql/queries'

class MovieDetail extends Component {
    state = {}
    static navigationOptions({ navigation }) {
        return {
            title: navigation.getParam('data').title,
            headerTintColor: '#083D77'
        }
    }
    render() {
        const data = this.props.navigation.getParam('data')
        const type = this.props.navigation.getParam('type')
        const mutation = type === 'movies' ? deleteMovieQuery : deleteSeriesQuery
        const refetchQuery = type === 'movies' ? moviesQuery : seriesQuery
        const { navigate } = this.props.navigation

        return (
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image
                        style={{ width: 230, height: 350 }}
                        source={{ uri: `${data.poster_path}` }}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.label}>Title</Text>
                    <Text style={styles.data}>{data.title}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.label}>Overview</Text>
                    <Text style={styles.data}>{data.overview}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.label}>Popularity</Text>
                    <Text style={styles.data}>{data.popularity}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.label}>Tag</Text>
                    <FlatList
                        data={data.tag}
                        renderItem={({ item }) => (
                            <Text style={styles.data}>{item.text}</Text>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <View style={styles.buttonEdit}>
                    <Button
                        title="Edit"
                        color="#F6B45B"
                        onPress={ () => navigate('Edit', {data, type}) }
                    />
                </View>
                {
                    <Mutation
                        mutation={mutation}
                        refetchQueries={[{ query: refetchQuery }]}
                    >
                        {
                            remove => (
                                <View style={styles.buttonDelete}>
                                    <Button
                                        title="Delete"
                                        color="#D85555"
                                        onPress={() => (
                                            remove({ variables: { id: data._id } }),
                                            this.props.navigation.goBack()
                                        )} />
                                </View>
                            )
                        }
                    </Mutation>
                       
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: 'center',
        height: 380,
        marginTop: 20
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: 'lightgrey'
    },
    label: {
        flex: 2,
        fontWeight: 'bold',
        marginLeft: 30
    },
    data: {
        flex: 4,
        marginRight: 30
    },
    buttonEdit: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30
    },
    buttonDelete: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        marginBottom: 20
    }
})

export default MovieDetail