import React from 'react'
import { View, Image } from 'react-native'

const loading = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={{ uri: "https://media.giphy.com/media/uyCJt0OOhJBiE/giphy.gif" }} style={{ width: 60, height: 60 }} />
        </View>
    )
}

export default loading