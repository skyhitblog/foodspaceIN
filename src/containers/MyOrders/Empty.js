import React, { Component } from 'react';
import {StyleSheet, Text, View, Image} from "react-native";
import styles from "./styles"
import {Styles, Languages, Images} from "@common";
import {Timer,getProductImage, currencyFormatter,toast} from '@app/Omni';
import {ShopButton} from "@components"

export default class PaymentEmpty extends Component {
  render(){
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.content}>
          <View>
            <Image source={Images.IconOrder}  style={styles.icon} resizeMode="contain"/>
          </View>
          <Text style={styles.title}>{Languages.MyOrder}</Text>
          <Text style={styles.message}>{this.props.text}</Text>

          <ShopButton onPress={this.props.onReload}
                      text={Languages.reload}
                      css={{backgroundColor: '#ccc', marginTop: 20, width: 120, height: 40}}/>
        </View>

        <ShopButton onPress={this.props.onViewHome} />
      </View>
    );
  }
}
