import gql from "graphql-tag"

export const moviesQuery = gql`
                                {
                                    movies {
                                        data {
                                            _id
                                            poster_path
                                            title
                                            overview
                                            popularity
                                            tag {
                                                _id
                                                text
                                            }
                                        }
                                    }
                                }`

export const seriesQuery = gql`
                                {
                                    series {
                                        data {
                                            _id
                                            poster_path
                                            title
                                            overview
                                            popularity
                                            tag {
                                                _id
                                                text
                                            }
                                        }
                                    }
                                }`
export const deleteMovieQuery = gql`
                                mutation deleteMutation($id: String) {
                                    deleteMovie (id: $id){
                                        info
                                    }
                                }`
export const deleteSeriesQuery = gql`
                                mutation deleteMutation($id: String) {
                                    deleteSeries (id: $id){
                                        info
                                    }
                                }`