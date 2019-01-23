import gql from "graphql-tag";

export default getTags = gql`{
    getTags{
        data {
            text
            _id
        }
    }
}
`