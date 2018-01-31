import React, {Component} from "react";
import {Logo, Menu, EmptyView} from './IconNav'

import {Color, Config, Constants, Images, Styles} from '@common'
import {TabBarIcon} from '@components'
import {Categories} from "@containers";

export default class CategoriesScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: Logo(),
    headerLeft: Menu(),
    headerRight: EmptyView(),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.toolbar,
    headerTitleStyle: Styles.Common.headerStyle,
  })

  render() {
    const {navigate} = this.props.navigation;
    return <Categories onViewProductScreen={(item) => navigate('DetailScreen', item)}
                       onViewCategory={(item) => {
                         navigate('CategoryScreen', item)
                       }}/>
  }
}