/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";

import Home from './containers/Home/Home'
import Detail from './containers/Detail/Detail'

const client = new ApolloClient({
  uri: "http://18.223.121.180:3000/graphql"
});

const AppNavigator = createStackNavigator(
  {
    Home: Home,
    Detail: Detail,
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);


export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppContainer />
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
