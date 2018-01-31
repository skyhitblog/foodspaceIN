'use strict';
import React, {Component} from "react";
import {Text, View, TouchableOpacity, Image} from "react-native";
import css from "./style";
import TimeAgo from "react-native-timeago";
import {Constants} from "@common";
import {WishListIcon, ProductPrice} from "@components";

export default class SimpleLayout extends Component {
  render() {
    const {imageURL, post, type, title, description, date, viewPost, category, viewCategory} = this.props;

    const price = {
      alignItems: 'flex-start',
      marginLeft: 5,
    }
    const priceRTL = {
      alignItems: 'flex-end',
      marginRight: 5,
    }

    return (
      <TouchableOpacity activeOpacity={0.9} style={[css.panelList, Constants.RTL && {'flexDirection' : 'row-reverse'}]} onPress={viewPost}>

        <View style={css.simpleContent}>
          <Text style={css.simpleTitle}>{title}</Text>

          {description && <Text style={css.simpleDesc}>{description}</Text>}

          <View>
            {typeof type === 'undefined' && <ProductPrice product={post} style={Constants.RTL ? priceRTL : price } hideDisCount /> }
            {category &&
            <TouchableOpacity onPress={viewCategory}>
              <Text style={css.category}>- {category}</Text>
            </TouchableOpacity>}

          </View>
        </View>
        <Image source={{uri: imageURL}} style={css.simpleImage}></Image>
        {typeof type === 'undefined' && <WishListIcon product={post} style={{top: 15}}/> }
      </TouchableOpacity>
    );
  }
}
