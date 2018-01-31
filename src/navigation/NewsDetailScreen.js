import React, {Component} from "react";
import {Platform, View} from "react-native";
import {Logo, Back} from './IconNav'

import {Color, Images, Styles} from '@common'
import {TabBarIcon} from '@components'
import {PostDetail} from "@containers";

export default class NewsDetailScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: Logo(),
    tabBarVisible: false,
    headerLeft: Back(navigation),
    headerStyle: Styles.Common.toolbar
  })

  render() {
    const {state} = this.props.navigation;
    return <View style={{flex: 1}}>
      {typeof state.params != 'undefined' && <PostDetail post={state.params.post}/>}
    </View>
  }
}