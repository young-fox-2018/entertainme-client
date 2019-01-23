import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { DELETE_MOVIE_DATA, DELETE_TV_DATA, GET_ALL_TV_SERIES, GET_ALL_MOVIES } from '../../queries/index.js';
import { Mutation } from 'react-apollo';
import { SafeAreaView } from 'react-navigation';
import Modal from '../../components/Modal/index.js';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCreateModal: false
    }
  }

  deleteData = (deleteMovieData, id) => () => {
    deleteMovieData({ variables: { id: id }});
    this.props.navigation.goBack();
  }

  deleteTvData = (deleteTvData, id) => () => {
    deleteTvData({ variables: { id: id }});
    this.props.navigation.goBack();
  }

  closeModal = () => {
    this.setState({
      openCreateModal: false
    })
  }

  openUpdateModal = () => {
    this.setState({
      openCreateModal: true
    })
  }


  render() {
    const { navigation } = this.props;
    const id =  navigation.getParam('id');
    const overview =  navigation.getParam('overview');
    const title =  navigation.getParam('title');
    const poster_path = navigation.getParam('poster_path');
    const popularity = navigation.getParam('popularity');
    const status = navigation.getParam('status');
    const previousRoute = navigation.getParam('previousRoute');
    const { routeName } = this.props.navigation.state;
    console.log(title, 'asdadad');

    return (
      <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
        <Modal 
          modalVisible={this.state.openCreateModal} 
          closeModal={this.closeModal}
          navigation={this.props.navigation}
          id={id}
          overview={overview}   
          title={title}
          posterPath={poster_path}
          popularity={popularity}
          status={status}
          route={routeName}
          previousRoute={previousRoute}

        />
        <Text style={styles.title}>{title}</Text>
        <Image
          source= {{ uri: poster_path}}
          style={{ width: '100%', maxHeight: 200, flex: 1}}
        />
        <View style={styles.overview}>
          <Text style={{ alignSelf: 'center' }}>{overview}</Text>
        </View>
        <View style={styles.information}>
          <Text style={{ fontWeight: 'bold'}}>Popularity: </Text>
          <Text>{popularity}</Text>
        </View>
        <View style={styles.information}>
          <Text style={{ fontWeight: 'bold'}}>Status: </Text>
          <Text>{status}</Text>
        </View>
        {previousRoute === 'MoviePage' ?
        <Mutation mutation={DELETE_MOVIE_DATA}
          refetchQueries={() => [{query: GET_ALL_MOVIES }]}
        >
        {(deleteMovieData, { data }) => (
          <View style={styles.button}>
            <TouchableOpacity
              onPress={this.deleteData(deleteMovieData, id)}
              style={{ alignItems: 'center', justifyContent: 'center', width: 100, height: 50, borderRadius: 8 }}
            >
              <Text style={{ color: 'red'}}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.openUpdateModal}
              style={{ alignItems: 'center', justifyContent: 'center', width: 100, height: 50, borderRadius: 8 }}
            >
              <Text style={{ color: '#CC7E14'}}>Update</Text>
            </TouchableOpacity>
          </View>
        )}
        </Mutation> :
          <Mutation mutation={DELETE_TV_DATA}
            refetchQueries={() => [{ query: GET_ALL_TV_SERIES }]}
          >
          {(deleteTvSeriesData, { data }) => (
            <View style={styles.button}>
              <TouchableOpacity
                onPress={this.deleteTvData(deleteTvSeriesData, id)}
                style={{ alignItems: 'center', justifyContent: 'center', width: 100, height: 50, borderRadius: 8 }}
              >
                <Text style={{ color: 'red'}}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.openUpdateModal}
                style={{ alignItems: 'center', justifyContent: 'center', width: 100, height: 50, borderRadius: 8 }}
              >
                <Text style={{ color: '#CC7E14' }}>Update</Text>
              </TouchableOpacity>
            </View>
            )}
          </Mutation>
        }
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 5,
    margin: 5,
    justifyContent: 'flex-start',
    flex: 1,
    padding: 5
  },

  overview: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },

  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 1
  },

  title: {
    fontWeight: 'bold',
    fontSize: 15,
    alignSelf: 'center',
    marginBottom: 10
  },

  information: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    width: '80%%',
    marginTop: 5,
  }
})
 
export default Details;