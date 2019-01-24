import {createStackNavigator, createAppContainer} from 'react-navigation'
import MovieList from '../../components/movieList'
import Detail from '../../components/detail'
import Edit from '../../components/edit'

const navigator = createStackNavigator({
    Movies: {
        screen: MovieList
    },
    Detail: {
        screen: Detail
    },
    Edit: {
        screen: Edit
    }
})

export default createAppContainer(navigator)