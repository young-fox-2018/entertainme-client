import React, { Component } from 'react';
import { Container, Picker, Header, Footer, Text, Content, Form, Item, Input, Button, Label, Icon, Left, Title, Body, Right } from 'native-base';
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Mutation } from "react-apollo"
import { StackActions } from 'react-navigation';

import { createMovie, createSeries, moviesQuery, seriesQuery, updateMovie, updateSeries } from '../../queries'

const R = require('ramda')

class Add extends Component {
  state = {
    mode: this.props.navigation.getParam('item') ? 'edit' : 'add',
    selected: this.props.navigation.getParam('type') || 'movie',
    title: R.prop('title', this.props.navigation.getParam('item')) || '',
    overview: R.prop('overview', this.props.navigation.getParam('item')) || '',
    poster_path: R.prop('poster_path', this.props.navigation.getParam('item')) || '',
    popularity: R.prop('popularity', this.props.navigation.getParam('item')) || NaN,
    status: R.prop('status', this.props.navigation.getParam('item')) || ''
  }

  handleSubmit = () => {

  }

  mutate = fn => () => {
    console.log(fn)
    let variables = {
      selected: this.state.selected,
      title: this.state.title,
      overview: this.state.overview,
      poster_path: this.state.poster_path,
      popularity: this.state.popularity,
      status: this.state.status,
    }
    this.state.mode === 'edit' && (variables = { id: this.props.navigation.getParam('item')._id, ...variables })
    fn({ variables })
    this.state.mode === 'add'
      ? this.props.navigation.navigate(this.state.selected === 'movie' ? 'Movies' : 'Series')
      : this.props.navigation.dispatch(StackActions.pop({ n: 2 }));
  }

  render() {
    let item = this.props.navigation.getParam('item')
    let mutation = this.state.mode === 'add'
      ? (this.state.selected === 'movie' ? createMovie : createSeries)
      : (this.state.selected === 'movie' ? updateMovie : updateSeries)
    // let createMutation = this.state.selected === 'movie' ? createMovie : createSeries
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
            <Title>{item ? 'Edit entry' : 'New entry'}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form style={{ padding: 15 }}>
            {
              !item && <Picker
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
            }
            <Item floatingLabel>
              <Label>Title</Label>
              <Input value={this.state.title} onChangeText={title => this.setState({ title })} />
            </Item>
            <Item floatingLabel>
              <Label>Overview</Label>
              <Input value={this.state.overview} onChangeText={overview => this.setState({ overview })} />
            </Item>
            <Item floatingLabel>
              <Label>Image url</Label>
              <Input value={this.state.poster_path} onChangeText={imageUrl => this.setState({ imageUrl })} />
            </Item>
            <Item floatingLabel>
              <Label>Popularity</Label>
              <Input value={String(this.state.popularity || '')} onChangeText={popularity => this.setState({ popularity: Number(popularity) })} />
            </Item>
            <Item floatingLabel>
              <Label>Status</Label>
              <Input value={this.state.status} onChangeText={status => this.setState({ status })} />
            </Item>
          </Form>
          <Mutation
            mutation={mutation}
            refetchQueries={[{ query: refetchQuery }]}
          >
            {
              mutation =>
                <Button rounded primary onPress={this.mutate(mutation)} style={{ alignSelf: "center", margin: 30 }}>
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