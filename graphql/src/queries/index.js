import gql from 'graphql-tag';

export const GET_ALL_MOVIES = 
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

export const CREATE_MOVIE_DATA =
gql `
  mutation AddMovieData($title: String!, $overview: String, $popularity: Float, $status: String, $poster_path: String) {
    createMovieData(title: $title, overview: $overview, popularity: $popularity, status: $status, poster_path: $poster_path) { 
      info,
      data {
        _id
        title
        overview
        poster_path
        popularity
        status
      }
    }
  }
`

export const UPDATE_MOVIE_DATA =
gql `
  mutation UpdateMovieData($id: ID, $title: String!, $overview: String, $popularity: Float, $status: String, $poster_path: String) {
    updateMovieData(id: $id, title: $title, overview: $overview, popularity: $popularity, status: $status, poster_path: $poster_path) { 
      info,
      data {
        _id
        title
        overview
        poster_path
        popularity
        status
      }
    }
  }
`

export const UPDATE_TV_DATA =
gql `
  mutation UpdateTvSeriesData($id: ID, $title: String!, $overview: String, $popularity: Float, $status: String, $poster_path: String) {
    updateTvSeriesData(id: $id, title: $title, overview: $overview, popularity: $popularity, status: $status, poster_path: $poster_path) { 
      info,
      data {
        _id
        title
        overview
        poster_path
        popularity
        status
      }
    }
  }
`

export const CREATE_TV_DATA =
gql `
mutation AddTvData($title: String!, $overview: String, $popularity: Float, $status: String, $poster_path: String) {
  createTvSeriesData(title: $title, overview: $overview, popularity: $popularity, status: $status, poster_path: $poster_path) { 
    info,
    data {
      _id
      title
      overview
      poster_path
      popularity
      status
    }
  }
}
`

export const GET_ALL_TV_SERIES = 
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

export const DELETE_MOVIE_DATA = 
  gql `
    mutation DeleteMovieData($id: ID!) {
      deleteMovieData(id: $id) { 
        info
      }
    }
  `

export const DELETE_TV_DATA = 
  gql `
    mutation DeleteTvData($id: ID!) {
      deleteTvSeriesData(id: $id) { 
        info
      }
    }
  `

