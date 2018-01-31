import React, {Component} from 'react';
import {StyleSheet, Text, View,} from "react-native";
import styles from "./styles"
import {Timer, getProductImage, currencyFormatter, toast, Images} from '@app/Omni';
import {Ionicons, FontAwesome, EvilIcons} from '@expo/vector-icons';
import {TextInput, Button} from "@components"
import {Languages, Color, Styles} from '@common'

export default class FinishOrder extends Component {
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.iconContainer}>
          <Ionicons name="ios-checkmark-circle" size={80} color={Color.accent} />
        </View>

        <Text style={styles.title}>{Languages.ThankYou}</Text>
        <Text style={styles.message}>{Languages.FinishOrder}</Text>

        <View style={styles.btnNextContainer}>
          <Button text={Languages.ViewMyOrders}
                  style={styles.button}
                  textStyle={styles.buttonText}
                  onPress={this.props.finishOrder} />
        </View>
      </View>
    );
  }
}
