import React, {Component} from "react";
import {Menu, EmptyView} from './IconNav'

import {Images, Config, Constants, Color, Styles, Languages} from '@common'
import {TabBarIcon} from '@components'
import {WishList} from "@containers";


export default class WishListScreen extends Component {
  static navigationOptions = ({navigation}) => ({
      title: Languages.WishList,
      header: null,
      tabBarIcon: ({tintColor}) => <TabBarIcon wishlistIcon navigation={navigation}
                                               css={{width: 18, height: 18}}
                                               icon={Images.IconHeart} tintColor={tintColor}/>,
  })

  render() {
    const {navigate} = this.props.navigation;
    const rootNavigation = this.props.screenProps.rootNavigation;

    return <WishList
      onViewProduct={(product) => navigate('Detail', product) }
      onViewHome={() => rootNavigation.navigate('Default') }/>
  }
}