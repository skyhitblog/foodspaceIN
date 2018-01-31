import React, {Component} from "react";

import {Images, Color, Styles} from '@common'
import {TabBarIcon} from '@components'
import {MyOrders} from "@containers";

export default class MyOrdersScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'My Orders',
    tabBarIcon: ({tintColor}) => <TabBarIcon orderIcon css={{width: 18, height: 18}} icon={Images.IconOrder}
                                             tintColor={tintColor}/>,
  })

  render() {
    const {navigate} = this.props.navigation;
    return <MyOrders onViewHomeScreen={() => navigate('Default')}/>
  }
}