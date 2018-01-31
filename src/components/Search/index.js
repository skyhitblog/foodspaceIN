'use strict'

import React, {Component} from 'react'
import {Text, TextInput, ListView, View, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import Icon from '@expo/vector-icons/Ionicons'

import {Color, Constants, Icons, Languages} from '@common';
import {FlatButton, Spinkit, ProductItem} from "@components";
import styles from './styles'
import {BlockTimer} from "@app/Omni";

class Search extends Component {
  constructor(props) {
    super(props)
    this.page = 1;
    this.limit = Constants.pagingLimit;
    this.state = {
      text: '',
      isSubmit: false,
      loading: false,
      focus: false
    }
    this.renderItem = this.renderItem.bind(this);
    this.renderSearchBar = this.renderSearchBar.bind(this);
  }

  componentDidMount() {
    this.setState({focus: true})
  }

  renderSearchBar() {
    const closeButton = () => {
      return (<TouchableOpacity
        onPress={this.onBack.bind(this)}
        style={{width: 50, justifyContent: 'center', alignItems: 'center',}}>
        <Icon name={Icons.Ionicons.Close} size={30}/>
      </TouchableOpacity>)
    }

    const searchButton = () => {
      return (<TouchableOpacity
        onPress={this.startNewSearch.bind(this)}
        style={{width: 50, justifyContent: 'center', alignItems: 'center',}}>
        <Icon name={Icons.Ionicons.Search} size={24}/>
      </TouchableOpacity>)
    }


    const styleTextInput = {
      flex: 1, fontSize: 16, paddingLeft: 20, fontFamily: Constants.fontFamily
    }
    const searchInput = (
      <TextInput
        ref="textInput"
        autoFocus={this.state.focus}
        placeholder={Languages.SearchPlaceHolder}
        style={[styleTextInput, {marginLeft: Constants.RTL ? 110 : 10}]}
        value={this.state.text}
        onChangeText={(text) => this.setState({text})}
        underlineColorAndroid='transparent'
        onSubmitEditing={this.startNewSearch.bind(this)}
      />)

    return (
      <View style={{
        height: 50,
        flexDirection: Constants.RTL ? 'row-reverse' : 'row',
        marginBottom: 10,
        marginTop: 20,
        borderBottomWidth: 1,
        borderColor: Color.DirtyBackground,
      }}>
        {searchInput}
        {searchButton()}
      </View>
    )
  }

  onBack = () => {
    this.setState({text: ''})
    this.props.onBack();

  }

  async startNewSearch() {
    var self = this;
    const list = this.props.list;

    this.setState({loading: true, isSubmit: true});
    await this.props.fetchProductsByName(this.state.text, this.limit, this.page);
    if (typeof list != 'undefined') {
      self.setState({loading: false});
    }

  }

  onRowClickHandle(product) {
    BlockTimer.execute(
      () => {
        this.props.onViewProductScreen({product});
      }, 500);
  }

  renderItem(item) {
    return <ProductItem small product={item} onPress={this.onRowClickHandle.bind(this, item)}/>
  }

  nextPosts() {
    this.page += 1;
    this.props.fetchProductsByName(this.state.text, this.limit, this.page)
  }

  renderResultList() {
    const {list, isFetching} = this.props;
    const {isSubmit} = this.state;
    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return list != "" ? <ListView
      contentContainerStyle={styles.flatlist}
      dataSource={dataSource.cloneWithRows(list)}
      renderRow={this.renderItem}
      renderFooter={() => {
        return list.length > 20 ? <View style={styles.more}>
          <FlatButton
            name="arrow-down"
            text={isFetching ? 'LOADING...' : 'MORE'}
            load={this.nextPosts.bind(this)}/>
        </View> : null
      }}/>
      : isSubmit && !isFetching && <Text style={{textAlign: 'center'}}>{Languages.NoResultError}</Text>
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        {this.renderSearchBar()}
        <View style={{flex: 1}}>
          {this.props.isFetching ? <Spinkit /> : this.renderResultList() }
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({products}) => ({list: products.productsByName, isFetching: products.isFetching});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps;
  const {actions} = require('@redux/ProductRedux');
  return {
    ...ownProps,
    ...stateProps,
    fetchProductsByName: (name, per_page, page) => {
      if (name.length > 2) {
        actions.fetchProductsByName(dispatch, name, per_page, page);
      }
    },

  };
}
module.exports = connect(mapStateToProps, null, mergeProps)(Search)
