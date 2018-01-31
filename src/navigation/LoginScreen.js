import React, {Component} from "react";
import {Menu, Back, EmptyView} from './IconNav'
import {TabBarIcon} from '@components'
import {Login} from "@containers";
import {warn} from "@app/Omni"


export default class LoginScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Login',
    headerLeft:  typeof navigation.state.params != 'undefined' && typeof navigation.state.params.onCart != 'undefined' ? Back(navigation) : Menu(),
    headerRight: EmptyView(),
  })

  render() {
    const {navigate, state, goBack} = this.props.navigation;
    const isLogout = state.params.isLogout;

    return <Login navigation={this.props.navigation}
                  onBack={goBack}
                  isLogout={isLogout}
                  onViewSignUp={(user) => navigate('SignUpScreen', user) }
                  onViewCartScreen={() => navigate('CartScreen')}
                  onViewHomeScreen={() => navigate('Default')}/>
  }
}