import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHightlight,
} from 'react-native';
import {Icon} from 'react-native-elements';
import binanceServices from '../../../binanceApi/config';
import {connect} from 'react-redux';

class CoinDetail extends Component {
    componentDidMount(){
        binanceServices.queryOrder(this.props.selectedCoin)
            .then(order => {
                console.log(order);
            })
            .catch(console.error);
    }
    render(){
        return (
            <View>
                <Text>Coin detail</Text>
            </View>
        )
    }
}

const mapStateToProps = (state, owns) => {
    selectedCoin : state.coins.selectedCoin
}

export default connect(mapStateToProps)(CoinDetail);