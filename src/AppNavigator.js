import {
    TabNavigator,
    StackNavigator,
} from 'react-navigation';
import {
  Easing,
  Animated
} from 'react-native';
// import './config/ReactotronConfig';
import FavoritesScreen from './screens/tabs/FavoritesScreen';
import AllCoinScreen from './screens/tabs/AllCoinScreen';
import VNDScreen from './screens/tabs/VNDScreen';
import ProfitScreen from './screens/tabs/ProfitScreen';
import SearchScreen from './screens/search/coins/SearchScreen';
import CoinDetail from './screens/search/coins/CoinDetail';
import CoinMarketDetail from './screens/search/coins/CoinMarketDetail';

const TopTabScreen = TabNavigator({
   allCoin: {
      screen: AllCoinScreen
   },
   favorites: {
       screen: FavoritesScreen
   },
   vnd: {
      screen: VNDScreen
   },
   profit: {
      screen: ProfitScreen
   }
}, {
    tabBarPosition: 'top',
    swipeEnabled: true,
});


// const BottomTabScreen = TabNavigator({
  
// });

const AppNavigator = StackNavigator({
    home: {
        screen: TopTabScreen,
    },
    search: {
        screen: SearchScreen
    },
    coinDetail: {
        screen: CoinDetail,
    },
    coinMarket: {
        screen: CoinMarketDetail
    }
},{
    initialRouteName: 'home',
   navigationOptions: {
     gesturesEnabled: true,
   },
   transitionConfig: () => ({
     transitionSpec: {
       duration: 300,
       easing: Easing.out(Easing.poly(4)),
       timing: Animated.timing,
     },
     screenInterpolator: sceneProps => {
       const { layout, position, scene } = sceneProps;
       const { index } = scene;

       const height = layout.initHeight;
       const translateY = position.interpolate({
         inputRange: [index - 1, index, index + 1],
         outputRange: [height, 0, 0],
       });

       const opacity = position.interpolate({
         inputRange: [index - 1, index - 0.99, index],
         outputRange: [0, 1, 1],
       });

       return { opacity, transform: [{ translateY }] };
     },
   }),
});

export default AppNavigator;



