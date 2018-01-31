import React, {Component} from "react";
import {Search} from "@components";
import {Config, Styles, Constants} from '@common'
import {warn} from "@app/Omni"

export default class SearchScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: "Search",
    header: null,
    tabBarVisible: false,
    tabBarIcon: null,
    tabBarLabel: null,
  })

  render() {
    const {navigate, goBack} = this.props.navigation;

    return <Search onBack={goBack}
                   onViewProductScreen={(product) => navigate('DetailScreen', product)}
                   navigation={this.props.navigation}/>
  }
}