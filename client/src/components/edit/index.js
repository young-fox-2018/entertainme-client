import React, { Component } from 'react'
import { TextInput, View, Button, StyleSheet } from 'react-native'
import { Mutation } from "react-apollo"
import {moviesQuery, seriesQuery, updateMovie, updateSeries} from '../../graphql/queries'

class Edit extends Component {
    state = {
        title: this.props.navigation.getParam('data').title,
        imageUrl: this.props.navigation.getParam('data').poster_path,
        overview: this.props.navigation.getParam('data').overview,
        popularity: String(this.props.navigation.getParam('data').popularity)
    }
    static navigationOptions({ navigation }) {
        return {
            title: `${navigation.getParam('data').title} | edit`,
            headerTintColor: '#083D77'
        }
    }
    render() {
        const data = this.props.navigation.getParam('data')
        const type = this.props.navigation.getParam('type')
        let refetchQuery = type === 'movies' ? moviesQuery : seriesQuery
        let mutation = type === 'movies' ? updateMovie : updateSeries
        let nav = type === 'movies' ? 'Movies' : 'Series'
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(title) => this.setState({ title })}
                    value={this.state.title}
                    placeholder="Title"
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={(imageUrl) => this.setState({ imageUrl })}
                    value={this.state.imageUrl}
                    placeholder="Image URL"
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={(overview) => this.setState({ overview })}
                    value={this.state.overview}
                    maxLength={500}
                    placeholder="Overview"
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={(popularity) => this.setState({ popularity })}
                    value={this.state.popularity}
                    placeholder="Popularity"
                />
                <Mutation
                    mutation={mutation}
                    refetchQueries={[{query: refetchQuery}]}
                >
                    {
                        mutation => (
                            <View style={styles.button}>
                                <Button
                                    title="Submit"
                                    color="#16B7BC"
                                    onPress={() => (
                                        mutation({variables: {
                                            id: data._id,
                                            title: this.state.title,
                                            poster_path: this.state.imageUrl,
                                            overview: this.state.overview,
                                            popularity: Number(this.state.popularity)
                                        }}),
                                        this.props.navigation.navigate(nav)
                                    )}
                                />
                            </View>
                        )
                    }
                </Mutation>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        height: 280
    },
    textInput: {
        height: 40,
        paddingLeft: 6,
        borderWidth: 1,
        borderColor: 'lightgrey',
        marginBottom: 10,
        borderRadius: 5,
        marginLeft: 30,
        marginRight: 30
    },
    button: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10
    }
})

export default Edit