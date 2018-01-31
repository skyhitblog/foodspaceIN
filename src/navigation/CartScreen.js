import React, {Component} from "react";

import {Color, Images, Styles} from '@common'
import {TabBarIcon} from '@components'
import {Cart} from "@containers";

export default class CartScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    header: null,
    tabBarIcon: ({tintColor}) => <TabBarIcon cartIcon navigation={navigation} css={{width: 20, height: 20}}
                                             icon={Images.IconCart} tintColor={tintColor}/>,
  })

  render() {
    const {navigate, goBack} = this.props.navigation;
    const rootNavigation = this.props.screenProps.rootNavigation;

    return <Cart
      onMustLogin={() => rootNavigation.navigate('LoginScreen', {onCart: true})}
      onBack={() => rootNavigation.navigate('Default')}
      onFinishOrder={() => rootNavigation.navigate('MyOrders')}
      onViewHome={() => rootNavigation.navigate('Default')}
      onViewProduct={(product) => navigate('Detail', product) }
      navigation={this.props.navigation}/>
  }
}