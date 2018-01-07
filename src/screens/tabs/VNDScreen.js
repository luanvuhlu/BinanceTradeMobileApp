import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native';

class VNDScreen extends Component{
    static navigationOptions = {
        tabBarLabel: 'VNĐ',
        header: null,
    };

    render(){
        return (
            <View>
                <Text>VND</Text>
            </View>
        )
    }
}

export default VNDScreen;