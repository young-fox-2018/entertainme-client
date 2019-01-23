import gql from "graphql-tag";

export default addMovie = gql`
  mutation addMovie($title: String!, $overview: String!, $poster_path: String!, $popularity: String!, $tag: [String], $status: String!) {
    addMovie(title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tag: $tag, status: $status) {
        data {
            title
            overview
            poster_path
            popularity
        }
        info
    }
  }`