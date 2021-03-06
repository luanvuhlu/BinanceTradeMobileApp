import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
    TouchableNativeFeedback,
    TouchableWithoutFeedback
} from 'react-native';
import binanceServices from '../../binanceApi/config';
import CoinInfoItem from '../../components/coins/CoinInfoItem';
import Header from '../../components/coins/Header';
import {connect} from 'react-redux';
import {addFavorite, loadCoins, removeFavorite} from "../../redux/modules/coins/actions";
import {Icon} from 'react-native-elements';

class FavoritesScreen extends Component{
    static navigationOptions = ({navigation}) => {
        const { params = {} } = navigation.state;
        return {
                    headerRight: (
                        <Icon
                            name='search'
                            type='font-awesome'
                            onPress={() => navigation.navigate('search')}
                        />
                    ),
                    tabBarLabel: 'Favorites',
                }
    }

    constructor(props){
        super(props);

        this.loadAllCoin = this.loadAllCoin.bind(this);
        this._renderItem = this._renderItem.bind(this);
    }

    // onSearchCoin = text => {
    //     console.log(text);
    //     // TODO
    //     // this.props.loadCoins();
    // }

    loadAllCoin(){
        console.log(this.props.isCoinLoading);
        if(this.props.isCoinLoading){
            return;
        }
        this.props.loadCoins();
    }


    _renderItem(listItem){
        return (
          <CoinInfoItem
              item={listItem.item}
              navigation={this.props.navigation}
              favorite={true}
              onPressItem = {item => {
                  // console.log(item);
              }}
          />
        );
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableWithoutFeedback onPress={() => {
                        this.state.nameAsc = this.state.nameAsc === 0 ? 1 : -1*this.state.nameAsc;
                        // this.setState({
                        //     allCoins: this._sortByName(this.state.allCoins)
                        // });
                    }}>
                        <View style={styles.symbol}>
                            <Text>Name</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <View style={styles.price}>
                            <Text>Price(L)</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.favorites}/>
                </View>
                <FlatList
                    style={styles.coinList}
                    data={this.props.favorites}
                    renderItem = {this._renderItem}
                    keyExtractor={(item) => item.symbol}
                    onPressItem={() => {
                    }}
                    refreshControl = {
                        <RefreshControl
                            refreshing={this.props.isCoinLoading}
                            onRefresh={this.loadAllCoin}
                        />
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    coinList: {
        flex: 1,
    },
    header: {
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
    favorites: state.coins.favorites,
    isCoinLoading: state.coins.isCoinLoading
})
const mapDispatchToProps = {
    loadCoins,
    addFavorite,
    removeFavorite
};
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen);