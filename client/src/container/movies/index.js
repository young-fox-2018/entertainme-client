import {createStackNavigator, createAppContainer} from 'react-navigation'
import MovieList from '../../components/movieList'
import Detail from '../../components/detail'

const navigator = createStackNavigator({
    Movies: {
        screen: MovieList
    },
    Detail: {
        screen: Detail
    }
})

export default createAppContainer(navigator)