'use strict';
import React, {Component} from "react";
import {Text, TouchableOpacity, Image} from "react-native";
import css from "./style";
import {Images, Constants, Styles} from "@common";
import {WishListIcon, ProductPrice} from "@components";
import {warn, getProductImage} from "@app/Omni"

export default class TwoColumn extends Component {
  render() {
    const {title, product, viewPost} = this.props;
    const image = typeof product.images[0] != 'undefined' ? {uri: getProductImage(product.images[0].src, Styles.width)} : Images.PlaceHolder

    return (
      <TouchableOpacity activeOpacity={0.9} style={css.panelTwo} onPress={viewPost}>
        <Image defaultSource={Images.PlaceHolder} source={image} style={css.imagePanelTwo}/>
        <Text numberOfLines={1} style={css.nameTwo}>{title}</Text>
        <ProductPrice product={product} hideDisCount/>
        <WishListIcon product={product}/>
      </TouchableOpacity>
    );
  }
}
