import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    TouchableNativeFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class CoinInfoItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.item);
    }

    componentWillMount(){
        this.setState({
            favorite: this.props.favorite | false
        });
    }

    render(){
        return (
            <TouchableNativeFeedback
                onPress={this._onPress}>
                <View style={styles.container}>
                    <Text style={styles.symbol}>{this.props.item.symbol}</Text>
                    <Text style={styles.price}>{this.props.item.price}</Text>
                    <TouchableNativeFeedback style={styles.favorites} onPress={() => {
                        this.setState({
                            favorite: !this.state.favorite
                        })
                    }}>
                        <Icon name={this.state.favorite ? 'star' : 'star-o'} size={30} color={this.state.favorite ? 'yellow': 'black'} />
                    </TouchableNativeFeedback>

                </View>
            </TouchableNativeFeedback>
        );
    }
}
const styles = StyleSheet.create({
   container: {
       flex: 1,
       flexDirection: 'row',
       justifyContent: 'space-between',
       marginBottom: 10,
   },
    symbol:{
       marginLeft: 50,
    },
    price:{
    },
    favorites:{
       marginRight: 50,
    }

});
export default CoinInfoItem;