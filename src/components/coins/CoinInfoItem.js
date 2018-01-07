import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    TouchableWithoutFeedback
} from 'react-native';

class CoinInfoItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.item);
    }

    render(){
        // console.log(this.props.item);
        return (
            <TouchableWithoutFeedback
                onPress={this._onPress}>
                <View style={styles.container}>
                    <Text>{this.props.item.symbol}</Text>
                    <Text>{this.props.item.bidPrice}</Text>
                    <Text>{this.props.item.bidQty}</Text>
                    <Text>{this.props.item.askPrice}</Text>
                    <Text>{this.props.item.askQty}</Text>
                </View>
            </TouchableWithoutFeedback>
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

});
export default CoinInfoItem;