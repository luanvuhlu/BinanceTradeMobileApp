import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    TouchableWithoutFeedback
} from 'react-native';
import { Icon } from 'react-native-elements'
import {connect} from 'react-redux';
import {loadCoins, addFavorite, removeFavorite} from '../../redux/modules/coins/actions';
import Observer, {observer} from 'mobx-react';

@observer
class CoinInfoItem extends Component {

    constructor(props){
        super(props);
        // this.state = {
        //     favorite: false
        // }
    }

    _onPress = () => {
        this.props.onPressItem(this.props.item);
    }

    // shouldComponentUpdate(){
    //     return this.props.favorite != this.favorite;
    // }

    componentWillMount(){
        console.log('Coin Item will mount');
        // this.setFavorite(this.props);
        this.favorite = this.props.favorite;
    }

    render(){
        return (
            <TouchableHighlight
                onPress={() => this.props.navigation.navigate('coinMarket')}
                onLongPress={() => this.props.navigation.navigate('coinDetail')}>
                <View style={styles.container}>
                    <Text style={styles.symbol}>{this.props.item.symbol}</Text>
                    <Text style={styles.price}>{this.props.item.price}</Text>
                    <Icon
                        style={styles.favorites}
                        name={this.favorite ? 'star' : 'star-o'}
                        size={30} color={this.favorite ? 'yellow': 'black'}
                        type='font-awesome'
                        underlayColor='white'
                        onPress={() => {
                            if(this.favorite){
                                this.props.removeFavorite(this.props.item);
                            }else{
                                this.props.addFavorite(this.props.item);
                            }
                            this.favorite = !this.favorite
                        }} />

                </View>
            </TouchableHighlight>
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
       marginRight: 100,
    }

});
const mapStateToProps = (state, ownProps) => ({
    coins: state.coins.coins,
    favorites: state.coins.favorites,
});
const mapDispatchToProps = {
    loadCoins,
    addFavorite,
    removeFavorite};

export default connect(mapStateToProps, mapDispatchToProps)(CoinInfoItem);
