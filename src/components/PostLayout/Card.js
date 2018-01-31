'use strict';
import React, {Component} from "react";
import {Text, View, TouchableOpacity, Image} from "react-native";
import css from "./style";
import {Constants, Images} from "@common";
import TimeAgo from "react-native-timeago";
import {WishListIcon, ProductPrice} from "@components";

export default class CardLayout extends Component {
  render() {
    const {post, title, type, imageURL, date, viewPost} = this.props;
    const wishIcon = {
      top: 17,
      right: 30,
    }
    const wishIconRTL = {
      top: 17,
      left: 17,
    }
    return (
      <TouchableOpacity activeOpacity={0.9} style={css.panelOne} onPress={viewPost}>
        <Image defaultSource={Images.PlaceHolder} source={{uri: imageURL}} style={css.imagePanelOne}/>
        <Text style={css.nameOne}>{title}</Text>

        {typeof type !== 'undefined' &&
        <Text style={[css.timeOne, {textAlign: 'center'}]}><TimeAgo time={date}/></Text>}
        {typeof type === 'undefined' && <ProductPrice product={post} hideDisCount/> }
        {typeof type === 'undefined' && <WishListIcon product={post} style={Constants.RTL ? wishIconRTL : wishIcon}/>}
      </TouchableOpacity>
    );
  }
}
