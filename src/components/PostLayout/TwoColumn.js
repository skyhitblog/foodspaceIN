'use strict';
import React, {Component} from "react";
import {Text, View, TouchableOpacity, Image} from "react-native";
import css from "./style";
import {WishListIcon, ProductPrice} from "@components";
import {Tools, Images, Constants} from "@common";

export default class TwoColumn extends Component {
  render() {
    const {post, type, viewPost} = this.props;
    const imageURL = Tools.getImage(post);
    const authorName = post._embedded.author[0]['name'];
    const commentCount = typeof post._embedded.replies == 'undefined' ? 0 : post._embedded.replies[0].length;
    const title = typeof post.title == 'undefined' ? '' : post.title.rendered;

    return (
      <TouchableOpacity activeOpacity={0.9} style={css.smCardNews} onPress={viewPost}>
        <View style={css.cardView}>
          <Image defaultSource={Images.PlaceHolder}  style={css.smImage} source={{uri: imageURL}}></Image>
          <View style={css.smDescription}>
            <Text style={css.smTitle}>{Tools.getDescription(title)}</Text>
            {typeof type === 'undefined' && <ProductPrice product={post} hideDisCount /> }
          </View>
        </View>
        {typeof type === 'undefined' && <WishListIcon product={post} style={Constants.RTL ? {'left': 10} : {right: 25} }/> }
      </TouchableOpacity>
    );
  }
}
