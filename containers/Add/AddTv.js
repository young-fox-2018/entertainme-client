import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';
import { Mutation, Query } from "react-apollo";
import MultiSelect from 'react-native-multiple-select'

//queries
import getTv from '../../queries/getTv'
import getTags from '../../queries/getTags'

//mutations
import addTv from '../../mutations/addTv'

export default class AddTv extends Component {
    state = {
        getTag: true,
        title: '',
        overview: '',
        poster_path: '',
        popularity: '0',
        tag: [],
        status: '',
        selectedItems: [],
        items: []
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
    render() {
        const { title, overview, poster_path, popularity, tag, status } = this.state

        return (
            <ScrollView>
                <Text style={{fontSize:24, borderBottomWidth:1, marginBottom:10}}>Add a Tv Show</Text>
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

                    <Mutation mutation={addTv} refetchQueries={()=> {
                            return[{
                                query: getTv
                            }]
                        }} >
                        { (addTv, {loading, error, data}) => (
                            <View>
                            <Button 
                                title="Submit"
                                onPress={() => addTv({variables:{title, overview, poster_path, popularity, tag, status}})}
                            />
                            {loading && <Text>Loading...</Text>}
                            {error &&  <ScrollView><Text>{alert(JSON.stringify(error))}</Text></ScrollView>}
                            {data && this.props.navigation.navigate('Home')}
                            {/* <Text>{JSON.stringify(data)}</Text> */}
                            </View>
                        )}
                    </Mutation>
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