import React, {Component} from "react";
import {Logo, Menu, HeaderHomeRight} from './IconNav'

import {Color, Constants, Images, Config, Styles} from '@common'
import {TabBarIcon} from '@components'
import {Home} from "@containers";
import {warn} from "@app/Omni"

export default class HomeScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: Logo(),
    headerLeft: Menu(),
    headerRight: HeaderHomeRight(navigation),
    tabBarIcon: ({tintColor}) => <TabBarIcon icon={Images.IconHome} tintColor={tintColor}/>,

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.toolbar,
    headerTitleStyle: Styles.Common.headerStyle,
  })

  render() {
    const {navigate} = this.props.navigation;

    return <Home
      onShowAll={(config, index) => navigate('ListAllScreen', {config, index})}
      onViewProductScreen={(item) => {
        this.props.navigation.tabBarVisible = false
        navigate('DetailScreen', item)
      }
      }/>
  }
}