import React, { Component } from 'react';
import MovieList from '../../components/MovieList/index.js';

class TvSeries extends Component {
  constructor(props) {
    super(props);
  }
  render() { 
    return (
      <MovieList navigation={this.props.navigation} />
    )
  }
}
 
export default TvSeries;