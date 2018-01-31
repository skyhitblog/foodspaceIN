import React, {StyleSheet, Platform, Dimensions, PixelRatio} from "react-native";
import {Color, Constants, Styles} from '@common';

const {width, height, scale} = Dimensions.get("window"),
  vw = width / 100,
  vh = height / 100,
  vmin = Math.min(vw, vh),
  vmax = Math.max(vw, vh);

export default StyleSheet.create({
  "flatlist": {
    "flexWrap": "wrap",
    "flexDirection": "row",
    "paddingBottom": 40,
    paddingTop: Platform.OS == 'ios' ? 50 : 50
  },
  "more": {
    "width": width,
    "alignItems": "center",
    "marginBottom": 10,
    "marginTop": 10
  },
  "spinView": {
    "width": width,
    "backgroundColor": "#fff",
    "flex": 1,
    "paddingTop": 20
  },
  "header": {
    "position": "absolute",
    "top": 0,
    "left": 0,
    "right": 0,
    "backgroundColor": "rgba(255, 255, 255, 0.5)",
    "overflow": "hidden",
    "height": Constants.Window.headerHeight
  },
  headerText: {
    fontSize: 22,
    fontFamily: Constants.fontHeader,
    width: width,
    marginBottom: 20,
    marginTop: 50,
    marginLeft: 15,
  },

  bannerImage: {
    width: width - 40,
    marginLeft: 20,
    borderRadius: 6,
    flex: 1,
    height: 25 * height / 100,
    resizeMode: 'cover',
  },
  headerView: {
    marginBottom: 20,
  },
  listView: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)",
  },
});