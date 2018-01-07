import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';
import binanceServices from '../../binanceApi/config';
import CoinInfoItem from '../../components/coins/CoinInfoItem';

class AllCoinScreen extends Component{
    static navigationOptions = {
        tabBarLabel: 'All',
        header: null,
    };

    constructor(props){
        super(props);

        this.state = {
            allCoins: [],
        };
    }

    componentDidMount(){
        binanceServices.test().then((responseJson) => {
            if (responseJson) {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                }, function () {
                    console.log('Loaded');
                });
            } else {
                this.setState({
                    isLoading: true
                }, function () {
                    console.log('Loading');
                });
            }

        })
        .catch((error) => {
            console.error(error);
        });
        if(!this.state.isLoading){
            binanceServices.allBookTickers().then((tickers) => {
                this.setState({
                    allCoins : tickers
                });
                // tickers.forEach(ticker => {
                //     console.log(ticker.symbol);
                // })
            }).catch((error) => {
                console.error(error);
            })
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

    render(){
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.coinList}
                    data={this.state.allCoins}
                    renderItem = {this._renderItem}
                    keyExtractor={(item) => item.symbol}
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
})
export default AllCoinScreen;