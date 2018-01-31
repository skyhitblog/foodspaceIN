'use strict';
import React, {Component} from "react";
import {Text, View, TouchableOpacity, Image} from "react-native";
import css from "./style";
import TimeAgo from "react-native-timeago";
import CommentIcons from "@components/CommentIcons/Index";
import Tools from "@common/Tools";
import { Components } from 'expo';
import {Images} from "@common"
const { LinearGradient } = Components;

export default class LargeLayout extends Component {
  render() {
    const {post, viewPost} = this.props;
    const imageURL = Tools.getImage(post);
    const authorName = post._embedded.author[0]['name'];
    const commentCount = typeof post._embedded.replies == 'undefined' ? 0 : post._embedded.replies[0].length;
    const title = typeof post.title == 'undefined' ? '' : post.title.rendered;

    return (
      <TouchableOpacity activeOpacity={1} elevation={10} style={css.cardNews}
                        onPress={viewPost}>
        <View style={css.cardView}>
          <Image defaultSource={Images.PlaceHolder}  style={css.largeImage} source={{uri: imageURL}}></Image>

          <LinearGradient style={css.linearGradient} colors={["rgba(0,0,0,0)", "rgba(0,0,0, 0.7)"]}>
            <Text style={css.newsTitle}>{title}</Text>
          </LinearGradient>

          <View style={css.description}>
            <Text style={css.author}><TimeAgo time={post.date} hideAgo={true} /> by @{authorName}</Text>
            <CommentIcons post={post} comment={commentCount} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
