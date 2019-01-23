import React, {Component} from 'react'
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Movies from './src/container/movies'
import Series from './src/container/series'

const appNavigator = createBottomTabNavigator({
  Home: {
    screen: Movies,
    navigationOptions: {
      tabBarOptions: { 
        showIcon: true,
        showLabel: false,
        activeTintColor: '#EBEBD3',
        inactiveTintColor: 'grey',
        labelStyle: {
          fontSize: 12,
        },
        style: {
          backgroundColor: '#083D77',
        }
      },
      tabBarIcon: ({ tintColor }) => (
        <Icon name="movie" size={25} color={tintColor} />
      )
    }
  },
  Series: {
    screen: Series,
    navigationOptions: {
      tabBarOptions: { 
        showIcon: true,
        showLabel: false,
        activeTintColor: '#EBEBD3',
        inactiveTintColor: 'grey',
        labelStyle: {
          fontSize: 12,
        },
        style: {
          backgroundColor: '#083D77',
        }
      },
      tabBarIcon: ({ tintColor }) => (
        <Icon name="tv" size={25} color={tintColor} />
      )
    }
  }
})

const AppContainer = createAppContainer(appNavigator)

const client = new ApolloClient({
  uri: "http://18.223.237.155:3000/graphql"
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
          <AppContainer />
      </ApolloProvider>
    );
  }
}
