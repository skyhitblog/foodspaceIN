import React, {Component} from "react";
import {WebView} from 'react-native'
import {Menu} from './IconNav'
import {View} from 'react-native'
import {Languages} from '@common'
import {CustomPage} from "@containers";

export default class CustomPageScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title ? navigation.state.params.title : Languages.AppName,
    headerLeft: Menu(),
  })

  render() {
    const {state} = this.props.navigation;
    if (typeof state.params == 'undefined') {
      return <View />
    }

    if (typeof state.params.url != 'undefined') {
      return <WebView source={{url: state.params.url}}/>
    }
    return <CustomPage id={state.params.id}/>
  }
}