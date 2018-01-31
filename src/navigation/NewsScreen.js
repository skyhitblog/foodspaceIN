import React, {Component} from "react";
import { Menu,Logo, EmptyView} from './IconNav'

import {Color, Images, Styles} from '@common'
import {TabBarIcon} from '@components'
import {News} from "@containers";

export default class NewsScreen extends Component {
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
    return <News onViewNewsScreen={(post) => navigate('NewsDetailScreen', post) }/>
  }
}