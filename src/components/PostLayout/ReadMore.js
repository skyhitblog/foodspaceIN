'use strict';
import React, {Component} from "react";
import {Text, View, TouchableOpacity, Image} from "react-native";
import css from "./style";
import TimeAgo from "react-native-timeago";
import { CommentIcons } from "@components";
import {Images} from "@common"

export default class ReadMoreLayout extends Component {
  render() {
    const {imageURL, title, description, date, viewPost, category, viewCategory} = this.props;

    return (
      <View style={css.panelList}>
        <TouchableOpacity onPress={viewPost}><Image defaultSource={Images.PlaceHolder} source={{uri: imageURL}} style={css.imageList}></Image></TouchableOpacity>
        <TouchableOpacity style={css.titleList}>
          <Text style={css.nameList}>{title}</Text>
          {description && <Text style={css.descriptionList}>{description}</Text>}

          <View style={{flexDirection: 'row'}}>
            <TimeAgo style={css.timeList} time={date} hideAgo={true} />

            {category &&
            <TouchableOpacity onPress={viewCategory}>
              <Text style={css.category}>- {category}</Text>
            </TouchableOpacity>}

          </View>
        </TouchableOpacity>

      </View>
    );
  }
}
