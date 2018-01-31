import React, {Component} from "react";
import {View, Image, Text} from "react-native";

import {Constants, Languages} from '@common';
import {Spinkit, PostLayout} from '@components';
import styles from "./styles";
import {connect} from 'react-redux';
import {warn} from '@app/Omni'
class ProductRelated extends Component {

  componentWillMount() {
    let {tags} = this.props;
    this.props.fetchProductRelated(tags);
  }

  onRowClickHandle = (product) => this.props.onViewProductScreen({product});

  render() {
    const {productRelated} = this.props;

    return (<View style={styles.wrap}>
      <View style={styles.head}>
        <Text style={styles.headTitle}>{Languages.ProductRelated}</Text>
      </View>
      <View style={styles.flatlist}>
        {productRelated.map((item, index) => <PostLayout post={item}
                                                         key={"key-" + index}
                                                         onViewPost={this.onRowClickHandle.bind(this, item)}
                                                         layout={Constants.Layout.threeColumn}/>
        )}
      </View>
    </View>)
  }
}

const mapStateToProps = ({products}) => ({productRelated: products.productRelated})

function mergeProps(stateProps, dispatchProps, ownProps) {
  const {dispatch} = dispatchProps;
  const ProductRedux = require('@redux/ProductRedux')

  return {
    ...ownProps,
    ...stateProps,
    fetchProductRelated: (product) => {
      ProductRedux.actions.fetchProductRelated(dispatch, product)
    }
  };
}

export default connect(mapStateToProps, undefined, mergeProps)(ProductRelated);
