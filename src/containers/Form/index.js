import React, { Component } from 'react';
import { Container, Picker, Header, Footer, Text, Content, Form, Item, Input, Button, Label, Icon, Left, Title, Body, Right } from 'native-base';
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Mutation } from "react-apollo"

import { createMovie, createSeries, moviesQuery, seriesQuery } from '../../queries'

class Add extends Component {
  state = {
    selected: 'movie',
    title: '',
    overview: '',
    poster_path: '',
    popularity: null,
    status: ''
  }

  handleSubmit = () => {

  }

  mutate = fn => () => {
    fn({
      variables: {
        selected: this.state.selected,
        title: this.state.title,
        overview: this.state.overview,
        poster_path: this.state.poster_path,
        popularity: this.state.popularity,
        status: this.state.status,
      }
    })
    this.props.navigation.navigate(this.state.selected === 'movie' ? 'Movies' : 'Series')
  }

  render() {
    let createMutation = this.state.selected === 'movie' ? createMovie : createSeries
    let refetchQuery = this.state.selected === 'movie' ? moviesQuery : seriesQuery
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>New entry</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form style={{ padding: 15 }}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholder="Movie or TV series"
              textStyle={{ color: "#5cb85c" }}
              itemStyle={{
                backgroundColor: "#d3d3d3",
                marginLeft: 0,
                paddingLeft: 10
              }}
              itemTextStyle={{ color: '#788ad2' }}
              selectedValue={this.state.selected}
              onValueChange={selected => this.setState({ selected })}
            >
              <Picker.Item label="Movie" value="movie" />
              <Picker.Item label="TV series" value="series" />
            </Picker>
            <Item floatingLabel>
              <Label>Title</Label>
              <Input onChangeText={title => this.setState({ title })} />
            </Item>
            <Item floatingLabel>
              <Label>Overview</Label>
              <Input onChangeText={overview => this.setState({ overview })} />
            </Item>
            <Item floatingLabel>
              <Label>Image url</Label>
              <Input onChangeText={imageUrl => this.setState({ imageUrl })} />
            </Item>
            <Item floatingLabel>
              <Label>Popularity</Label>
              <Input onChangeText={popularity => this.setState({ popularity: Number(popularity) })} />
            </Item>
            <Item floatingLabel>
              <Label>Status</Label>
              <Input onChangeText={status => this.setState({ status })} />
            </Item>
          </Form>
          <Mutation
            mutation={createMutation}
            refetchQueries={[{ query: refetchQuery }]}
          >
            {
              createMutation =>
                <Button rounded primary onPress={this.mutate(createMutation)} style={{ alignSelf: "center", margin: 30 }}>
                  <Text>Submit</Text>
                </Button>
            }
          </Mutation>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({

})

export default Add