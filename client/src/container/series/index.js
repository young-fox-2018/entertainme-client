import {createStackNavigator, createAppContainer} from 'react-navigation'
import SeriesList from '../../components/seriesList'
import Detail from '../../components/detail'
import Edit from '../../components/edit'

const navigator = createStackNavigator({
    Series: {
        screen: SeriesList
    },
    Detail: {
        screen: Detail
    },
    Edit: {
        screen: Edit
    }
})

export default createAppContainer(navigator)
