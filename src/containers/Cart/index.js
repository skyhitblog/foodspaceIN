import React, {Component} from 'react';
import {View, WebView, Text, TouchableOpacity, Dimensions} from "react-native";
import  ScrollableTabView from 'react-native-scrollable-tab-view';
import styles from "./styles"
import {connect} from 'react-redux';
import {Languages, Images, Config, Constants, Styles} from "@common";
import {Timer, getProductImage, currencyFormatter, warn, BlockTimer, toast} from '@app/Omni';
import Modal from 'react-native-modalbox'
import MyCart from "./MyCart"
import Delivery from "./Delivery"
import Payment from "./Payment"
import FinishOrder from "./FinishOrder"
import PaymentEmpty from "./Empty"
import Buttons from './Buttons';
import {Button, StepIndicator} from "@components";
import base64 from 'base-64';


class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0,
      createdOrder: {},
      userInfo: null,
      order: '',
      isLoading: false,
      orderId: null
    }
  }

  checkUserLogin = () => {
    const {user} = this.props.user;
    if (user === null) {
      this.props.onMustLogin();
      return false;
    }
    return true;
  }


  onNext = () => {
    // check validate before moving next
    let valid = true;
    switch (this.state.currentIndex) {
      case 0:
        valid = this.checkUserLogin();
        break;
    }
    if (valid && typeof this.tabCartView != 'undefined') {
      const nextPage = this.state.currentIndex + 1;
      this.tabCartView.goToPage(nextPage);
    }
  }


  renderCheckOut = () => {
    const params = base64.encode(JSON.stringify(this.state.order));
    const userAgentAndroid = "Mozilla/5.0 (Linux; U; Android 4.1.1; en-gb; Build/KLP) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30";

    const checkOutUrl = `${Config.WooCommerce.url}/${Constants.WordPress.checkout}?order=${params}`;

    warn(checkOutUrl)
    return <Modal ref={ (modal) => this.checkoutModal = modal}
                  backdropPressToClose={false}
                  backButtonClose
                  backdropColor={'#fff'}
                  swipeToClose={false}
                  onClosed={this._onClosedModal}>
      <WebView style={styles.webView}
               source={{uri: checkOutUrl}}
               userAgent={userAgentAndroid}
               onNavigationStateChange={(status) => this._onNavigationStateChange(status)}
               scalesPageToFit={true}/>
      <TouchableOpacity style={styles.iconZoom} onPress={() => this.checkoutModal.close()}>
        <Text style={styles.textClose}>{Languages.close}</Text>
      </TouchableOpacity>
    </Modal>
  }

  _onClosedModal = () => {
    if (this.state.orderId !== null)  {
      this.props.finishOrder();
      this.checkoutModal.close();
    }
    this.setState({isLoading: false})
  }

  _onNavigationStateChange = (status) => {
    const {url} = status;

    if (url.indexOf(Config.WooCommerce.url) == 0 && url.indexOf('order-received') != -1) {
      let params = status.url.split("?");
      if (params.length > 1) {
        params = params[1].split('&');
        params.forEach(val => {
          let now = val.split('=');
          if (now[0] == 'key' && now['1'].indexOf('wc_order') == 0) {
            this.setState({orderId: now['1'].indexOf('wc_order')})
          }
        })
      }
    }
  }

  onShowCheckOut = (order) => {
    this.setState({order})
    this.checkoutModal.open();
  }

  onPrevious = () => {
    if (this.state.currentIndex == 0) {
      this.props.onBack();
      return;
    }
    this.tabCartView.goToPage(this.state.currentIndex - 1);
  }

  updatePageIndex = (page) => {
    this.setState({currentIndex: page.i});
  }

  onChangeTabIndex = (page) => {
    this.tabCartView && this.tabCartView.goToPage(page);
  }

  componentWillMount() {
    this.props.navigation.setParams({title: Languages.ShoppingCart});
  }


  finishOrder = () => {
    const {onFinishOrder} = this.props;
    onFinishOrder();
    BlockTimer.execute(() => {
      this.tabCartView.goToPage(0);
    }, 1500);
  }

  render() {
    const {onViewProduct, navigation, cartItems, onViewHome} = this.props;
    const {currentIndex} = this.state;

    if (currentIndex == 0 && cartItems && cartItems.length == 0) {
      return (<PaymentEmpty onViewHome={onViewHome}/>)
    } else {
      let steps = [
        {label: Languages.MyCart, icon: Images.IconCart},
        {label: Languages.Delivery, icon: Images.IconPin},
        {label: Languages.Payment, icon: Images.IconMoney},
        {label: Languages.Order, icon: Images.IconFlag},
      ]
      return (
        <View style={styles.fill}>
          {this.renderCheckOut()}
          <View style={styles.indicator}>
            <StepIndicator steps={steps}
                           onChangeTab={this.onChangeTabIndex}
                           currentIndex={currentIndex}/>
          </View>
          <View style={styles.content}>
            <ScrollableTabView
              ref={(tabView) => {
                this.tabCartView = tabView;
              }}
              locked
              onChangeTab={this.updatePageIndex}
              style={{backgroundColor: '#fff'}}
              initialPage={0}
              tabBarPosition="overlayTop"
              prerenderingSiblingsNumber={1}
              renderTabBar={() => <View style={{padding: 0, margin: 0}}/>}>

              <MyCart key="cart"
                      onNext={this.onNext}
                      onPrevious={this.onPrevious}
                      navigation={navigation}
                      onViewProduct={onViewProduct}/>

              <Delivery key="delivery"
                        onNext={(formValues) => {
                          this.setState({userInfo: formValues});
                          this.onNext();
                        }}
                        onPrevious={this.onPrevious}/>
              <Payment key="payment"
                       onPrevious={this.onPrevious}
                       onNext={this.onNext}
                       userInfo={this.state.userInfo}
                       isLoading={this.state.isLoading}
                       onShowCheckOut={this.onShowCheckOut}/>

              <FinishOrder key="finishOrder"
                           finishOrder={this.finishOrder}/>
            </ScrollableTabView>

            {currentIndex == 0 && <Buttons onPrevious={this.onPrevious} onNext={this.onNext}/>}
          </View>
        </View>
      );
    }
  }
}

const mapStateToProps = ({carts, user}) => ({
  cartItems: carts.cartItems, user,
});
function mergeProps(stateProps, dispatchProps, ownProps) {
  const {dispatch} = dispatchProps;
  const CartRedux = require('@redux/CartRedux');

  return {
    ...ownProps,
    ...stateProps,
    emptyCart: () => CartRedux.actions.emptyCart(dispatch),
    finishOrder: () => CartRedux.actions.finishOrder(dispatch),
  };
}

export default connect(mapStateToProps, undefined, mergeProps)(Cart);
