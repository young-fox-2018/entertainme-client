import React, { Component } from 'react'
import { View, Image, ScrollView, StyleSheet, ImageBackground } from 'react-native'
import { Button, Text } from 'native-base'
import { Mutation } from "react-apollo"

import { deleteMovie, moviesQuery } from '../../queries'

class Detail extends Component {
  mutate = fn => () => {
    fn({
      variables: {
        id: this.props.navigation.getParam('item')._id
      }
    })
    this.props.navigation.goBack()
  }

  render() {
    let item = this.props.navigation.getParam('item')
    return (
      <ImageBackground source={{ uri: `${item.poster_path}` }} style={{ width: '100%', height: '100%' }}>
        <ScrollView style={styles.container}>
          <View style={styles.top}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.popularityText}>Popularity: {item.popularity}</Text>
          </View>
          <View style={styles.overview}>
            <Text style={styles.overviewText}>
              {item.overview}
            </Text>
          </View>
          <Mutation
            mutation={deleteMovie}
            refetchQueries={[{ query: moviesQuery }]}
          >
            {
              deleteMovie =>
                <View style={styles.actions}>
                  <Button rounded danger
                    onPress={this.mutate(deleteMovie)}
                  >
                    <Text>Delete</Text>
                  </Button>
                  <Button rounded warning>
                    <Text>Update</Text>
                  </Button>
                </View>
            }
          </Mutation>
        </ScrollView>

      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  background: {

  },
  container: {
    paddingRight: 15,
    paddingLeft: 15,
    backgroundColor: "rgba(255,255,255,0.7)"
  },
  top: {
    minHeight: 200,
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center"
  },
  popularityText: {
    textAlign: "center"
  },
  overview: {
    minHeight: 200
  },
  overviewText: {
    fontSize: 17,
    textAlign: "right"
  },
  actions: {
    flexDirection: "row",
    minHeight: 200,
    justifyContent: "space-evenly",
    alignItems: "flex-start"
  }
})


export default Detail