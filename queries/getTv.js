import gql from "graphql-tag";

export default getTv = gql`{
    getTv{
        info
        data {
        _id
        title
        overview
        poster_path
        popularity
        tag {
            text
            _id
        }
        }
    }
}
`