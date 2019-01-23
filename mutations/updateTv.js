import gql from "graphql-tag";

export default updateTv = gql`
  mutation updateTv($id: ID!, $title: String!, $overview: String!, $poster_path: String!, $popularity: String!, $tag: [String], $status: String!) {
    updateTv(id: $id, title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tag: $tag, status: $status){
       info
    }
  }`