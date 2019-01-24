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
export const createMovie = gql`
                            mutation createMutation($title: String, $poster_path: String, $overview: String, $popularity: Float) {
                                createMovie (title: $title, poster_path: $poster_path, overview: $overview, popularity: $popularity) {
                                    info
                                    data {
                                        title
                                        poster_path
                                        overview
                                        popularity
                                    }
                                }
                            }`
export const createSeries = gql`
                            mutation createMutation($title: String, $poster_path: String, $overview: String, $popularity: Float) {
                                createSeries (title: $title, poster_path: $poster_path, overview: $overview, popularity: $popularity) {
                                    info
                                    data {
                                        title
                                        poster_path
                                        overview
                                        popularity
                                    }
                                }
                            }`
export const updateMovie = gql`
                            mutation updateMutation($id: String, $title: String, $poster_path: String, $overview: String, $popularity: Float) {
                                updateMovie (id: $id, title: $title, poster_path: $poster_path, overview: $overview, popularity: $popularity) {
                                    info
                                    data {
                                        title
                                        poster_path
                                        overview
                                        popularity
                                    }
                                }
                            }`
export const updateSeries = gql`
                            mutation updateMutation($id: String, $title: String, $poster_path: String, $overview: String, $popularity: Float) {
                                updateSeries (id: $id, title: $title, poster_path: $poster_path, overview: $overview, popularity: $popularity) {
                                    info
                                    data {
                                        title
                                        poster_path
                                        overview
                                        popularity
                                    }
                                }
                            }`