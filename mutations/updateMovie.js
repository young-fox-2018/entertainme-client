import gql from "graphql-tag";

export default updateMovie = gql`
  mutation updateMovie($id: ID!, $title: String!, $overview: String!, $poster_path: String!, $popularity: String!, $tag: [String], $status: String!) {
    updateMovie(id: $id, title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tag: $tag, status: $status){
       info
    }
  }`