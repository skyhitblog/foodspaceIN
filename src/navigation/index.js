'use strict'

import {Color, Config, Styles, Images} from '@common'
import {TabBar, TabBarIcon} from '@components'
import {SplashScreen} from '@containers';
import HomeScreen from './HomeScreen'
import React from 'react'
import {View, StatusBar} from 'react-native'
import {StackNavigator, TabNavigator} from 'react-navigation';
import NewsScreen from './NewsScreen'
import NewsDetailScreen from './NewsDetailScreen'
import CategoriesScreen from './CategoriesScreen'
import CategoryScreen from './CategoryScreen'
import DetailScreen from './DetailScreen'
import CartScreen from './CartScreen'
import MyOrdersScreen from './MyOrdersScreen'
import WishListScreen from './WishListScreen'
import SearchScreen from './SearchScreen'
import LoginScreen from './LoginScreen'
import SignUpScreen from './SignUpScreen'
import CustomPageScreen from './CustomPageScreen'
import ListAllScreen from './ListAllScreen'

const NewsStack = StackNavigator({
    News: {screen: NewsScreen},
    NewsDetailScreen: {screen: NewsDetailScreen},
  }
)

const CategoryStack = StackNavigator({
  CategoriesScreen: {screen: CategoriesScreen},
  CategoryScreen: {screen: CategoryScreen},
  DetailScreen: {screen: DetailScreen, navigationOptions: {tabBarVisible: false}},
})

const WishListStack = StackNavigator({
  WishListScreen: {screen: WishListScreen},
  Detail: {screen: DetailScreen},
})

const SearchStack = StackNavigator({
  Search: {screen: SearchScreen},
  DetailScreen: {screen: DetailScreen},
})

const HomeStack = StackNavigator({
  Home: {screen: HomeScreen},
  ListAllScreen: {screen: ListAllScreen},
  DetailScreen: {screen: DetailScreen},
})

const CartScreenStack = StackNavigator({
  Cart: {screen: CartScreen},
  Detail: {screen: DetailScreen},
})

export default TabNavigator({
    Default: {
      screen: ({navigation}) => <HomeStack screenProps={{rootNavigation: navigation}}/>,
      navigationOptions: {
        header: null,
        tabBarIcon: ({tintColor}) => <TabBarIcon icon={Images.IconHome} tintColor={tintColor}/>,
      }
    },

    CategoriesScreen: {
      screen: ({navigation}) => <CategoryStack screenProps={{rootNavigation: navigation}}/>,
      navigationOptions: {
        header: null,
        tabBarIcon: ({tintColor}) => <TabBarIcon css={{width: 18, height: 18}}
                                                 icon={Images.IconCategory}
                                                 tintColor={tintColor}/>
      }
    },

    Search: {
      screen: ({navigation}) => <SearchStack screenProps={{rootNavigation: navigation}}/>,
      navigationOptions: {
        header: null,
        tabBarIcon: ({tintColor}) => <TabBarIcon css={{width: 18, height: 18}}
                                                 icon={Images.IconSearch}
                                                 tintColor={tintColor}/>
      }
    },

    CartScreen: {
      screen: ({navigation}) => <CartScreenStack screenProps={{rootNavigation: navigation}}/>,
      navigationOptions: {
        header: null,
        tabBarIcon: ({tintColor}) => <TabBarIcon cartIcon
                                                 css={{width: 20, height: 20}}
                                                 icon={Images.IconCart} tintColor={tintColor}/>,
      }
    },
    MyOrders: {screen: MyOrdersScreen},
    WishListScreen: {
      screen: ({navigation}) => <WishListStack screenProps={{rootNavigation: navigation}}/>,
      navigationOptions: {
        header: null,
        tabBarIcon: ({tintColor}) => <TabBarIcon css={{width: 18, height: 18}}
                                                 wishlistIcon
                                                 icon={Images.IconHeart}
                                                 tintColor={tintColor}/>
      }
    },
    NewsScreen: {
      screen: ({navigation}) => <NewsStack screenProps={{rootNavigation: navigation}}/>,
      navigationOptions: {header: null}
    },
    LoginScreen: {screen: LoginScreen},
    SignUpScreen: {screen: SignUpScreen},
    CustomPage: {screen: CustomPageScreen},
    Detail: {screen: DetailScreen, navigationOptions: {tabBarVisible: false}},
  },
  {
    tabBarComponent: TabBar,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      activeTintColor: Color.tabbarTint,
      inactiveTintColor: Color.tabbarColor,
    },
    lazy: true
  })
