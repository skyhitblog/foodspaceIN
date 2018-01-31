import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import styles from "./styles";
import {Constants, Color} from "@common";
import {connect} from "react-redux";
import {warn} from "@app/Omni"
import {actions} from '@redux/ProductRedux'

class ItemLayout extends Component {
  changeLayout(layout) {
    this.props.switchLayoutHomePage(layout);
    this.props.close();
  }

  render() {
    const {layoutHome, layout, image, text} = this.props;

    let displayMode = layoutHome;

    if (typeof displayMode == 'undefined') {
      displayMode = Constants.Layout.advance;
    }

    return (
      <TouchableOpacity activeOpacity={0.9}
                        style={styles.rowView}
                        onPress={this.changeLayout.bind(this, layout)}>
        <View style={[styles.row, displayMode === layout && styles.rowActive]}>
          <Image source={image}
                 style={[styles.imageIcon, displayMode === layout && {tintColor: '#fff'}]}/>
          <Text style={[styles.text, displayMode === layout && styles.imageIconActive]}> {text} </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = ({products}) => ({layoutHome: products.layoutHome});
const switchLayoutHomePage = actions.switchLayoutHomePage;
export default connect(mapStateToProps, {switchLayoutHomePage})(ItemLayout);
