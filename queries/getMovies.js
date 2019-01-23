import gql from "graphql-tag";

export default getMovies = gql`{
    getMovies{
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