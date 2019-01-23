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