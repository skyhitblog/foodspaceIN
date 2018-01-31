import React, { Component } from 'react';
import {Text, View, Image} from "react-native";
import styles from "./styles"
import {Styles, Languages, Images} from "@common";
import {Timer,getProductImage, currencyFormatter,toast} from '@app/Omni';
import {ShopButton} from "@components"

export default class PaymentEmpty extends Component {
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.contentEmpty}>
          <View>
            <Image source={Images.IconCart} style={styles.icon} resizeMode="contain"/>
          </View>
          <Text style={styles.title}>{Languages.ShoppingCartIsEmpty}</Text>
          <Text style={styles.message}>{Languages.AddProductToCart}</Text>
        </View>

        <ShopButton onPress={this.props.onViewHome} />
      </View>
    );
  }
}
