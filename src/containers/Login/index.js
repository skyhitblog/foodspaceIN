import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {View, ScrollView, Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Icons, Color, Languages, Styles, Config, Images} from "@common";
import {Icon, toast, log, warn, FacebookAPI} from '@app/Omni';
import {Spinner, Button, ButtonIndex} from '@components';
import styles from './styles'
import WooWorker from '@services/WooWorker';
import WPUserAPI from '@services/WPUserAPI';
import {Constants, WebBrowser} from 'expo';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      logInFB: false,
    };

    this.onLoginPressHandle = this.onLoginPressHandle.bind(this);
    this.onFBLoginPressHandle = this.onFBLoginPressHandle.bind(this);
    this.checkConnection = this.checkConnection.bind(this);
    this.onSignUpHandle = this.onSignUpHandle.bind(this);
    this.stopAndToast = this.stopAndToast.bind(this);

    this.onUsernameEditHandle = username => this.setState({username});
    this.onPasswordEditHandle = password => this.setState({password});

    this.focusPassword = () => this.refs.password && this.refs.password.focus();
  }

  componentDidMount() {
    const {logout, user, isLogout, onViewHomeScreen} = this.props;

    // check case after logout
    if (user && isLogout) {
      logout();
      if (this.state.logInFB) {
        if (FacebookAPI.getAccessToken()) {
          FacebookAPI.logout();
        }
      }
      onViewHomeScreen();
    }
  }

  // handle the logout screen and navigate to cart page if the new user login object exist
  componentWillReceiveProps(nextProps) {
    const {onViewCartScreen, logout, user: oldUser, onViewHomeScreen} = this.props;

    const {user} = nextProps.user;
    const {params} = nextProps.navigation.state;

    // check case after login
    if (user != null && oldUser.user == null) {
      this.setState({isLoading: false});

      if (params.onCart) {
        onViewCartScreen()
      }
      else {
        onViewHomeScreen();
      }
      const uName = user.last_name != null || user.first_name != null ? user.first_name + ' ' + user.last_name : user.name;
      toast(Languages.welcomeBack + ` ${uName}.`);
    }
  }

  async onLoginPressHandle() {
    const {login, netInfo} = this.props;
    if (!netInfo.isConnected) return toast(Languages.noConnection);
    const {username, password, isLoading} = this.state;
    if (isLoading) return;
    this.setState({isLoading: true});

    // login the customer via Wordpress API and get the access token
    const json = await WPUserAPI.login(username.trim(), password);
    if (json === undefined) {
      this.stopAndToast('Can\'t get data from server');
    } else if (json.error) {
      this.stopAndToast(json.error);
    } else {
      let customers = await WooWorker.getCustomerById(json.user.id);
      customers = {...customers, username, password};

      login(customers, json.cookie);
    }
  }

  onFBLoginPressHandle() {
    var self = this;
    const {login, onViewSignUp} = self.props;
    // this.setState({isLoading: true});

    FacebookAPI.login()
      .then(async token => {
        if (token) {
          const json = await WPUserAPI.loginFacebook(token);

          if (json === undefined) {
            this.stopAndToast('Can\'t get data from server');
          } else if (json.error) {
            this.stopAndToast(json.error);
          } else {
            let customers = await WooWorker.getCustomerById(json.wp_user_id);
            customers = {...customers, token, picture: json.user.picture};
            login(customers, json.cookie);
          }
        }
      }).catch(err => {
        warn(err)
      // self.setState({isLoading: true});
    });
  }

  onSignUpHandle() {
    this.props.onViewSignUp();
  }

  checkConnection() {
    const {netInfo} = this.props;
    if (!netInfo.isConnected) toast('No connection');
    return netInfo.isConnected;
  }

  stopAndToast(msg) {
    toast(msg);
    this.setState({isLoading: false});
  }

  render() {
    const {username, password, isLoading} = this.state;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.logoWrap}>
          <Image source={Config.LogoWithText} style={styles.logo} resizeMode={'contain'}/>
        </View>
        <View style={styles.subContain}>
          <View style={styles.loginForm}>
            <View style={styles.inputWrap}>
              <Icon name={Icons.MaterialCommunityIcons.Email} size={Styles.IconSize.TextInput}
                    color={Color.blackTextSecondary}/>
              <TextInput
                {...commonInputProps}
                ref="username"
                placeholder={'Username or email'}
                keyboardType={'email-address'}
                onChangeText={this.onUsernameEditHandle}
                onSubmitEditing={this.focusPassword}
                returnKeyType={'next'}
                value={username}
              />
            </View>
            <View style={styles.inputWrap}>
              <Icon name={Icons.MaterialCommunityIcons.Lock} size={Styles.IconSize.TextInput}
                    color={Color.blackTextSecondary}/>
              <TextInput
                {...commonInputProps}
                ref="password"
                placeholder={'Password'}
                secureTextEntry={true}
                onChangeText={this.onPasswordEditHandle}
                returnKeyType={'go'}
                value={password}
              />
            </View>
            <ButtonIndex text="LOGIN"
                         containerStyle={styles.loginButton}
                         onPress={this.onLoginPressHandle}
            />
          </View>
          <View style={styles.separatorWrap}>
            <View style={styles.separator}/>
            <Text style={styles.separatorText}>Or</Text>
            <View style={styles.separator}/>

          </View>

          <ButtonIndex text="FACEBOOK LOGIN" icon={Icons.MaterialCommunityIcons.Facebook}
                       containerStyle={styles.fbButton}
                       onPress={this.onFBLoginPressHandle}

          />
          <TouchableOpacity
            style={Styles.Common.ColumnCenter}
            onPress={this.onSignUpHandle}>
            <Text style={styles.signUp}>
            Do not have an account? <Text style={styles.highlight}>Sign Up</Text>
                        </Text>
                        <Text> </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        onPress={this._handleOpenWithWebBrowser} style={styles.reset}>
                        <Text>
                          Reset password.
                        </Text>
                        </TouchableOpacity>
                    </View>

                    {isLoading ? <Spinner mode={'overlay'}/> : null}
                  </ScrollView>
    );
  }

  _handleOpenWithWebBrowser = () => {
    WebBrowser.openBrowserAsync('http://foodspace.in/account/lost-password/');
  }

}

const commonInputProps = {
  style: styles.input,
  underlineColorAndroid: 'transparent',
  placeholderTextColor: Color.blackTextSecondary,
};

LoginScreen.propTypes = {
  netInfo: PropTypes.object,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = ({netInfo, user}) => ({netInfo, user});

const mapDispatchToProps = (dispatch) => {
  const {actions} = require('@redux/UserRedux');
  return {
    login: (user, token) => dispatch(actions.login(user, token)),
    logout: () => dispatch(actions.logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
