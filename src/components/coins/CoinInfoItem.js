import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {loadCoins, addFavorite, removeFavorite} from '../../redux/modules/coins/actions';

class CoinInfoItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.item);
    }

    componentWillReceiveProps(nextProps){
        // TODO DATE Time
        if(this.props.favorites.length !== nextProps.favorites.length){
            this.setFavorite(nextProps);
        }
    }

    setFavorite(props){
        this.setState({
            favorite: props.favorites.some( f => f.symbol === this.props.item.symbol)
        });
    }
    componentWillMount(){
       this.setFavorite(this.props);
    }

    render(){
        return (
            <TouchableWithoutFeedback
                onPress={this._onPress}>
                <View style={styles.container}>
                    <Text style={styles.symbol}>{this.props.item.symbol}</Text>
                    <Text style={styles.price}>{this.props.item.price}</Text>
                    <TouchableWithoutFeedback style={styles.favorites} onPress={() => {
                        if(this.state.favorite){
                            this.props.removeFavorite(this.props.item);
                        }else{
                            this.props.addFavorite(this.props.item);
                        }
                        this.setState({
                            favorite: !this.state.favorite
                        })
                    }}>
                        <Icon name={this.state.favorite ? 'star' : 'star-o'} size={30} color={this.state.favorite ? 'yellow': 'black'} />
                    </TouchableWithoutFeedback>

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
    symbol:{
       marginLeft: 50,
    },
    price:{
    },
    favorites:{
       marginRight: 50,
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
