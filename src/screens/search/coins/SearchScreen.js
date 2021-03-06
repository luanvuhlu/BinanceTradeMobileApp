import React, {Component} from 'react';
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    TouchableHightlight,
    TouchableWithoutFeedback,
    RefreshControl
} from 'react-native';
import CoinInfoItem from '../../../components/coins/CoinInfoItem';
import Header from '../../../components/coins/Header';
import {connect} from 'react-redux';
import {loadCoins, addFavorite, removeFavorite} from '../../../redux/modules/coins/actions'
import {Icon} from 'react-native-elements';

class SearchScreen extends Component{
    static navigationOptions = ({navigation}) => {
        const { params = {} } = navigation.state;
        return {
            header: (
                <Header
                    onChangeText={text => params.onSearchCoin(text)} />
            ),
            headerRight: (
                 <Icon
                            name='search'
                            type='font-awesome'
                            onPress={() => navigation.navigate('search')}
                        />
            ),
            tabBarLabel: 'All',
        }
    }
     constructor(props){
        super(props);

        this.loadAllCoin = this.loadAllCoin.bind(this);
        this._renderItem = this._renderItem.bind(this);
        this.state = {
            coins: [],
            favorites: [],
            isLoading : false,
            nameAsc: 1,
            searchText: null,
        };
    }

     onSearchCoin = text => {
        console.log(text);
        this.setState({
            searchText: text
        });
        // TODO
        // this.props.loadCoins();
    }
     componentDidMount(){
        this.props.navigation.setParams({
            onSearchCoin: this.onSearchCoin
        });
    }


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
              favorite={this.props.favorites.some( f => f.symbol === listItem.item.symbol)}
              onPressItem = {item => {
                  console.log(item);
              }}
          />
        );
    }
    getCoins(){
        if(this.state.searchText === null || this.state.searchText === ''){
            return this.props.coins;
        }
        return this.props.coins.filter(c => c.symbol.startsWith(this.state.searchText.toUpperCase()));
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableWithoutFeedback onPress={() => {
                        this.state.nameAsc = this.state.nameAsc === 0 ? 1 : -1*this.state.nameAsc;
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
                    data={this.getCoins()}
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);