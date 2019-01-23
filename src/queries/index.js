import gql from "graphql-tag"


export const moviesQuery = gql`
  {
    movies {
      info
      data {
        _id
        title
        overview
        poster_path
        popularity
        status
        tag {
          _id
          text
        }
      }
    }
  }
`

export const deleteMovie = gql`
  mutation DeleteMutation($id: String) {
    deleteMovie(id: $id) {
      info
    }
  }
`

export const seriesQuery = gql`
  {
    series {
      info
      data {
        _id
        title
        overview
        poster_path
        popularity
        status
        tag {
          _id
          text
        }
      }
    }
  }
`

export const deleteSeries = gql`
  mutation DeleteMutation($id: String) {
    deleteSeries(id: $id) {
      info
    }
  }
`

export const createMovie = gql`
  mutation PostMutation($title: String, $overview: String, $poster_path: String, $popularity: Float, $status: String) {
    createMovie(title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, status: $status) {
      info
      data {
        _id
        title
        overview
        poster_path
        popularity
        status
        tag {
          _id
          text
        }
      }
    }
  }
`

export const createSeries = gql`
  mutation PostMutation($title: String, $overview: String, $poster_path: String, $popularity: Float, $status: String) {
    createSeries(title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, status: $status) {
      info
      data {
        _id
        title
        overview
        poster_path
        popularity
        status
        tag {
          _id
          text
        }
      }
    }
  }
`