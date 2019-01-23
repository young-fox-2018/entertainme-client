import gql from "graphql-tag";

export default addTv = gql`
  mutation addTv($title: String!, $overview: String!, $poster_path: String!, $popularity: String!, $tag: [String], $status: String!) {
    addTv(title: $title, overview: $overview, poster_path: $poster_path, popularity: $popularity, tag: $tag, status: $status) {
        data {
            title
            overview
            poster_path
            popularity
        }
        info
    }
  }`