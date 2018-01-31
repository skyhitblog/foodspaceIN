import React, {Component} from 'react';
import {FlatList, Text, RefreshControl, TouchableOpacity, View} from 'react-native';
import {Constants, Images, Languages, Style, Layout} from '@common';
import {connect} from 'react-redux';
import Icon from "@expo/vector-icons/Entypo"
import styles from './styles';
import {
  HorizonLayout,
  PostBanner,
  HeaderFilter,
  Toolbar,
  FlatButton,
  LogoSpinner,
  Spinkit,
  Location
} from "@components";
import {warn} from "@app/Omni"
import {find} from "lodash"

class HorizonList extends Component {
  constructor(props) {
    super(props);
    this.page = 1;
    this.defaultList = [
      {id: 1, name: Languages.loading, images: [Images.PlaceHolder]},
      {id: 2, name: Languages.loading, images: [Images.PlaceHolder]},
      {id: 3, name: Languages.loading, images: [Images.PlaceHolder]},
    ]
  }

  componentDidMount() {
    this.fetchPost();
  }

  fetchPost = () => {
    const {config, index, fetchProductsByCollections} = this.props;
    fetchProductsByCollections(config.category, config.tag, this.page, index);
  }

  nextPosts = () => {
    this.page += 1;
    !this.props.collection.finish && this.fetchPost();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.collection.list != this.props.collection.list;
    // return nextProps.collection !== this.props.collection
  }

  viewAll = () => {
    const {config, onShowAll,  index, list, fetchProductsByCollections, setSelectedCategory} = this.props;
    const selectedCategory = find(list, (category) => (category.id === config.category));
    setSelectedCategory(selectedCategory);

    fetchProductsByCollections(config.category, config.tag, this.page, index);
    onShowAll(config, index);
  }


  onViewProductScreen = (product, type) => this.props.onViewProductScreen({product, type});
  // onViewProductScreen = (item, index) => this.props.onViewProductScreen(item, index, this.props.collection.list);

  renderItem = ({item, index}) => {
    const {layout} = this.props.config;

    if (item === null) return <View key={'post_'}/>
    return <HorizonLayout product={item}
                          key={'post-' + index}
                          onViewPost={() => this.onViewProductScreen(item, index)}
                          layout={layout}/>
  }

  render() {
    const {collection, config} = this.props;
    const list = typeof collection.list != 'undefined' && collection.list.length !== 0 ? collection.list : this.defaultList;
    const isPaging = config.paging ? true : false;

    const renderHeader = () => (
      <View style={styles.header}>
        <View style={styles.headerLeft}><Text style={styles.tagHeader}>{config.name}</Text></View>
        <TouchableOpacity onPress={this.viewAll} style={styles.headerRight}>
          <Text style={styles.headerRightText}>{Languages.seeAll}</Text>
          <Icon style={styles.icon} color="#666" size={20} name="chevron-small-right"/>
        </TouchableOpacity>
      </View>)

    return <View style={[styles.flatWrap, config.color && {backgroundColor: config.color}] }>
      {config.name && renderHeader()}
      <FlatList contentContainerStyle={styles.flatlist}
                data={list}
                keyExtractor={(item, index) => item.id}
                renderItem={this.renderItem}

                showsHorizontalScrollIndicator={false}
                horizontal
                pagingEnabled={isPaging}

                onEndReached={false && this.nextPosts}/>
    </View>
  }
}

const mapStateToProps = ({layouts, categories}, ownProp) => {
  const index = ownProp.index;
  return {collection: layouts[index], list: categories.list,}
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps;
  const {actions: LayoutActions} = require('@redux/LayoutRedux');
  const {actions: CategoryActions} = require('@redux/CategoryRedux');
  return {
    ...ownProps,
    ...stateProps,
    setSelectedCategory: (category) => dispatch(CategoryActions.setSelectedCategory(category)),

    fetchProductsByCollections: (category_id, tag_id, page = 1, index) => {
      LayoutActions.fetchProductsLayout(dispatch, category_id, tag_id, page, index);
    },
  };
}

export default connect(mapStateToProps, null, mergeProps)(HorizonList);
