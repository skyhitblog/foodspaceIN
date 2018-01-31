'use strict';
import React, {Component} from "react";
import {Text, TouchableOpacity, Image} from "react-native";
import css from "./style";
import {Constants, Styles, Images} from "@common"
import {ProductPrice, WishListIcon} from "@components";
import {getProductImage, warn} from "@app/Omni"

export default class ThreeColumn extends Component {
  render() {
    const {viewPost, title, product} = this.props;
    const imageURL = typeof product.images[0] != 'undefined' ? getProductImage(product.images[0].src, Styles.width) : Images.PlaceHolderURL

    return (
      <TouchableOpacity activeOpacity={0.9} style={css.panelThree} onPress={viewPost}>
        <Image  defaultSource={Images.PlaceHolder}  source={{uri: imageURL}} style={css.imagePanelThree} />
        <Text numberOfLines={1} style={css.nameThree}>{title}</Text>
        <ProductPrice product={product} hideDisCount/>
        <WishListIcon product={product}/>
      </TouchableOpacity>
    );
  }
}
