import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';
import { Mutation, Query } from "react-apollo";
import MultiSelect from 'react-native-multiple-select'

//queries
import getMovies from '../../queries/getMovies'
import getTv from '../../queries/getTv'
import getTags from '../../queries/getTags'

//mutations
import updateMovie from '../../mutations/updateMovie'
import updateTv from '../../mutations/updateTv'

export default class Edit extends Component {
    static navigationOptions = () =>{
        return {
            headerTitle: "Edit"
        }
    };
    state = {
        id: this.props.navigation.getParam('data')._id,
        title: this.props.navigation.getParam('data').title,
        overview: this.props.navigation.getParam('data').overview,
        poster_path: this.props.navigation.getParam('data').poster_path,
        popularity: this.props.navigation.getParam('data').popularity,
        tag: [],
        status: '',
        selectedItems: this.props.navigation.getParam('data').tag,
        items: [],
        getTag: true
    }
    minusCounter = () => {
        let newCounter = Number(this.state.popularity) - 1
        if(newCounter >= 0) {
            this.setState({
                popularity: String(newCounter)
            })
        }
    }
    addCounter = () => {
        let newCounter = Number(this.state.popularity) + 1
        if(newCounter <= 10) {
            this.setState({
                popularity: String(newCounter)
            })
        }
    }
    onSelectedItemsChange = selectedItems => {
        this.setState({ tag: selectedItems },()=>{console.log(this.state.tag)});
        
    };
    componentDidMount() {
        let tags = []
        this.props.navigation.getParam('data').tag.forEach(element => {
            tags.push(element._id)
        });
        this.setState({
            tag:tags
        })
    }
    render() {
        const {id, title, overview, poster_path, popularity, tag, status } = this.state
        return (
            <ScrollView>
                <Query
                    style={{flex:1}}
                        query={getTags}
                    >
                        {({ loading, error, data }) => {
                            if (loading) return <Text>Tags are being loaded</Text>;
                            if (error) return <ScrollView><Text>{alert(JSON.stringify(error))}</Text></ScrollView>
                            if(data && this.state.getTag) {
                                this.setState({
                                    items: data.getTags.data,
                                    getTag: false
                                })
                            }
                            return null
                        }}
                    </Query>
                <View>
                    <View style={styles.input}>
                        <TextInput
                            placeholder='Title'
                            onChangeText={(text) => this.setState({title:text})}
                            value={this.state.title}
                        />
                    </View>
                    <MultiSelect
                        items={this.state.items}
                        uniqueKey="_id"
                        onSelectedItemsChange={this.onSelectedItemsChange}
                        selectedItems={tag}
                        selectText="Pick Tags"
                        searchInputPlaceholderText="Search Tags..."
                        altFontFamily="ProximaNova-Light"
                        tagRemoveIconColor="#CCC"
                        tagBorderColor="#CCC"
                        tagTextColor="#CCC"
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        displayKey="text"
                        searchInputStyle={{ color: '#CCC' }}
                        submitButtonColor="#CCC"
                        submitButtonText="Pick Tags"
                    />
                    <View style={styles.input}>
                        <TextInput
                            placeholder='Overview'
                            onChangeText={(text) => this.setState({overview:text})}
                            multiline = {true}
                            numberOfLines = {4}
                            value={this.state.overview}
                        />
                    </View>
                    <View style={styles.input}>
                        <TextInput
                            placeholder='Poster Path'
                            onChangeText={(text) => this.setState({poster_path:text})}
                            value={this.state.poster_path}
                        />
                    </View>
                    <View style={styles.input}>
                        <Button
                            title="-"
                            onPress={this.minusCounter}
                        />
                        <Text> {this.state.popularity} </Text>
                        <Button
                            title="+"
                            onPress={this.addCounter}
                        />
                    </View>
                    
                    {this.props.navigation.getParam('type') === 'movie' ?
                        <Mutation mutation={updateMovie} refetchQueries={()=> {
                            return[{
                                query: getMovies
                            }]
                        }} >
                        { (updateMovie, {loading, error, data}) => (
                            <View>
                            <Button 
                                title="Submit"
                                onPress={() => updateMovie({variables:{id, title, overview, poster_path, popularity, tag, status}})}
                            />
                            {loading && <Text>Loading...</Text>}
                            {error &&  <ScrollView><Text>{alert(JSON.stringify(error))}</Text></ScrollView>}
                            {data && this.props.navigation.navigate('Home')}
                            </View>
                        )}
                        </Mutation>
                        :
                        <Mutation mutation={updateTv} refetchQueries={()=> {
                            return[{
                                query: getTv
                            }]
                        }}>
                        { (updateTv, {loading, error, data}) => (
                            <View>
                            <Button 
                                title="Submit"
                                onPress={() => updateTv({variables:{id, title, overview, poster_path, popularity, tag, status}})}
                            />
                            {loading && <Text>Loading...</Text>}
                            {error && <ScrollView><Text>{alert(JSON.stringify(error))}</Text></ScrollView>}
                            {data && this.props.navigation.navigate('Home')}
                            </View>
                        )}
                        </Mutation>
                    }
                    
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        borderColor: '#000000',
        borderWidth: 1,
        flexDirection: 'row',
        margin: 10,
        justifyContent: "space-between"
    },
});