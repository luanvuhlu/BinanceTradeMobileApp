import {
    TabNavigator,
    StackNavigator,
} from 'react-navigation';
// import './config/ReactotronConfig';
import FavoritesScreen from './screens/tabs/FavoritesScreen';
import AllCoinScreen from './screens/tabs/AllCoinScreen';
import VNDScreen from './screens/tabs/VNDScreen';
import ProfitScreen from './screens/tabs/ProfitScreen'
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
    }
},{
    initialRouteName: 'home',
});

export default AppNavigator;



