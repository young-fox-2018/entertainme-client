import React, { Component } from 'react';
import { StyleSheet, View , Image, Text, TouchableOpacity } from 'react-native';

class MovieItem extends Component {
  constructor(props) {
    super(props);
  }

  openUpdateForm = () => {
    this.props.navigation.navigate('Details', {
      title: this.props.title,
      overview: this.props.overview,
      popularity: this.props.popularity,
      poster_path: this.props.poster_path,
      status: this.props.status,
      tag: this.props.tag,
      id: this.props.id,
      previousRoute: this.props.navigation.state.routeName
    });
  }

  render() {
    return (
      <TouchableOpacity
          onPress={this.openUpdateForm}
          style={{ width: '50%', height: 200 }}
        >
      <View style={styles.container}>
        <Image
          source={{ uri: this.props.poster_path }}
          style={{flex: 1}}
        />
      </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'black',
    padding: 5
  },

  title: {
    fontWeight: 'bold',
    fontSize: 15,

  },

  overview: {
    width: '80%',
    flexWrap: 'wrap'
  },

  info: {
    fontWeight: 'bold'
  },

  information: { 
    paddingLeft: 10,
    paddingRight: 5,
    flex: 1
  }
})
 
export default MovieItem;