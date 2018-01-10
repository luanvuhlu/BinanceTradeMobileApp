import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
    TouchableWithoutFeedback,
    TouchableNativeFeedback
} from 'react-native';
import {connect} from 'react-redux';
import binanceServices from '../../binanceApi/config';
import CoinInfoItem from '../../components/coins/CoinInfoItem';
import {loadCoins, addFavorite, removeFavorite} from '../../redux/modules/coins/actions';

class AllCoinScreen extends Component{
    static navigationOptions = {
        tabBarLabel: 'All',
        header: null,
    };

    constructor(props){
        super(props);

        this.state = {
            coins: [],
            favorites: [],
            isLoading : false,
            nameAsc: 1
        };
        this.loadAllCoin = this.loadAllCoin.bind(this);
        // this._sortByName = this._sortByName.bind(this);
        this.loadCoinInterval = null;
    }

    loadAllCoin(){
        console.log('First click' + this.props.isCoinLoading);
        if(this.props.isCoinLoading){
            return;
        }
        this.props.loadCoins();
    }

    componentDidMount(){
        // this.loadAllCoin();
        // this.loadCoinInterval = setInterval(this.loadAllCoin, 3000);
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
                    data={this.props.coins}
                    renderItem = {this._renderItem}
                    keyExtractor={(item) => item.symbol}
                    onPressItem={() => {
                    }}
                    refreshControl = {
                        <RefreshControl
                            title="Refreshing"
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
    coins: state.coins.coins,
    favorites: state.coins.favorites,
    isCoinLoading: state.coins.isCoinLoading
});
const mapDispatchToProps = {
    loadCoins,
    addFavorite,
    removeFavorite
};

export default connect(mapStateToProps, mapDispatchToProps)(AllCoinScreen);