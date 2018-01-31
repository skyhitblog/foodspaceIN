'use strict';
import React, {Component} from "react";
import {Text, View, TouchableOpacity, Image} from "react-native";
import css from "./style";
import TimeAgo from "react-native-timeago";
import {WishListIcon, ProductPrice} from "@components";
import {Constants, Images} from "@common";

export default class ColumnLayout extends Component {
  render() {
    const {imageURL, post, type, title, date, viewPost} = this.props;
    return (
      <TouchableOpacity activeOpacity={0.9} style={css.panelTwo} onPress={viewPost}>
        <Image defaultSource={Images.PlaceHolder} source={{uri: imageURL}} style={css.imagePanelTwo} />

        <Text style={css.nameTwo}>{title}</Text>
        {typeof type !== 'undefined' && <Text style={[css.timeTwo, {alignSelf: 'center'}]}><TimeAgo time={date} /></Text> }
        {typeof type === 'undefined' && <ProductPrice product={post} hideDisCount /> }
        {typeof type === 'undefined' && <WishListIcon product={post} style={Constants.RTL ? {left: 20} : {right: 25}}/>}
      </TouchableOpacity>
    );
  }
}
