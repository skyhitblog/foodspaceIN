'use strict';
import React, {Component} from "react";
import {Text, View, TouchableOpacity, Image} from "react-native";
import css from "./style";
import TimeAgo from "react-native-timeago";
import {Images} from "@common"

export default class DefaultLayout extends Component {
  render() {
    const {imageURL, title, date, viewPost} = this.props;
    
    return (
      <TouchableOpacity activeOpacity={0.9} style={css.panel} onPress={viewPost}>
        <Image defaultSource={Images.PlaceHolder}  source={{uri: imageURL}} style={css.imagePanel}></Image>
        <Text style={css.name}>
          {title}
        </Text>
        <Text style={[css.time, {textAlign: 'center'}]}>
          <TimeAgo time={date} hideAgo={true} />
        </Text>
      </TouchableOpacity>
    );
  }
}
