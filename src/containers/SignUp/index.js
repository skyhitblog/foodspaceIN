/**
 * Created on 01/03/2018.
 */
import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, TextInput, Switch, LayoutAnimation} from 'react-native';
import {Styles, Languages, Color} from "@common";
import {toast, error, Validate} from '@app/Omni';
import Button from '@components/Button';
import Spinner from '@components/Spinner';
import WPUserAPI from '@services/WPUserAPI';
import WooWorker from '@services/WooWorker';

class SignUpScreen extends Component {
  constructor(props) {
    super(props);

    let state = {
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      useGeneratePass: false,
      isLoading: false,
    };

    const params = props.params;
    if (params && params.user) {
      state = {...state, ...params.user, useGeneratePass: true};
    }

    this.state = state;

    this.onSignUpHandle = this.onSignUpHandle.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.stopAndToast = this.stopAndToast.bind(this);

    this.onFirstNameEditHandle = firstName => this.setState({firstName});
    this.onLastNameEditHandle = lastName => this.setState({lastName});
    this.onUsernameEditHandle = username => this.setState({username});
    this.onEmailEditHandle = email => this.setState({email});
    this.onPasswordEditHandle = password => this.setState({password});

    this.onPasswordSwitchHandle = () => this.setState({useGeneratePass: !this.state.useGeneratePass});

    this.focusLastName = () => this.refs.lastName && this.refs.lastName.focus();
    this.focusUsername = () => this.refs.username && this.refs.username.focus();
    this.focusEmail = () => this.refs.email && this.refs.email.focus();
    this.focusPassword = () => !this.state.useGeneratePass && this.refs.password && this.refs.password.focus();
  }

  shouldComponentUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    return true;
  }

  render() {
    const {username, email, password, firstName, lastName, useGeneratePass, isLoading} = this.state;
    const params = this.props.params;
    return (
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.label}>Profile Details</Text>
          <TextInput
            {...commonInputProps}
            ref="firstName"
            placeholder={'First name'}
            onChangeText={this.onFirstNameEditHandle}
            onSubmitEditing={this.focusLastName}
            autoCapitalize={'words'}
            returnKeyType={'next'}
            value={firstName}
          />
          <TextInput
            {...commonInputProps}
            ref="lastName"
            placeholder={'Last name'}
            onChangeText={this.onLastNameEditHandle}
            onSubmitEditing={this.focusUsername}
            autoCapitalize={'words'}
            returnKeyType={'next'}
            value={lastName}
          />

          <Text style={styles.label}>Account Details</Text>
          <TextInput
            {...commonInputProps}
            ref="username"
            placeholder={'Username'}
            onChangeText={this.onUsernameEditHandle}
            onSubmitEditing={this.focusEmail}
            autoCapitalize={'none'}
            returnKeyType={'next'}
            value={username}
          />
          <TextInput
            {...commonInputProps}
            ref="email"
            placeholder={'Email'}
            onChangeText={this.onEmailEditHandle}
            onSubmitEditing={this.focusPassword}
            keyboardType={'email-address'}
            returnKeyType={useGeneratePass ? 'done' : 'next'}
            value={email}
          />
          {params && params.user ? <View style={styles.switchWrap}>
            <Switch
              value={useGeneratePass}
              onValueChange={this.onPasswordSwitchHandle}
              thumbTintColor={Color.accent}
              onTintColor={Color.accentLight}
            />
            <Text
              style={[styles.text, {color: useGeneratePass ? Color.accent : Color.blackTextSecondary}]}>
              {'Use generate password'}
            </Text>
          </View> : null}
          {useGeneratePass
            ? <View/>
            : <TextInput
              {...commonInputProps}
              ref="password"
              placeholder={'Password'}
              onChangeText={this.onPasswordEditHandle}
              secureTextEntry={true}
              returnKeyType={'done'}
              value={password}
            />
          }
        </View>
        <Button
          containerStyle={styles.signUpButton}
          text='Sign Up'
          onPress={this.onSignUpHandle}
        />
        {isLoading ? <Spinner mode={'overlay'}/> : null}
      </ScrollView>
    );
  }

  async onSignUpHandle() {
    const {login, netInfo} = this.props;
    if (!netInfo.isConnected) return toast(Languages.noConnection);

    const {username, email, firstName, lastName, password, useGeneratePass, isLoading} = this.state;
    if (isLoading) return;
    this.setState({isLoading: true});

    const _error = this.validateForm();
    if (_error) return this.stopAndToast(_error);

    const user = {username, email, firstName, lastName, password: useGeneratePass ? undefined : password};
    const json = await WPUserAPI.register(user);
    if (json === undefined) {
      return this.stopAndToast('Server don\'t response correctly');
    } else if (json.error) {
      return this.stopAndToast(json.error);
    } else {
      const customer = await WooWorker.getCustomerById(json.user_id);
      if (customer) {
        this.setState({isLoading: false});
        login(customer, json.cookie);
      } else {
        toast('Can\'t register user, please try again.');
      }
    }
  }

  validateForm() {
    const {username, email, password, firstName, lastName, useGeneratePass} = this.state;
    if (Validate.isEmpty(username, email, firstName, lastName, useGeneratePass ? '1' : password)) { //check empty
      return 'Please complete the form';
    } else if (!Validate.isEmail(email)) {
      return 'Email is not correct';
    }
    return undefined;
  }

  stopAndToast(msg) {
    toast(msg);
    error(msg);
    this.setState({isLoading: false});
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: Styles.width * 0.1,
    backgroundColor: Color.background,
  },

  label: {
    fontWeight: 'bold',
    fontSize: Styles.FontSize.medium,
    color: Color.blackTextPrimary,
    marginTop: 20,
  },

  input: {
    borderBottomWidth: 1, borderColor: Color.blackTextDisable,
    height: 40,
    marginTop: 10,
    padding: 0, margin: 0,
    // flex: 1,
  },
  signUpButton: {
    marginTop: 20,
    backgroundColor: Color.primary,
    borderRadius: 5,
    elevation: 1,
  },
  switchWrap: {
    ...Styles.Common.RowCenterLeft,
    marginTop: 10,
  },
  text: {
    marginLeft: 10,
    color: Color.blackTextSecondary,
  }
});

const commonInputProps = {
  style: styles.input,
  underlineColorAndroid: 'transparent',
  placeholderTextColor: Color.blackTextSecondary,
};


import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    netInfo: state.netInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  const {actions} = require('@redux/UserRedux');
  return {
    login: (user, token) => dispatch(actions.login(user, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);