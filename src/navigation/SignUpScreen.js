import React, {Component} from "react";
import {SignUp} from "@containers";

export default class SignUpScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Sign Up'
  })

  render() {
    const {state} = this.props.navigation;
    return <SignUp params={state.params}/>
  }
}