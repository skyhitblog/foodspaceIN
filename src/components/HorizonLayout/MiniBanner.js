'use strict';
import React, {Component} from "react";
import {TouchableOpacity, View, Text, Image} from "react-native";
import css from "./style";
import {Constants, Icons, Images, Styles, Languages, Tools} from "@common";
import {CommentIcons, WishListIcon} from "@components";
import {getProductImage, currencyFormatter} from '@app/Omni'

import {LinearGradient} from 'expo';


export default class miniBanner extends Component {
  render() {
    const {viewPost, title, product} = this.props;
    const image = typeof product.images[0] != 'undefined' ? {uri: getProductImage(product.images[0].src, Styles.width)} : Images.PlaceHolder

    let productPrice = currencyFormatter(product.price) + ' ';
    let productPriceSale = product.on_sale ? currencyFormatter(product.regular_price) + ' ' : null;


    return (
      <TouchableOpacity activeOpacity={0.9} style={css.panelMini} onPress={viewPost}>
        <Image defaultSource={Images.PlaceHolder} source={image} style={css.imageMini} />

        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0, 0.7)']} style={css.bannerGradient}>

          <Text style={css.bannerTitle}>{title}</Text>

          <View style={css.priceView}>
            <Text style={[css.price]}>{productPrice}</Text>
            <Text style={[css.price, product.on_sale && css.sale_price]}>{productPriceSale}</Text>
          </View>

        </LinearGradient>

        <WishListIcon product={product}/>
      </TouchableOpacity>
    );
  }
}
