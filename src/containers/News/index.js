import React, {Component} from 'react';
import {PostList} from "@components";
import {Constants} from "@common"

export default class NewsScreen extends Component {
  render = () => <PostList type={"news"}
                           layoutHome={Constants.Layout.threeColumn}
                           onViewNewsScreen={this.props.onViewNewsScreen} />
}