import { createMaterialTopTabNavigator , createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import MoviePage from './src/containers/MoviePage/index.js';
import Details from './src/components/Details/index.js';
import TvSeries from './src/components/TvList/index.js';
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
  initialRouteName: 'TvSeries'
})

const tabNavigator = createBottomTabNavigator(
  {
    Movie: {
      screen: MovieStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>(
          <Icon name="movie" size={30} color="black" />
        )
      }
    },
    TvSeries: {
      screen: TvSeriesStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="film" size={30} color="red" />
        )
      }
    },
  },
  {
    tabBarOptions: {
        showLabel: false
    }
  })

export default createAppContainer(tabNavigator)