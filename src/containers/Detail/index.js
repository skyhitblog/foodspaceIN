import React, {Component} from 'react';
import {Text, TouchableOpacity, ScrollView, View, Dimensions, Animated, Image, Share} from 'react-native';
import styles from "./ProductDetail_Style"
import {connect} from 'react-redux';

import {Timer, getProductImage, currencyFormatter, warn, toast} from '@app/Omni';
const PRODUCT_IMAGE_HEIGHT = 300
const NAVI_HEIGHT = 64
import {Button, WebView, ProductSize as ProductAttribute, ProductColor, ProductRelated, Rating} from "@components"
import Swiper from 'react-native-swiper';
import AttributesView from "./AttributesView"
import ReviewTab from "./ReviewTab.js"
import {Styles, Languages, Color, Attributes, Constants} from '@common'
import Modal from "react-native-modalbox";
import {find} from "lodash";
import * as Animatable from 'react-native-animatable';
import {filter} from "lodash"

class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollY: new Animated.Value(0),
      tabIndex: 0,
      selectedAttribute: [],
      selectedColor: 0,
      selectVariation: null,
    }

    this.props.getProductVariations(props.product);

    this.productInfoHeight = PRODUCT_IMAGE_HEIGHT
    this.inCartTotal = 0
    this.isInWishList = false
  }


  getProductAttribute = (product) => {
    this.productAttributes = product.attributes
    const defaultAttribute = product.default_attributes;

    if (typeof this.productAttributes !== "undefined") {
      this.productAttributes.map((attribute) => {
        const selectedAttribute = defaultAttribute.find((item) => item.name === attribute.name);
        attribute.selectedOption = typeof selectedAttribute != 'undefined' ? selectedAttribute.option.toLowerCase() : '';
      })
    }
  }

  closePhoto = () => this.refs.modalPhoto.close();

  openPhoto = () => {
    this.refs.modalPhoto.open();
  }

  handleClickTab(tabIndex) {
    this.setState({tabIndex})
    Timer.setTimeout(() => this.state.scrollY.setValue(0), 50);
  }

  getColor = (value) => {
    const color = value.toLowerCase();
    if (typeof Color.attributes[color] != 'undefined') {
      return Color.attributes[color];
    }
    return '#333';
  }

  share() {
    Share.share({
      message: this.props.product.description.replace(/(<([^>]+)>)/ig, ""),
      url: this.props.product.permalink,
      title: this.props.product.name
    })
  }

  addToCart(go = false) {
    if (this.inCartTotal < Constants.LimitAddToCart) {
      this.props.addCartItem(this.props.product, this.state.selectVariation)
    } else {
      alert(Languages.ProductLimitWaring)
    }

    if (go) this.props.onViewCart()
  }

  addToWishList(isAddWishList) {
    if (isAddWishList) {
      this.props.removeWishListItem(this.props.product)
    } else
      this.props.addWishListItem(this.props.product)
  }

  componentWillReceiveProps(nextProps) {
    this.getCartTotal(nextProps, true)
    this.getWishList(nextProps, true)

    // this important to update the variations from the product as the Life cycle is not run again !!!

    if (this.props.product.id != nextProps.product.id) {
      this.props.getProductVariations(nextProps.product);
      this.getProductAttribute(nextProps.product)
      this.forceUpdate();
    }

    if (this.props.productVariations !== nextProps.productVariations) {
      this.updateSelectedVariant(nextProps.productVariations);
    }
  }

  componentDidMount() {
    this.getCartTotal(this.props)
    this.getWishList(this.props)

    this.getProductAttribute(this.props.product)
  }

  getCartTotal(props, check = false) {
    const {cartItems} = props;

    if (cartItems != null) {
      if (check == true && props.cartItems == this.props.cartItems) {
        return
      }

      this.inCartTotal = cartItems.reduce((accumulator, currentValue) => {
        if (currentValue.product.id == this.props.product.id) {
          return accumulator + currentValue.quantity
        } else {
          return 0
        }
      }, 0)

      let sum = cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0)
      var params = this.props.navigation.state.params
      params["cartTotal"] = sum
      this.props.navigation.setParams(params);
    }
  }

  getWishList(props, check = false) {
    const {product, navigation, wishListItems} = props;

    if (props.hasOwnProperty("wishListItems")) {
      if (check == true && props.wishListItems == this.props.wishListItems) {
        return
      }
      this.isInWishList = find(props.wishListItems, (item) => item.product.id == product.id) != 'undefined'

      let sum = wishListItems.length
      let params = navigation.state.params
      params["wistListTotal"] = sum
      this.props.navigation.setParams(params);
    }
  }

  onSelectAttribute = (attributeName, option) => {
    let selectedAttribute = this.productAttributes.find((item) => item.name === attributeName)
    selectedAttribute.selectedOption = option.toLowerCase();

    this.updateSelectedVariant(this.props.productVariations);
  }

  updateSelectedVariant = (productVariations) => {
    const selectedAttribute = filter(this.productAttributes, (item) => typeof item.selectedOption != 'undefined')

    productVariations && productVariations.map(variant => {
      let matchCount = 0;
      selectedAttribute.map((selectAttribute) => {
        const isMatch = find(variant.attributes, (item) => item.name === selectAttribute.name && item.option.toLowerCase() === selectAttribute.selectedOption.toLowerCase());
        if (isMatch !== undefined) {
          matchCount += 1;
        }
      })
      if (matchCount === selectedAttribute.length) {
        this.setState({selectVariation: variant})
      }
    })
    this.forceUpdate();
  }

  render() {
    const {selectVariation} = this.state;
    const {wishListItems, onViewProductScreen, product, cartItems} = this.props;

    const isAddToCart = cartItems && cartItems.filter(item => item.product.id === product.id).length > 0 ? true : false;
    const isAddWishList = wishListItems.filter(item => item.product.id === product.id).length > 0 ? true : false;
    const imageScale = this.state.scrollY.interpolate({
      inputRange: [-300, 0, NAVI_HEIGHT, this.productInfoHeight / 2],
      outputRange: [2, 1, 1, 0.7],
      extrapolate: 'clamp',
    });
    const productPrice = currencyFormatter(selectVariation ? selectVariation.price : product.price);
    const productRegularPrice = currencyFormatter(selectVariation ? selectVariation.regular_price : product.regular_price);
    const isOnSale = selectVariation ? selectVariation.on_sale : product.on_sale;

    warn(product.description)

    const renderTabView = () => <View style={styles.tabView}>
      <View style={[styles.tabButton, Constants.RTL && {flexDirection: 'row-reverse'}]}>
        <View style={styles.tabItem}>
          <Button type="tab"
                  textStyle={styles.textTab}
                  text={Languages.AdditionalInformation}
                  onPress={() => this.handleClickTab(0)}
                  selected={this.state.tabIndex == 0}/>
        </View>
        <View style={styles.tabItem}>
          <Button type="tab"
                  textStyle={styles.textTab}
                  text={Languages.ProductFeatures}
                  onPress={() => this.handleClickTab(1)}
                  selected={this.state.tabIndex == 1}/>
        </View>
        <View style={styles.tabItem}>
          <Button type="tab"
                  textStyle={styles.textTab}
                  text={Languages.ProductReviews}
                  onPress={() => this.handleClickTab(2)}
                  selected={this.state.tabIndex == 2}/>
        </View>
      </View>
      {this.state.tabIndex === 0 &&
      <View style={styles.description}>
        <WebView html={'<p>' + product.description + '</p>' }/>
      </View>}
      {this.state.tabIndex === 1 && <AttributesView attributes={product.attributes}/>}
      {this.state.tabIndex === 2 && <ReviewTab product={product}/>}
    </View>

    const renderButtons = () => <View style={[styles.bottomView, Constants.RTL && {flexDirection: 'row-reverse'}]}>
      <View style={styles.buttonContainer}>
        <Button type="image" source={require("@images/icons/icon-share.png")} imageStyle={styles.imageButton}
                buttonStyle={styles.buttonStyle} onPress={this.share.bind(this)}/>
        <Button type="image" isAddWishList={isAddWishList} source={require("@images/icons/icon-love.png")}
                imageStyle={styles.imageButton}
                buttonStyle={styles.buttonStyle}
                onPress={this.addToWishList.bind(this, isAddWishList)}/>
        <Button type="image" isAddToCart={isAddToCart} source={require("@images/icons/icon-cart.png")}
                imageStyle={styles.imageButton}
                disabled={!product.in_stock ? true : false }
                buttonStyle={styles.buttonStyle}
                onPress={() => product.in_stock && this.addToCart(true) }/>
      </View>

      <Button text={product.in_stock ? Languages.BUYNOW : Languages.OutOfStock}
              style={[styles.btnBuy, !product.in_stock && styles.outOfStock]}
              textStyle={styles.btnBuyText}
              disabled={!product.in_stock ? true : false }
              onPress={() => {
                product.in_stock && this.addToCart(true)
              }}>
      </Button>
    </View>

    const renderImages = () => <ScrollView
      style={{height: PRODUCT_IMAGE_HEIGHT, width: Constants.Window.width}}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      horizontal={true}>
      {product.images.map((image, index) =>
        <TouchableOpacity activeOpacity={0.9}
                          key={index}
                          onPress={this.openPhoto.bind(this)}>
          <Animated.Image
            source={{uri: getProductImage(image.src, Styles.width)}}
            style={[styles.imageProduct, {transform: [{scale: imageScale}]}]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </ScrollView>

    const renderRating = () => {
      return <View style={styles.price_wrapper}>
        <Rating
          rating={Number(product.average_rating)}
          size={19}/>
        <Text
          style={[styles.textRating, {color: Color.blackTextDisable}]}>
          {'(' + product.rating_count + ')'}
        </Text>
      </View>
    }

    const renderTitle = () => <View style={{justifyContent: "center", marginTop: 6, marginBottom: 8}}>
      <Text style={styles.productName}>{product.name}</Text>
      <View style={{flexDirection: "row", justifyContent: "center", marginTop: 2, marginBottom: 4}}>
        <Animatable.Text animation="fadeInDown" style={styles.productPrice}>{productPrice}</Animatable.Text>
        {isOnSale &&
        <Animatable.Text animation="fadeInDown" style={styles.sale_price}>{productRegularPrice}</Animatable.Text>}
      </View>
    </View>

    const renderAttributes = () => <View>
      {typeof this.productAttributes !== "undefined" && this.productAttributes.map((attribute, attrIndex) => (
        <View key={"attr" + attrIndex}
              style={[styles.productSizeContainer, Constants.RTL && {flexDirection: 'row-reverse'}]}>
          {attribute.name !== Constants.productAttributeColor && attribute.options.map((option, index) =>
            <ProductAttribute key={index}
                              text={option}
                              style={styles.productSize}
                              onPress={() => this.onSelectAttribute(attribute.name, option)}
                              selected={attribute.selectedOption.toLowerCase() === option.toLowerCase()}/>
          )}
        </View>))}
    </View>

    const renderProductColor = () => {
      if (typeof this.productAttributes == 'undefined') {
        return
      }

      const productColor = this.productAttributes.find((item) => item.name === Constants.productAttributeColor)
      if (productColor) {
        const translateY = this.state.scrollY.interpolate({
          inputRange: [0, PRODUCT_IMAGE_HEIGHT / 2, PRODUCT_IMAGE_HEIGHT],
          outputRange: [0, -PRODUCT_IMAGE_HEIGHT / 3, -PRODUCT_IMAGE_HEIGHT],
          extrapolate: 'clamp',
        })
        return (
          <Animated.View style={[styles.productColorContainer, {transform: [{translateY: translateY}]}]}>
            {productColor.options.map((option, index) =>
              <ProductColor key={index}
                            color={this.getColor(option)}
                            onPress={() => this.onSelectAttribute(Constants.productAttributeColor, option)}
                            selected={productColor.selectedOption.toLowerCase() === option.toLowerCase()}/>
            )}
          </Animated.View>
        )
      }
    }

    const renderProductRelated = () => <ProductRelated onViewProductScreen={onViewProductScreen}
                                                       tags={product.related_ids}/>

    return (
      <View style={styles.container}>
        <Animated.ScrollView
          style={styles.listContainer}
          scrollEventThrottle={1}
          onScroll={(event) => {
            this.state.scrollY.setValue(event.nativeEvent.contentOffset.y);
          }}>
          <View style={[styles.productInfo]}
                onLayout={(event) => this.productInfoHeight = event.nativeEvent.layout.height}>
            {renderImages()}
            {renderAttributes()}
            {renderTitle()}
            {renderRating()}
          </View>
          {renderTabView()}
        </Animated.ScrollView>
        {renderProductColor()}
        {renderButtons()}

        <Modal ref="modalPhoto"
               swipeToClose={false}
               animationDuration={200}
               style={styles.modalBoxWrap}>

          <Swiper height={Constants.Window.height - 40}
                  activeDotStyle={styles.dotActive}
                  removeClippedSubviews={false}
                  dotStyle={styles.dot}
                  paginationStyle={{zIndex: 9999, bottom: -15}}>
            {product.images.map((image, index) =>
              <Image
                key={index}
                source={{uri: getProductImage(image.src, Styles.width)}}
                style={styles.imageProductFull}
              />
            )}
          </Swiper>

          <TouchableOpacity style={styles.iconZoom} onPress={this.closePhoto.bind(this)}>
            <Text style={styles.textClose}>{Languages.close}</Text>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.carts.cartItems,
    wishListItems: state.wishList.wishListItems,
    productVariations: state.products.productVariations,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const {dispatch} = dispatchProps;
  const CartRedux = require('@redux/CartRedux');
  const WishListRedux = require('@redux/WishListRedux');
  const ProductRedux = require('@redux/ProductRedux');
  return {
    ...ownProps,
    ...stateProps,
    addCartItem: (product, variation) => {
      CartRedux.actions.addCartItem(dispatch, product, variation)
    },
    addWishListItem: (product) => {
      WishListRedux.actions.addWishListItem(dispatch, product)
    },
    removeWishListItem: (product) => {
      WishListRedux.actions.removeWishListItem(dispatch, product)
    },
    getProductVariations: (product) => {
      ProductRedux.actions.getProductVariations(dispatch, product)
    },
  };
}

export default connect(mapStateToProps, undefined, mergeProps)(Detail);
