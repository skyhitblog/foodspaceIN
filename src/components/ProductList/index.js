import React, {Component} from 'react';
import {FlatList, Image, Platform, RefreshControl, Animated, View} from 'react-native';
import {PostLayout, FlatButton, AnimatedHeader, PostBanner, Spinkit} from "@components";
import {Constants, Layout} from '@common';
import {connect} from 'react-redux';
import styles from './styles';
import {warn, log} from "@app/Omni";


const HEADER_MIN_HEIGHT = 40;
const HEADER_SCROLL_DISTANCE = Constants.Window.headerHeight - HEADER_MIN_HEIGHT;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class ProductList extends Component {
  state = {scrollY: new Animated.Value(0)};

  constructor(props) {
    super(props);
    this.page = props.page ? props.page : 0;
    this.limit = Constants.pagingLimit;
    this.isProductList = props.type === undefined;
  }

  componentDidMount() {
    // this.page === 0 && this.fetchData()
  }

  fetchData = (reload = false) => {
    if (reload) {
      this.page = 1;
    }
    const {config, index, fetchProductsByCollections} = this.props;
    fetchProductsByCollections(config.category, config.tag, this.page, index);
  }

  fetchMore = () => {
    this.page += 1;
    this.fetchData()
  }


  onRowClickHandle = (item) => {
    if (this.isProductList) {
      this.props.onViewProductScreen({product: item});
    }
    else {
      this.props.onViewNewsScreen({post: item})
    }
  }

  renderItem = ({item, index}) => {
    if (item == null) return <View />

    let layout = Constants.Layout.twoColumn;

    return <PostLayout post={item}
                       type={this.props.type}
                       key={"key-" + index}
                       onViewPost={this.onRowClickHandle.bind(this, item, this.props.type)}
                       layout={layout}/>
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.list !== this.props.list
  }

  headerComponent = () => {
    const {type, headerImage, onViewProductScreen} = this.props;

    return <View style={styles.headerView}>
      {headerImage && <Image style={styles.bannerImage} source={headerImage}/> }
    </View>

    const animateOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });

    const titleTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50, -150],
      extrapolate: 'clamp',
    });

    return <PostBanner onViewProductScreen={onViewProductScreen}
                       type={type}
                       animateOpacity={animateOpacity}
                       animate={titleTranslate}/>
  }

  render() {
    const {list, config, navigation, isFetching} = this.props;

    const renderFooter = () => isFetching && <Spinkit />

    return <View style={styles.listView}>
      <AnimatedHeader scrollY={this.state.scrollY}
                      hideIcon
                      label={config.name}/>
      <AnimatedFlatList
        contentContainerStyle={styles.flatlist}
        data={list}
        keyExtractor={(item, index) => item.id}
        renderItem={this.renderItem}

        ListHeaderComponent={this.headerComponent}
        ListFooterComponent={renderFooter()}

        refreshing={isFetching}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => this.fetchData(true)}
          />
        }

        onEndReachedThreshold={100}
        onEndReached={(distance) => distance.distanceFromEnd > 100 && this.fetchMore()}

        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
          {useNativeDriver: Platform.OS == 'android' ? false : true},
        )}/>
    </View>
  }
}


const mapStateToProps = ({layouts}, ownProp) => {
  const index = ownProp.index;
  const list = layouts[index].list
  const isFetching = layouts[index].isFetching
  return {list, isFetching}
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps;
  const {actions: LayoutActions} = require('@redux/LayoutRedux');
  return {
    ...ownProps,
    ...stateProps,
    initProduct: () => dispatch(Product.actions.initProduct()),

    fetchProductsByCollections: (category_id, tag_id, page, index) => {
      LayoutActions.fetchProductsLayout(dispatch, category_id, tag_id, page, index);
    },
  };
}

export default connect(mapStateToProps, null, mergeProps)(ProductList);
