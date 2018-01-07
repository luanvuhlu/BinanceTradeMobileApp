import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native';

class ProfitScreen extends Component{
    static navigationOptions = {
        tabBarLabel: 'Profit',
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

export default ProfitScreen ;