'use strict';
import React, {Component} from "react";
import {Images, Constants, Styles, Tools} from "@common";
import {getProductImage, warn} from "@app/Omni"

import ColumnHigh from './OneColumn'
import TwoColumn from './TwoColumn';
import ThreeColumn from './ThreeColumn';
import Card from './Card';
import MiniBanner from './MiniBanner'

export default class Index extends Component {
  render() {
    const {onViewPost, product} = this.props;
    let title = Tools.getDescription(product.name);
    
    let imageURL = product.images.length > 0 ?
      getProductImage(product.images[0].src, Styles.width) : Images.PlaceHolderURL;

    const props = {
      imageURL: imageURL,
      title: title,
      viewPost: onViewPost,
      product: product
    }

    switch (this.props.layout) {
      case Constants.Layout.twoColumn:
        return <TwoColumn {...props} />
      case Constants.Layout.threeColumn:
        return <ThreeColumn {...props}/>
      case Constants.Layout.miniBanner:
        return <MiniBanner {...props}/>
      case Constants.Layout.card:
        return <Card {...props}/>
      default:
        return <ColumnHigh {...props}/>
    }
  }
}
