import gql from "graphql-tag";

export default deleteMovie = gql`
  mutation deleteMovie($id: ID!) {
    deleteMovie(id: $id) {
        info
    }
  }`