import React, { Component } from 'react'
import { TextInput, View, Button } from 'react-native'
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
            <View>
                <TextInput
                    style={{ height: 40, borderColor: 'lightgrey', borderWidth: 1 }}
                    onChangeText={(title) => this.setState({ title })}
                    value={this.state.title}
                    placeholder="Title"
                />
                <TextInput
                    style={{ height: 40, borderColor: 'lightgrey', borderWidth: 1 }}
                    onChangeText={(imageUrl) => this.setState({ imageUrl })}
                    value={this.state.imageUrl}
                    placeholder="Image URL"
                />
                <TextInput
                    style={{ height: 100, borderColor: 'lightgrey', borderWidth: 1 }}
                    onChangeText={(overview) => this.setState({ overview })}
                    value={this.state.overview}
                    maxLength={500}
                    placeholder="Overview"
                />
                <TextInput
                    style={{ height: 40, borderColor: 'lightgrey', borderWidth: 1, marginBottom: 30 }}
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
                            <Button
                                title="Submit"
                                color="#087E8B"
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
                        )
                    }
                </Mutation>
            </View>
        )
    }
}

export default Edit