import React, { Component } from 'react';
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { Icon } from 'native-base'
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import List from './containers/List'
import Form from './containers/Form'

const client = new ApolloClient({
  uri: "http://13.250.42.194:3000/graphql"
});

const AppNavigator = createBottomTabNavigator(
  {
    Movies: {
      screen: () => <List screenProps={{ type: "movies" }} />,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-film" style={{ color: tintColor }} />
        ),
      }
    },
    Form: {
      screen: Form,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-add-circle" style={{ color: tintColor }} />
        ),
      },
    },
    Series: {
      screen: () => <List screenProps={{ type: "series" }} />,
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
