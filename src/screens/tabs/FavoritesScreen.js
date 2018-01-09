import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
    TouchableNativeFeedback
} from 'react-native';
import binanceServices from '../../binanceApi/config';
import CoinInfoItem from '../../components/coins/CoinInfoItem';

class FavoritesScreen extends Component{
    static navigationOptions = {
        tabBarLabel: 'Favorites',
        header: null,
    };
    constructor(props){
        super(props);

        this.state = {
            allCoins: [],
            isLoading : false,
            nameAsc: 1
        };
        this.loadAllCoin = this.loadAllCoin.bind(this);
        this._sortByName = this._sortByName.bind(this);
        this.loadCoinInterval = null;
    }

    loadAllCoin(){
        if(this.state.isLoading){
            return;
        }
        this.setState({
            isLoading: true,
        });

        binanceServices.allPricesTickers().then((tickers) => {
            this.setState({
                allCoins : this._sortByName(tickers),
                isLoading: false
            });
        }).catch((error) => {
            console.error(error);
        })
    }

    componentDidMount(){
        binanceServices.test().then((responseJson) => {
            console.log(responseJson);
            if (responseJson) {
                this.loadAllCoin();
            } else {
                console.log('Loading');
            }

        })
        .catch((error) => {
            console.error(error);
        });
        this.loadCoinInterval = setInterval(this.loadAllCoin, 30000);
    }

    componentWillUnmount(){
        if(this.loadCoinInterval){
            clearInterval(this.loadCoinInterval);
        }
    }

    _renderItem(listItem){
        return (
          <CoinInfoItem
              item={listItem.item}
              onPressItem = {item => {
                  console.log(item);
              }}
          />
        );
    }

    _sortByName(allCoins){
        const nameAsc = this.state.nameAsc;
        if(nameAsc === 0){
            return allCoins;
        }
        return allCoins.sort((a, b) => nameAsc *(a-b));
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableNativeFeedback onPress={() => {
                        this.state.nameAsc = this.state.nameAsc === 0 ? 1 : -1*this.state.nameAsc;
                        this.setState({
                            allCoins: this._sortByName(this.state.allCoins)
                        });
                    }}>
                        <Text style={styles.symbol}>Name</Text>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback>
                        <Text style={styles.price}>Price(L)</Text>
                    </TouchableNativeFeedback>
                    <View style={styles.favorites}/>
                </View>
                <FlatList
                    style={styles.coinList}
                    data={this.state.allCoins}
                    renderItem = {this._renderItem}
                    keyExtractor={(item) => item.symbol}
                    onPressItem={() => {
                    }}
                    refreshControl = {
                        <RefreshControl
                            refreshing={this.state.isLoading}
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

export default FavoritesScreen;