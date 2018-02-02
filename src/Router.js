import React from 'react';
import {View, StatusBar, AsyncStorage} from 'react-native';
import {toast, closeDrawer} from './Omni';
import {Color, Config, Constants, Device, Styles,} from "@common";
import {Drawer, MyToast, MyNetInfo} from "@containers";
import Navigation from "@navigation"

import {applyMiddleware, compose, createStore} from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import {Provider, connect} from 'react-redux';
import thunk from 'redux-thunk';
import Reactotron from 'reactotron-react-native'
import './ReactotronConfig'
const middleware = [thunk];
import reducers from '@redux'

import MenuSide from "@components/LeftMenu/MenuScale";
// import MenuSide from "@components/LeftMenu/MenuOverlay";
// import MenuSide from "@components/LeftMenu/MenuSmall";
// import MenuSide from "@components/LeftMenu/MenuWide";


// const store = createStore(reducers, {}, applyMiddleware(...middleware));

let store = null;
if (__DEV__) {
  store = Reactotron.createStore(reducers, compose(applyMiddleware(...middleware), autoRehydrate()));
}
else {
  store = compose(applyMiddleware(...middleware), autoRehydrate())(createStore)(reducers);
}
persistStore(store, {
  storage: AsyncStorage,
  blacklist: [
    // 'categories', //home screen categories
    'netInfo',
    'toast',
    'nav',
    'layouts',
    'payment'
    // 'layouts'
    // 'user'//TODO: remove this after complete user login
  ]
});

export default class Router extends React.Component {
  goToScreen = (routeName, params, isReset: boolean = false) => {
    const {navigator} = this.refs;
    if (!navigator) {
      return toast('Cannot navigate');
    }
    navigator.dispatch({type: 'Navigation/NAVIGATE', routeName, params});
    closeDrawer();
  }


  render() {
    return <Provider store={store}>
      <MenuSide goToScreen={this.goToScreen}
                routes={<View style={Styles.app} >
                  <StatusBar hidden={!Config.showStatusBar}/>
                  <Navigation ref={'navigator'}/>
                  <MyToast />
                  <MyNetInfo />
                </View>}/>
    </Provider>
  }
}
