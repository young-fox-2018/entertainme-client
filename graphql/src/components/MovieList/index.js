import React, { Component } from 'react';
import { Query } from "react-apollo";
import { GET_ALL_MOVIES, GET_ALL_TV_SERIES } from '../../queries/index.js';
import { Text, FlatList, StyleSheet, View, Button } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import MovieItem from '../../components/MovieItem/index.js';
import Modal from '../Modal/index.js';

class MovieList  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCreateModal: false
    }
  }

  openCreateNewData = () => {
    this.setState({
      openCreateModal: true
    })
  }

  closeModal = () => {
    this.setState({
      openCreateModal: false
    })
  }

  render() {
      const { routeName } = this.props.navigation.state;
      return (
        <Query query={ routeName === 'MoviePage' ? GET_ALL_MOVIES : GET_ALL_TV_SERIES }>
          {( { loading, error, data }) => {
            if (loading) return <Text>Loading..</Text>
            if (error) return <Text>{JSON.stringify(error)}</Text>
            return (
              <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
                <Button
                  onPress={this.openCreateNewData}
                  title="Add New Data"
                  color="##112E3B"
                  style={{ marginBottom: 5 }}
                />
                <Modal 
                  modalVisible={this.state.openCreateModal} 
                  closeModal={this.closeModal}
                  navigation={this.props.navigation}
                  route={routeName} 
                />
                <FlatList
                  data={routeName === 'MoviePage' ? data.movies.data : data.tvSeries.data }
                  keyExtractor={(item, index) => index }
                  numColumns={2}
                  horizontal={false}
                  renderItem={({ item }) => {
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
              </SafeAreaView>
            )
          }}
        </Query>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  }
})
 
export default MovieList;