import React, {Component} from 'react';
import {StyleSheet, Animated, ScrollView, Text, View, ListView, TouchableOpacity} from "react-native";
import {connect} from 'react-redux';
import {Timer, getProductImage, currencyFormatter, toast, Images} from '@app/Omni';
import styles from "./styles"
import WishListEmpty from "./Empty"
import {Button, ProductItem, AnimatedHeader} from "@components"
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Constants, Languages, Styles} from "@common"

class WishList extends Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.wishListItems),
      scrollY: new Animated.Value(0)
    };
  }

  render() {
    var {wishListItems, onViewProduct} = this.props;
    const titleTransformY = this.state.scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [0, -43],
      extrapolate: 'clamp',
    });

    if (wishListItems.length == 0) {
      return (<WishListEmpty onViewHome={this.props.onViewHome}/>)
    } else {
      return (
        <View style={styles.container}>
          <AnimatedHeader
            scrollY={this.state.scrollY}
            label={Languages.WishList}/>

          <Animated.Text
            style={[styles.value, {transform: [{translateY: titleTransformY}]},]}>
            {wishListItems.length} {wishListItems.length > 1 ? Languages.Items : Languages.Item}
          </Animated.Text>


          <ScrollView
            style={styles.scrollView}
            scrollEventThrottle={1}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
            )}>
            <View style={styles.list}>
              {
                wishListItems && wishListItems.map((item, index) => (
                  <SwipeRow
                    key={'wishlist' + index}
                    disableRightSwipe={true}
                    leftOpenValue={75}
                    rightOpenValue={-75}>
                    {this.renderHiddenRow(item, index)}
                    <ProductItem key={index}
                                 product={item.product}
                                 onPress={() => onViewProduct({product: item.product})}
                                 variation={item.product.variation}/>
                  </SwipeRow>
                ))
              }
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <Button text={Languages.CleanAll} style={[styles.button, {backgroundColor: "#ff1744"}]}
                    textStyle={styles.buttonText} onPress={this.cleanAll.bind(this)}/>
            <Button text={Languages.MoveAllToCart} style={styles.button} textStyle={styles.buttonText}
                    onPress={this.moveAllToCart.bind(this)}/>
          </View>
        </View>
      )
    }
  }

  renderHiddenRow(rowData, index) {
    return (
      <TouchableOpacity style={styles.hiddenRow} onPress={() => {
        this.props.removeWishListItem(rowData.product, rowData.variation)
      }}>
        <View style={{marginRight: 23}}><FontAwesome name="trash" size={30} color="white"/></View>
      </TouchableOpacity>
    )
  }

  componentDidMount() {
    // console.log("wishListItems WishList Screen: ",this.props.wishListItems);
  }

  onNext() {
    this.setState({currentIndex: this.state.currentIndex + 1})
  }

  moveAllToCart() {
    if (this.props.wishListItems.length === 0) alert(Languages.EmptyAddToCart)
    else {
      this.props.wishListItems.forEach(item => {
        var inCartTotal = this.props.cartItems.reduce((accumulator, currentValue) => {
          if (currentValue.product.id == item.product.id) {
            return accumulator + currentValue.quantity
          } else {
            return 0
          }
        }, 0)

        if (inCartTotal < Constants.LimitAddToCart)
          this.props.addCartItem(item.product, item.variation)
        else
          alert(Languages.ProductLimitWaring)
      })
    }
  }

  cleanAll() {
    var self = this
    this.props.wishListItems.forEach(function callback(currentValue, index, array) {
      self.props.removeWishListItem(currentValue.product, currentValue.variation)
    })
  }
}

const mapStateToProps = (state) => {
  return {
    wishListItems: state.wishList.wishListItems,
    cartItems: state.carts.cartItems,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const {dispatch} = dispatchProps;
  const CartRedux = require('./../../redux/CartRedux');
  const WishListRedux = require('./../../redux/WishListRedux')
  return {
    ...ownProps,
    ...stateProps,
    addCartItem: (product, variation) => {
      CartRedux.actions.addCartItem(dispatch, product, variation)
    },
    removeWishListItem: (product, variation) => {
      WishListRedux.actions.removeWishListItem(dispatch, product, variation)
    },
  };
}

export default connect(mapStateToProps, undefined, mergeProps)(WishList);
