import React from 'react'
import { View, Text, ScrollView, FlatList } from 'react-native'
import { Query } from "react-apollo"
import { createAppContainer, createStackNavigator } from "react-navigation"

import { moviesQuery } from '../../queries'

import Poster from '../../components/Poster'
import Detail from '../Detail'

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <Query query={moviesQuery}>
        {({ loading, error, data }) => {
          if (loading) return <Text>Loading...</Text>;
          if (error) return <Text>Error :(</Text>;
          return <FlatList
            data={data.movies.data}
            keyExtractor={item => item._id}
            horizontal={false}
            numColumns={2}
            renderItem={({ item }) => <Poster item={item} />}
          />
        }}
      </Query>
    );
  }
}

const navigator = createStackNavigator({
  Home: {
    screen: Home,
  },
  Detail: {
    screen: Detail
  }
}, {
  headerMode: 'none',
  // navigationOptions: {
  //   headerVisible: false
  // }
})

export default createAppContainer(navigator)