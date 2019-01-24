import React, { Component } from 'react'
import { TextInput, View, Picker, StyleSheet, Button } from 'react-native'
import { Mutation } from "react-apollo"
import {moviesQuery, seriesQuery, createMovie, createSeries} from '../../graphql/queries'

class Add extends Component {
    state = {
        category: '',
        title: '',
        imageUrl: '',
        overview: '',
        popularity: ''
    }

    render() {
        let refetchQuery = this.state.category === 'movies' ? moviesQuery : seriesQuery
        let mutation = this.state.category === 'movies' ? createMovie : createSeries
        let nav = this.state.category === 'movies' ? 'Movies' : 'Series'
        return (
            <View>
                <Picker
                    selectedValue={this.state.category}
                    style={{ height: 50, width: 200, borderColor: 'lightgrey', borderWidth: 1 }}
                    onValueChange={(category, itemIndex) => this.setState({ category })}
                >
                    <Picker.Item label="Select Category" value="movies" />
                    <Picker.Item label="Movies" value="movies" />
                    <Picker.Item label="TV Series" value="series" />
                </Picker>
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
                                        title: this.state.title,
                                        poster_path: this.state.imageUrl,
                                        overview: this.state.overview,
                                        popularity: Number(this.state.popularity)
                                    }}),
                                    this.props.navigation.navigate(nav),
                                    this.setState({
                                        category: '',
                                        title: '',
                                        imageUrl: '',
                                        overview: '',
                                        popularity: ''
                                    })
                                )}
                            />
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
        alignItems: 'center'
    }
})

export default Add