import gql from 'graphql-tag';

export const getAllMoviesData = 
  gql `{
    movies {
      info,
      data {
        _id
        title
        overview
        poster_path
        popularity
        status
        tag {
          text
        }
      }
    }
  }`

export const getAllTvSeriesData = 
gql `{
  tvSeries {
    info,
    data {
      _id
      title
      overview
      poster_path
      popularity
      status
      tag {
        text
      }
    }
  }
}`

export const deleteMovieData = 
  gql `{
    mutation DeleteMovieData(id: id) {
      deleteMovieData(id: id) { 
        info
      }
    }
  }`

