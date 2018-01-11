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
// import {observer} from 'mobx-react';

// @observer
class CoinInfoItem extends React.PureComponent {

    constructor(props){
        super(props);
        this.state = {
            favorite: false
        }
    }
    _onPress = () => {
        this.props.onPressItem(this.props.item);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.favorites.length !== nextProps.favorites.length){
            this.setFavorite(nextProps);
        }
        // this.favorite = isFavorite(nextProps);
    }
    setFavorite(props){
        this.setState({
            favorite: props.favorites.some( f => f.symbol === this.props.item.symbol)
        });
    }

    isFavorite(props){
        return props.favorites.some( f => f.symbol === this.props.item.symbol)
    }
    componentWillMount(){
        console.log('Coin Item will mount');
        this.setFavorite(this.props);
        // this.favorite = this.isFavorite(this.props);
    }

    render(){
        return (
            <TouchableHighlight
                onPress={this._onPress}>
                <View style={styles.container}>
                    <Text style={styles.symbol}>{this.props.item.symbol}</Text>
                    <Text style={styles.price}>{this.props.item.price}</Text>
                    <Icon
                        style={styles.favorites}
                        name={this.state.favorite ? 'star' : 'star-o'}
                        size={30} color={this.state.favorite ? 'yellow': 'black'}
                        type='font-awesome'
                        underlayColor='white'
                        onPress={() => {
                            this.setState({
                                favorite: !this.state.favorite
                            }, () => {
                                if(this.state.favorite){
                                    this.props.addFavorite(this.props.item);
                                }else{
                                    this.props.removeFavorite(this.props.item);
                                }
                            });
                            // this.favorite = !this.favorite
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
