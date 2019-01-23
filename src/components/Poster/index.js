import React, { Component } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

class Poster extends Component {
  handlePress = () => {
    this.props.navigation.navigate('Detail', {
      item: this.props.item,
      type: this.props.type
    })
  }

  render() {
    return (
      <TouchableOpacity onPress={this.handlePress} style={{padding: 1, width: "50%"}}>
        <Image
          source={{ uri: `${this.props.item.poster_path}` }}
          style={{ width: "100%", height: 263 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    )
  }
}

export default withNavigation(Poster)