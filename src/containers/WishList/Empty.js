import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from "react-native";
import styles from "./styles"
import {Styles, Languages, Images} from "@common";
import {Timer,getProductImage, currencyFormatter,toast} from '@app/Omni';
import {ShopButton} from "@components"

export default class PaymentEmpty extends Component {
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View>
            <Image source={Images.IconHeart} style={styles.icon} resizeMode="contain"/>
          </View>
          <Text style={styles.title}>{Languages.EmptyWishList}</Text>
          <Text style={styles.message}>{Languages.NoWishListItem}</Text>
        </View>

        <ShopButton onPress={this.props.onViewHome} />
      </View>
    );
  }
}
