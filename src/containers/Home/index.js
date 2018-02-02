import React, {Component} from 'react';
import {View} from 'react-native'
import {connect} from 'react-redux';
import {Images, Languages, Constants} from '@common';
import {toast, warn} from "@app/Omni";
import {PostBanner, HeaderFilter, HorizonList, Modal, PostList} from "@components";

class Home extends Component {
  componentDidMount() {
    this.props.fetchAllCountries();
  }

  render() {
    const {layoutHome, onViewProductScreen, onShowAll} = this.props;
    const isHorizontal = layoutHome === Constants.Layout.horizon;
    return (<View style={{flex: 1, backgroundColor: '#fff'}}>
      {isHorizontal && <HorizonList onShowAll={onShowAll} onViewProductScreen={onViewProductScreen}/>}
      {!isHorizontal && <PostList onViewProductScreen={onViewProductScreen}/>}
      <Modal.Layout />
    </View>)
  }
}


const mapStateToProps = ({user, products}) => ({user, layoutHome: products.layoutHome});
function mergeProps(stateProps, dispatchProps, ownProps) {
  const {dispatch} = dispatchProps;
  const CountryRedux = require('@redux/CountryRedux');
  return {
    ...ownProps,
    ...stateProps,
    fetchAllCountries: () => CountryRedux.actions.fetchAllCountries(dispatch)
  };
}
export default connect(mapStateToProps, undefined, mergeProps)(Home);
