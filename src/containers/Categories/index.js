// @flow
/**
 * Created by InspireUI on 19/02/2017.
 */
import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Styles, Images, Languages, Constants} from "@common";
import {Timer, toast, BlockTimer} from '@app/Omni';
import {Empty, CategorySlider, PostBanner, LogoSpinner} from '@components';
import Parallax from 'react-native-parallax'
import styles from './styles'

class CategoriesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingBuffer: true,
    };
  }

  componentDidMount() {
    Timer.setTimeout(() => this.setState({loadingBuffer: false}), 1000);

    const {fetchCategories} = this.props;
    fetchCategories();
  }

  componentWillReceiveProps(props) {
    const {error} = props.categories;
    if (error) toast(error);
  }

  render() {
    const {loadingBuffer} = this.state;
    const {categories} = this.props;

    if (categories.error) {
      return <Empty text={categories.error} />;
    }

    if (loadingBuffer || categories.isFetching) {
      return <LogoSpinner fullStretch={true} />;
    }

    const mainCategories = categories.list.filter(category => category.parent == 0);
    return (
      <Parallax.ScrollView style={styles.fill}>
         {mainCategories.map((category, index) => {
          const textStyle = index % 2 == 0 ? {marginRight: 30, textAlign: "right"} : {marginLeft: 30, textAlign: "left"}
          const categoryImage = category.image !== null ? {uri: category.image.src} : Images.categoryPlaceholder;

          return  <Parallax.Image
                      key={index}
                      onPress={() => this.onRowClickHandle(category)}
                      style={styles.image}
                      overlayStyle={styles.overlay}
                      containerStyle={styles.containerStyle}
                      parallaxFactor={0.4}
                      source={categoryImage}>

                      <View style={[styles.dim_layout, index % 2 == 0 && {alignItems: "flex-end"}, index % 2 != 0 && {alignItems: "flex-start"}]}>
                        <Text style={[styles.mainCategoryText, {...textStyle}]}>{category.name}</Text>
                        <Text style={[styles.numberOfProductsText, {...textStyle}]}>{category.count + ' products'}</Text>
                      </View>
                  </Parallax.Image>
         })}
      </Parallax.ScrollView>
    );
  }


  onRowClickHandle = (category) => {
    const {setSelectedCategory, onViewCategory} = this.props;
    BlockTimer.execute(
      () => {
        setSelectedCategory(category);
        onViewCategory({mainCategory: category});
      }, 500);
  }

}


const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    netInfo: state.netInfo,
    user: state.user,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const {netInfo} = stateProps;
  const {dispatch} = dispatchProps;
  const {actions} = require('@redux/CategoryRedux');
  const ProductRedux = require('@redux/ProductRedux');

  return {
    ...ownProps,
    ...stateProps,
    fetchCategories: () => {
      if (!netInfo.isConnected) return toast(Languages.noConnection);
      actions.fetchCategories(dispatch);
    },
    setSelectedCategory: (category) => dispatch(actions.setSelectedCategory(category)),
    fetchProductsByTag: (tag) => {
      if (!netInfo.isConnected) return toast('No connection');
      ProductRedux.actions.fetchProductsByTag(dispatch, tag);
    },
  };
}

export default connect(mapStateToProps, undefined, mergeProps)(CategoriesScreen);
