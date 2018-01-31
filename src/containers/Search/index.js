import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  TextInput
} from "react-native";
import styles from "./index_style.js"
import {connect} from 'react-redux';
import {Styles, Languages, Images, Constants} from './../../Omni';
import {Ionicons, FontAwesome, EvilIcons} from '@expo/vector-icons';

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.wishListItems),
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navi}>
          <TouchableOpacity style={styles.btnClose} onPress={this.props.onBack}>
            <EvilIcons name="close" size={30} />
          </TouchableOpacity>
          <TextInput style={styles.inputSearch} placeholder={Languages.SearchPlaceHolder}
                     placeholderTextColor="#cccccc" />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wishListItems: state.wishList.wishListItems,
    cartItems: state.carts.cartItems,
  };
};
export default connect(mapStateToProps)(SearchScreen);
