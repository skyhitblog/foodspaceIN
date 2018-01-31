'use strict'

import React, {Component} from 'react'
import {ListView, Animated, Platform, RefreshControl, FlatList, Text, View} from 'react-native'
import {connect} from 'react-redux'
import Accordion from 'react-native-collapsible/Accordion'
import {LogoSpinner, FlatButton, ProductItem, AnimatedHeader, ToolbarIcon} from '@components'
import {Constants, Languages, Color} from '@common';
import {error, warn} from "@app/Omni";
import styles from "./styles";
import OrderEmpty from './Empty';

const cardMargin = Constants.Dimension.ScreenWidth(0.05)
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class MyOrders extends Component {
  state = {scrollY: new Animated.Value(0)};

  componentDidMount() {
    this.fetchProductsData();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.carts.cartItems != nextProps.carts.cartItems) {
      this.fetchProductsData();
    }
  }

  fetchProductsData = () => {
    const {user} = this.props.user;
    if (typeof user === 'undefined' || user === null) return;

    this.props.fetchMyOrder(user);
  }

  renderRow = ({item, index}) => {
    const order = item;

    let dataSource = new ListView.DataSource({rowHasChanged: () => true})
    let getDataSource = (products) => dataSource.cloneWithRows(products);

    if (typeof order.line_items == 'undefined') {
      return this.renderError(Languages.NoOrder)
    }

    let dataSource2 = getDataSource(order.line_items);

    let renderAttribute = (label, context, _style) => {
      return (
        <View style={styles.row}>
          <Text style={styles.rowLabel}>{label}</Text>
          <Text style={[styles.rowLabel, _style]}>{context}</Text>
        </View>)
    }

    let dateFormat = (date) => {
      const year = date.substr(0, 4)
      const month = date.substr(5, 2)
      const day = date.substr(8, 2)
      return day + '/' + month + '/' + year
    }

    return (
      <View style={{margin: cardMargin, marginBottom: 0}}>
        <View style={styles.labelView}>
          <Text style={styles.label}>#{order.number}</Text>
        </View>
        <View style={{padding: 5, backgroundColor: "#FFF"}}>
          {renderAttribute(Languages.OrderDate, dateFormat(order.date_created))}
          {renderAttribute(Languages.OrderStatus, order.status.toUpperCase())}
          {renderAttribute(Languages.OrderPayment, order.payment_method_title)}
          {renderAttribute(Languages.OrderTotal, order.total + ' ' + order.currency, {
            fontWeight: 'bold',
            fontSize: 16,
            fontFamily: Constants.fontHeader,
            color: Color.ProductPrice
          })}

          <Accordion
            underlayColor="transparent"
            sections={[{}]}
            renderHeader={() => {
              return (
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <Text style={styles.orderDetailLabel}>
                    {Languages.OrderDetails}
                  </Text>
                </View>
              )
            }}
            renderContent={() => {
              return (
                <ListView
                  contentContainerStyle={{backgroundColor: "#FFF"} }
                  dataSource={dataSource2}
                  enableEmptySections
                  renderRow={(product) => <View
                    style={{flexDirection: 'row', justifyContent: 'space-between'}}>

                    <Text style={{margin: 4, width: Constants.Dimension.ScreenWidth(0.6)}}
                          numberOfLines={2}
                          ellipsizeMode="tail">{product.name}</Text>

                    <Text style={{margin: 4, alignSelf: 'center'}}>
                      {'x' + product.quantity}
                    </Text>

                    <Text style={{margin: 4, alignSelf: 'center'}}>{product.total}</Text>
                  </View>}>
                </ListView>
              )
            }}
          />
        </View>
      </View>
    )
  }

  renderError(error) {
    return <OrderEmpty text={error}
                       onReload={this.fetchProductsData}
                       onViewHome={this.props.onViewHomeScreen}/>
  }

  shouldComponentUpdate(nextProps) {
    return typeof nextProps.carts.myOrders != 'undefined' && nextProps.carts.myOrders.length != this.props.carts.myOrders.length;
  }

  render() {
    const data = this.props.carts.myOrders;

    if (typeof data == 'undefined' || data.length == 0) {
      return <OrderEmpty text={Languages.NoOrder}
                         onReload={this.fetchProductsData}
                         onViewHome={this.props.onViewHomeScreen}/>
    }

    return (
      <View style={styles.listView}>
        <AnimatedHeader scrollY={this.state.scrollY} label={Languages.MyOrder}/>
        <AnimatedFlatList
          data={data}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
            {useNativeDriver: Platform.OS == 'android' ? false : true},
          )}
          scrollEventThrottle={1}

          keyExtractor={(item, index) => item.id}
          contentContainerStyle={styles.flatlist}
          renderItem={this.renderRow}
          refreshControl={ <RefreshControl
            refreshing={this.props.carts.isFetching}
            onRefresh={this.fetchProductsData }/>}
        />
      </View>
    )
  }
}
const mapStateToProps = ({user, carts}) => ({user, carts});
function mergeProps(stateProps, dispatchProps, ownProps) {
  const {dispatch} = dispatchProps;
  const {actions} = require('@redux/CartRedux');
  return {
    ...ownProps,
    ...stateProps,
    fetchMyOrder: (user) => {
      actions.fetchMyOrder(dispatch, user)
    },
  };
}
export default connect(mapStateToProps, null, mergeProps)(MyOrders)
