import React, {Component} from "react";
import {View} from 'react-native'
import {Logo, Back, EmptyView} from './IconNav'

import {warn} from "@app/Omni"
import {Color, Config, Constants, Images, Styles} from '@common'
import {Detail} from "@containers";

export default  class DetailScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: Logo(),
    tabBarVisible: false,
    headerLeft: Back(navigation),
    headerRight: EmptyView(), // CartWishListIcons(navigation),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.toolbar,
    headerTitleStyle: Styles.Common.headerStyle,
  })

  componentDidMount() {
    // this.props.screenProps.rootNavigation.setParams({tabBarVisible: false});
  }

  render() {
    const {state, navigate} = this.props.navigation;
    let rootNavigation = this.props.navigation;
    if (typeof this.props.screenProps != 'undefined') {
      rootNavigation = this.props.screenProps.rootNavigation;
    }

    return <View style={{flex: 1}}>
      {typeof state.params != 'undefined' &&
      <Detail product={state.params.product}
              onViewCart={() => rootNavigation.navigate('CartScreen')}
              onViewProductScreen={(product) => navigate('DetailScreenMore', product)}
              navigation={this.props.navigation}/>}
    </View>
  }
}