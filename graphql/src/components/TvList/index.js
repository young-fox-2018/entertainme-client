import React, { Component } from 'react';
import { Query } from "react-apollo";
import { getAllTvSeriesData } from '../../queries/index.js';
import { Text, FlatList, StyleSheet, View } from 'react-native';
import MovieItem from '../../components/MovieItem/index.js';

class Tvlist  extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <Query query={getAllTvSeriesData}>
        {( { loading, error, data }) => {
          if (loading) return <Text>Loading..</Text>
          if (error) return <Text>{JSON.stringify(error)}</Text>
          return (
            <View style={styles.container}>
              <FlatList
                data={data.movies.data}
                keyExtractor={(item, index) => index }
                renderItem={({ item }) => {
                  console.log(item, 'hai');
                  return (
                    <MovieItem
                      poster_path={item.poster_path ? item.poster_path : "http://iwanttoeatyourpancreas.com/assets/img/in/ticket/img_theater.jpg"}
                      overview={item.overview || ''}
                      popularity={item.popularity || 0}
                      status={item.status || ''}
                      title={item.title || ''}
                      navigation={this.props.navigation || ''}
                      tag={item.tag || []}
                      id={item._id}
                    />
                  )
                }}
              />
            </View>
          )
        }}
      </Query>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 10
  }
})
 
export default Tvlist;