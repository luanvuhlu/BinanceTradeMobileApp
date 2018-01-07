import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native';

class FavoritesScreen extends Component{
    static navigationOptions = {
        tabBarLabel: 'Favorites',
        header: null,
    };
    render(){
        return (
            <View>
                <Text>Hello world</Text>
            </View>
        )
    }
}

export default FavoritesScreen;