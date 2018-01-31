/**
 * Created by InspireUI on 18/02/2017.
 */
'use strict';
import React from 'react';
import {Images} from '@common';
import Expo from 'expo';
import Router from './Router';
import {Font} from 'expo';

export default class ReduxWrapper extends React.Component {
  state = {appIsReady: false};
  componentWillMount() {
    this.loadAssets();
    console.ignoredYellowBox = ['Warning: View.propTypes', 'Warning: BackAndroid'];
  }

  cacheFonts(fonts) {
    return fonts.map(font => Font.loadAsync(font));
  }

  cacheImages(images) {
    return images.map(image => {

      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Expo.Asset.fromModule(image).downloadAsync();
      }
    });
  }

  async loadAssets() {
    const fontAssets = this.cacheFonts([
      {'opensan': require('@assets/fonts/OpenSans-Regular.ttf')},
      {'baloo': require('@assets/fonts/Baloo-Regular.ttf')},
    ]);

    const imageAssets = this.cacheImages([
      Images.icons.iconCard,
      Images.icons.iconColumn,
      Images.icons.iconLeft,
      Images.icons.iconRight,
      Images.icons.iconThree,
      Images.icons.iconAdvance,
      Images.icons.iconHorizal,
      Images.IconSwitch,
      Images.IconFilter,
      Images.IconList,
      Images.IconGrid,
      Images.IconCard,
      Images.IconSearch,
    ]);

    await Promise.all([
      ...fontAssets,
      ...imageAssets
    ]);

    this.setState({appIsReady: true});
  }

  render() {
    if (!this.state.appIsReady) {
      return <Expo.AppLoading />;
    }
    return <Router />
  }
}
