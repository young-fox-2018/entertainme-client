/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Home from './containers/Home/Home'
import Detail from './containers/Detail/Detail'
import AddMovie from './containers/Add/AddMovie'
import AddTv from './containers/Add/AddTv'
import Edit from './containers/Edit/Edit'

const client = new ApolloClient({
  uri: "http://18.223.121.180:3000/graphql"
});

const AppNavigator = createStackNavigator(
  {
    Home: Home,
    Detail: Detail,
    Edit: Edit
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(createBottomTabNavigator({
  Home: AppNavigator,
  AddMovie: AddMovie,
  AddTv: AddTv
}, {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `home`;
        } else if (routeName === 'AddMovie') {
          iconName = `filmstrip`;
        }else if (routeName === 'AddTv') {
          iconName = `television`;
        }
        return <Icon name={iconName} size={25} color={tintColor} />;
      },
    }),
  }));


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
