import {createStackNavigator, createAppContainer} from 'react-navigation'
import SeriesList from '../../components/seriesList'
import Detail from '../../components/detail'

const navigator = createStackNavigator({
    Series: {
        screen: SeriesList
    },
    Detail: {
        screen: Detail
    }
})

export default createAppContainer(navigator)
