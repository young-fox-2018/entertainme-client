import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, TextInput , View, Alert, StyleSheet} from 'react-native';
import { CREATE_MOVIE_DATA, GET_ALL_MOVIES, UPDATE_TV_DATA, CREATE_TV_DATA, UPDATE_MOVIE_DATA, GET_ALL_TV_SERIES } from '../../queries/index.js';
import { Mutation } from 'react-apollo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 10,
    marginTop: 50
  },

  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10
  }
})

class CreateDataModal extends Component {
  state = {
    title: '',
    overview: '',
    popularity: 0,
    posterPath: '',
    status: '',
    tag: '',
    id: ''
  }

  changeOnTitle = (text) => {
    this.setState({
      title:  text
    })
  }

  changeOnStatus = (text) => {
    this.setState({
      status:  text
    })
  }

  changeOnPopularity = (text) => {
    this.setState({
      popularity:  text
    })
  }

  changeOnOverview = (text) => {
    this.setState({
      overview:  text
    })
  }

  changeOnPosterPath = (text) => {
    this.setState({
      posterPath:  text
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        title: this.props.title,
        overview: this.props.overview,
        popularity: this.props.popularity,
        status: this.props.status,
        posterPath: this.props.posterPath,
        id: this.props.id
      }, () => {
        console.log(this.state)
      })

      return true
    }
  }

  addData = (createData) => () => {
    const { title, popularity, status, overview, posterPath } = this.state;
    createData({ variables: { title: title, popularity: Number(popularity), status: status, overview: overview, poster_path: posterPath }});
    this.props.closeModal();
  }

  updateData = (updateData) => () => {
    const { id, title, popularity, status, overview, posterPath } = this.state;
    updateData({ variables: { id: id, title: title, popularity: Number(popularity), status: status, overview: overview, poster_path: posterPath }});
    this.props.closeModal();
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modalVisible}
        style={styles.container}
      >
        <View style={styles.container}>
          <Text>Title:</Text>
          <TextInput
            placeholder="title..."
            editable={true}
            style={styles.textInput}
            autoCapitalize={false}
            value={this.state.title}
            onChangeText={this.changeOnTitle}
          />
          <Text>Overview:</Text>
          <TextInput
            placeholder="overview..."
            editable={true}
            style={styles.textInput}
            autoCapitalize={false}
            value={this.state.overview}
            onChangeText={this.changeOnOverview}
          />
          <Text>Popularity:</Text>
          <TextInput
            placeholder="popularity..."
            editable={true}
            style={styles.textInput}
            autoCapitalize={false}
            value={String(this.state.popularity)}
            onChangeText={this.changeOnPopularity}
          />
          <Text>Poster path:</Text>
          <TextInput
            placeholder="poster path..."
            editable={true}
            style={styles.textInput}
            value={this.state.posterPath}
            onChangeText={this.changeOnPosterPath}
          />
          <Text>Status:</Text>
          <TextInput
            placeholder="status..."
            editable={true}
            style={styles.textInput}
            value={this.state.status}
            onChangeText={this.changeOnStatus}
          />
          {this.props.route === 'MoviePage' && !this.props.previousRoute &&
          <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableHighlight
              onPress={this.props.closeModal}
          >
            <Text style={{ color: '#6BBAB4'}}>Close</Text>
          </TouchableHighlight>
            <Mutation 
              mutation={CREATE_MOVIE_DATA}
              refetchQueries={() => [{ query: GET_ALL_MOVIES }] }
            >
            {(createMovieData, { data }) => (
              <TouchableHighlight
                onPress={this.addData(createMovieData)}
              >
                <Text style={{ color: '#D5ADA5' }}>Create</Text>
              </TouchableHighlight>
            )}
            </Mutation>
            </View>
          }
          {this.props.route === 'TvSeries' && !this.props.previousRoute &&
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableHighlight
                onPress={this.props.closeModal}
            >
              <Text style={{ color: '#6BBAB4'}}>Close</Text>
            </TouchableHighlight>
              <Mutation 
                mutation={CREATE_TV_DATA}
                refetchQueries={() => [{ query: GET_ALL_TV_SERIES }] }
              >
              {(createTvSeriesData, { data }) => (
                <TouchableHighlight
                  onPress={this.addData(createTvSeriesData)}
                >
                  <Text style={{ color: '#D5ADA5' }}>Create</Text>
                </TouchableHighlight>
              )}
              </Mutation>
            </View>
          } 
          {this.props.route === 'Details' && this.props.previousRoute === 'MoviePage' &&
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableHighlight
                onPress={this.props.closeModal}
            >
              <Text style={{ color: '#6BBAB4'}}>Close</Text>
            </TouchableHighlight>
              <Mutation 
              mutation={UPDATE_MOVIE_DATA}
              refetchQueries={() => [{ query: GET_ALL_MOVIES }] }
            >
            {(updateMovieData, { data }) => (
              <TouchableHighlight
                onPress={this.updateMovieData(updateMovieData)}
              >
                <Text style={{ color: '#D5ADA5' }}>Update</Text>
              </TouchableHighlight>
            )}
            </Mutation>
            </View>
          }
          {this.props.route === 'Details' && this.props.previousRoute === 'TvSeries' &&
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableHighlight
                onPress={this.props.closeModal}
            >
              <Text style={{ color: '#6BBAB4'}}>Close</Text>
            </TouchableHighlight>
              <Mutation 
              mutation={UPDATE_TV_DATA}
              refetchQueries={() => [{ query: GET_ALL_TV_SERIES }] }
            >
            {(updateTvSeriesData, { data }) => (
              <TouchableHighlight
                onPress={this.updateData(updateTvSeriesData)}
              >
                <Text style={{ color: '#D5ADA5' }}>Update</Text>
              </TouchableHighlight>
            )}
            </Mutation>
            </View>
          }
        </View>
      </Modal>
    );
  }
}

export default CreateDataModal