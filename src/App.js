import React, { Component } from 'react';
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { Icon } from 'native-base'
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import Movies from './containers/Movies'
import Series from './containers/Series'

const client = new ApolloClient({
  uri: "http://13.250.42.194:3000/graphql"
});

const AppNavigator = createBottomTabNavigator(
  {
    Movies: {
      screen: Movies,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-film" style={{ color: tintColor }} />
        ),
      }
    },
    Series: {
      screen: Series,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-desktop" style={{ color: tintColor }} />
        ),
      },
    },
  }, {
    initialRouteName: "Movies",
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: 'black',
      },
    }
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
