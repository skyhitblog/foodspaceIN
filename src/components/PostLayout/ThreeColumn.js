'use strict';
import React, {Component} from "react";
import {Text, View, TouchableOpacity, Image} from "react-native";
import css from "./style";
import TimeAgo from "@custom/react-native-timeago";
import {WishListIcon, ProductPrice} from "@components";
import {Constants, Images} from "@common"
export default class ThreeColumn extends Component {
  render() {
    const {viewPost, title, post, type, imageURL, date} = this.props;
    // console.log("post:::", post);
    return (
      <TouchableOpacity activeOpacity={0.9} style={css.panelThree} onPress={viewPost}>
        <Image defaultSource={Images.PlaceHolder}  source={{uri: imageURL}} style={css.imagePanelThree}></Image>
        <Text style={css.nameThree}>{title}</Text>
        {typeof type !== 'undefined' &&  <Text style={css.timeThree}><TimeAgo time={date}/> </Text>}
        {typeof type === 'undefined' && <ProductPrice product={post} hideDisCount/>}
        {typeof type === 'undefined' && <WishListIcon product={post} style={Constants.RTL ? {'left': 10} : {right: 20} }/>}
      </TouchableOpacity>
    );
  }
}
