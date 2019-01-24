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
            <View style={styles.container}>
                <Picker
                    selectedValue={this.state.category}
                    style={styles.textInput}
                    onValueChange={(category, itemIndex) => this.setState({ category })}
                >
                    <Picker.Item label="Select Category" value="movies" />
                    <Picker.Item label="Movies" value="movies" />
                    <Picker.Item label="TV Series" value="series" />
                </Picker>
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
        height: 330
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

export default Add