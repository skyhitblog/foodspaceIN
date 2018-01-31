import React, {Component} from "react";
import {Logo, Back, EmptyView, CartWishListIcons} from './IconNav'

import {Color, Config, Constants, Images, Styles} from '@common'
import {TabBarIcon} from '@components'
import {Category} from "@containers";

export default class CategoryScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: Logo(),
    headerLeft: Back(navigation),
    headerRight: EmptyView(), // CartWishListIcons(navigation),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.toolbar,
    headerTitleStyle: Styles.Common.headerStyle,
  })

  render() {
    const {navigate, state} = this.props.navigation;
    return <Category mainCategory={state.params.mainCategory}
                     onViewProductScreen={(item) => {
                       navigate('DetailScreen', item)
                     } }/>
  }
}