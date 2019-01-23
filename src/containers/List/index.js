import React from 'react'
import { Text, FlatList } from 'react-native'
import { Query } from "react-apollo"
import { createAppContainer, createStackNavigator } from "react-navigation"

import { moviesQuery, seriesQuery } from '../../queries'

import Poster from '../../components/Poster'
import Detail from '../Detail'

class List extends React.Component {
  render() {
    let type = this.props.screenProps.type
    let query = type === "movies" ? moviesQuery : seriesQuery
    return (
      <Query query={query}>
        {({ loading, error, data }) => {
          if (loading) return <Text>Loading...</Text>;
          if (error) return <Text>Error :(</Text>;
          return <FlatList
            data={data[type].data}
            keyExtractor={item => item._id}
            horizontal={false}
            numColumns={2}
            renderItem={({ item }) => <Poster item={item} type={type === "movies" ? "movie" : "series"} />}
          />
        }}
      </Query>
    );
  }
}

const navigator = createStackNavigator({
  List: {
    screen: List,
  },
  Detail: {
    screen: Detail
  }
}, {
  headerMode: 'none',
})

export default createAppContainer(navigator)