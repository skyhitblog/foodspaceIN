import React, {Component} from 'react'
import {Animated, View} from 'react-native'
import {Menu, Back} from '@navigation/IconNav'
import styles from './styles'
import {Languages, Images} from '@common'

export default class AnimatedHeader extends Component {
  render() {
    const {scrollY, label, hideIcon} = this.props;

    const titleTransformY = scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [0, -45],
      extrapolate: 'clamp',
    });
    const titleTransformX = scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [0, 25],
      extrapolate: 'clamp',
    });
    const titleScale = scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [1, 0.8],
      extrapolate: 'clamp',
    });

    return <View >
      <View style={styles.headerView}/>

      <Animated.Text
        style={[styles.headerLabel,
          {
            transform: [{translateY: titleTransformY},
              {translateX: titleTransformX},
              {scale: titleScale}]
          }]}>
        {label}
      </Animated.Text>
      {!hideIcon && <View style={styles.homeMenu}>{Menu()}</View>}
    </View>
  }
}
