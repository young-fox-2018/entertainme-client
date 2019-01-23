import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import MoviePage from './src/containers/MoviePage/index.js';
import Details from './src/components/Details/index.js';
import TvSeries from './src/containers/TvSeriesPage/index.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

const MovieStack = createStackNavigator({
  MoviePage: MoviePage,
  Details: Details,
},
{
  headerMode: 'none',
  initialRouteName: 'MoviePage'
})

const TvSeriesStack = createStackNavigator({
  TvSeries: TvSeries,
  Details: Details,
},
{
  headerMode: 'none',
  initialRouteName: 'TvSeries'
})

const tabNavigator = createBottomTabNavigator(
  {
    Movie: {
      screen: MovieStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>(
          <Icon name="movie" size={30} color={tintColor} />
        )
      }
    },
    TvSeries: {
      screen: TvSeriesStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="tv" size={30} color={tintColor} />
        )
      }
    },
  }, 
  {
    tabBarOptions: {
        showLabel: false,
        inactiveTintColor: 'black',
        activeTintColor: '#6BBAB4',
    }
  })

export default createAppContainer(tabNavigator);