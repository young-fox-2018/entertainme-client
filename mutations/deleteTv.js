import gql from "graphql-tag";

export default deleteTv = gql`
mutation deleteTv($id: ID!) {
    deleteTv(id: $id) {
        info
    }
  }`