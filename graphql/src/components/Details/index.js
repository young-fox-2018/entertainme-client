import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { deleteMovieData } from '../../queries/index.js';

class Details extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = () => {
    return {
      title: 'Kuda',
      headerStyle: {
        backgroundColor: '#14CC46'
      },
      headerTintColor: '#CC7E14',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }

  render() {
    const { navigation } = this.props;
    const id =  navigation.getParam('id');
    const overview =  navigation.getParam('overview');
    const title =  navigation.getParam('title');
    const poster_path = navigation.getParam('poster_path');
    const popularity = navigation.getParam('popularity');
    console.log(id,'test dari detail');

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Image
          source= {{ uri: poster_path}}
          style={{ width: '100%', maxHeight: 200, flex: 1}}
        />
        <View style={styles.information}>
          <Text style={{ fontWeight: 'bold'}}>Overview: </Text>
          <Text>{overview}</Text>
        </View>
        <View style={styles.information}>
          <Text style={{ fontWeight: 'bold'}}>Popularity: </Text>
          <Text>{popularity}</Text>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            style={{ alignItems: 'center', justifyContent: 'center', width: 100, height: 50, borderRadius: 8, backgroundColor: 'red'}}
          >
            <Text style={{ color: 'white'}}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: 'center', justifyContent: 'center', width: 100, height: 50, borderRadius: 8, backgroundColor: '#CC7E14'}}
          >
            <Text style={{ color: 'white'}}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
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

  button: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    width: '70%'
  }
})
 
export default Details;