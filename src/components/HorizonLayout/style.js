import React, {StyleSheet, Platform, Dimensions, PixelRatio} from "react-native";
import {Color, Constants, Styles} from '@common';

const {width, height, scale} = Dimensions.get("window"),
  vw = width / 100,
  vh = height / 100,
  vmin = Math.min(vw, vh),
  vmax = Math.max(vw, vh);

export default StyleSheet.create({
  "panelOne": {
    "width": 300,
    "position": "relative",
    "alignItems": "flex-start",
    "justifyContent": "space-around",
    "marginLeft": 15
  },
  "nameOne": {
    "fontSize": 12,
    "width": 300,
    "alignSelf": "flex-start",
    "backgroundColor": "transparent",
    "color": "#212121",
    "fontWeight": "600",
    "marginTop": 8,
    "fontFamily": Constants.fontFamilyBold
  },
  "description": {
    "fontSize": 9,
    "marginTop": 2,
    "marginBottom": 4,
    "marginLeft": 0,
    "lineHeight": 16,
    "textAlign": "left",
    "color": "#555555",
    "fontFamily": Constants.fontfamily
  },
  "time": {
    "alignSelf": Constants.RTL ? 'flex-end' : 'flex-start',
    "marginLeft": 0,
    "marginRight": 8,
    "color": "#29A4C9",
    "fontSize": 9,
    "marginTop": 4,
    "fontFamily": Constants.fontfamily
  },
  "panelTwo": {
    "position": "relative",
    "width": 180,
    "alignItems": "flex-start",
    "justifyContent": "space-around",
    "marginBottom": 12,
    "marginLeft": 15
  },
  "imagePanelTwo": {
    "position": "relative",
    "width": 180,
    "height": 150
  },
  "nameTwo": {
    "fontSize": 13,
    "width": 180,
    "marginTop": 8,
    "marginBottom": 4,
    "fontFamily": Constants.fontFamilyBold,
    "textAlign": Constants.RTL ? 'right' : 'left'
  },
  "panelTwoHigh": {
    "position": "relative",
    "width": 180,
    "alignItems": "flex-start",
    "justifyContent": "space-around",
    "marginBottom": 12,
    "marginLeft": 15
  },
  "imagePanelTwoHigh": {
    "position": "relative",
    "width": 180,
    "height": 220
  },
  "panelThree": {
    "position": "relative",
    "width": 120,
    "alignItems": "flex-start",
    "justifyContent": "space-around",
    "marginBottom": 12,
    "marginLeft": 15
  },
  "imagePanelThree": {
    "width": 120,
    "height": 150,
    "alignSelf": "flex-start"
  },
  "nameThree": {
    "fontSize": 13,
    "width": 120,
    "marginTop": 6,
    "lineHeight": Platform.OS == 'android' ? 24 : 20,
    "color": "#212121",
    "fontFamily": Constants.fontFamilyBold,
    "alignSelf": "flex-start"
  },
  "descriptionThree": {
    "fontSize": 9,
    "marginTop": 2,
    "marginBottom": 4,
    "marginLeft": 0,
    "lineHeight": 16,
    "width": 118,
    "textAlign": "left",
    "color": "#555555",
    "fontFamily": Constants.fontfamily
  },
  "panelMini": {
    "width": width,
  },
  "imageMini": {
    "width": width,
    "height": height * 60 / 100,
    "resizeMode": "cover"
  },
  "panelCard": {
    "width": width - 50,
    "position": "relative",
    "alignItems": "flex-start",
    "justifyContent": "space-around",
    "marginLeft": 15,
    "marginTop": 10,
    "marginBottom": 20
  },
  "imagePanelCard": {
    "position": "relative",
    "flex": 1,
    "height": 150,
    "width": width - 50
  },
  "nameCard": {
    "fontSize": 14,
    "width": width - 50,
    "alignSelf": "flex-start",
    "backgroundColor": "transparent",
    "color": "#212121",
    "marginTop": 8,
    "marginBottom": 6,
    "fontFamily": Constants.fontFamilyBold
  },
  "descriptionCard": {
    "fontSize": 9,
    "marginTop": 0,
    "marginBottom": 4,
    "marginLeft": 0,
    "lineHeight": 14,
    "textAlign": "left",
    "color": "#555555",
    "fontFamily": Constants.fontfamily
  },
  "timeCard": {
    "marginLeft": 0,
    "marginRight": 8,
    "color": "#29A4C9",
    "fontSize": 8,
    "marginTop": 4,
    "fontFamily": Constants.fontFamily
  },
  "cardOneGradient": {
    "width": 300,
    "borderRadius": 8,
    "height": 150,
    "flex": 1,
    "justifyContent": "flex-end",
    "zIndex": 9999,
    "position": "absolute",
    "left": 0,
    "top": 0
  },
  "imagePanelOne": {
    "position": "relative",
    "flex": 1,
    "height": 150,
    "width": 300
  },
  "blurOne": {
    "position": "absolute",
    "height": height / 3 - 50,
    "left": width / 100 * 3,
    "top": 20,
    "alignSelf": "flex-start",
    "zIndex": 9999
  },
  "nameLocation": {
    "fontFamily": Constants.fontFamily,
    "fontSize": 20,
    "color": "#FFF",
    "backgroundColor": "transparent",
    "marginTop": 10,
    "marginBottom": 10
  },
  "timeOne": {
    "marginBottom": 10,
    "marginTop": 4,
    "marginLeft": 12,
    "marginRight": 12,
    "color": "#999",
    "fontSize": 12,
    "textAlign": Constants.RTL ? 'right' : 'left'
  },
  "cardOneBottom": {
    "flexDirection": "row",
    "position": "absolute",
    "height": 50,
    "left": width / 100 * 3,
    "bottom": 20,
    "alignSelf": "flex-start",
    "zIndex": 9999
  },
  "readMore": {
    "color": "#FFF",
    "fontWeight": "500",
    "fontSize": 14,
    "marginTop": 25,
    "backgroundColor": "transparent",
    "fontFamily": Constants.fontFamily
  },
  "iconReadMore": {
    "marginTop": 18,
    "marginLeft": 15
  },
  "timeTwo": {
    "alignSelf": Constants.RTL ? 'flex-end' : 'flex-start',
    "color": "#999",
    "fontSize": 10,
    "marginTop": 4,
    "fontFamily": Platform.OS != 'android' ? Constants.fontFamily : Constants.fontHeaderAndroid
  },
  "panelTwoView": {
    "position": "relative",
    "width": width / 2 - 10,
    "justifyContent": "space-around",
    "marginBottom": 30
  },
  "imagePanelTwoView": {
    "position": "relative",
    "width": (width / 2 - 30),
    "height": (width / 2),
    "borderRadius": 7
  },
  "nameTwoView": {
    "fontSize": 14,
    "fontWeight": "600",
    "width": (width / 2 - 30),
    "marginTop": 8,
    "fontFamily": Platform.OS != 'android' ? Constants.fontHeader : Constants.fontHeaderAndroid
  },
  "nameSubTwoView": {
    "marginTop": 4,
    "width": width / 2 - 30
  },
  "panelList": {
    "backgroundColor": "#FFF",
    "borderColor": "#eee",
    "borderBottomWidth": 1,
    "flexDirection": Constants.RTL ? 'row-reverse' : 'row'
  },
  "imageList": {
    "marginTop": 12,
    "marginLeft": 8,
    "marginRight": 8,
    "marginBottom": 8,
    "alignItems": "center",
    "justifyContent": "center",
    "position": "relative",
    "width": vw * 30,
    "height": vw * 30 - 20,
    "resizeMode": "cover",
    "borderRadius": 2
  },
  "titleList": {
    "width": vw * 65
  },
  "nameList": {
    "fontSize": 14,
    "marginLeft": 4,
    "marginTop": 12,
    "marginRight": 8,
    "color": "#333",
    "fontWeight": "400"
  },
  "descriptionList": {
    "fontSize": 12,
    "marginTop": 4,
    "marginRight": 8,
    "color": "#333",
    "fontWeight": "300"
  },
  "timeList": {
    "paddingRight": Constants.RTL ? 8 : 0,
    "color": "#999",
    "fontSize": 11,
    "marginBottom": 10,
    "marginTop": 6,
    "backgroundColor": "transparent"
  },
  "category": {
    "fontSize": 11,
    "marginTop": 6,
    "color": "#999"
  },
  "panel": {
    "position": "relative",
    "paddingLeft": 8,
    "paddingTop": 8
  },
  "imagePanel": {
    "width": (width / 3),
    "height": (width / 3) + 20,
    "borderRadius": 2,
    "marginRight": 0,
    "alignItems": "center",
    "justifyContent": "center",
    "position": "relative"
  },
  "name": {
    "fontSize": 13,
    "width": (width / 3) - 10,
    "marginLeft": 4,
    "marginTop": 6,
    "textAlign": Constants.RTL ? 'right' : 'left'
  },
  "cardNews": {
    "marginTop": 4,
    "marginRight": 8,
    "marginBottom": 8,
    "marginLeft": 8,
    "shadowColor": "#000",
    "shadowOpacity": 0.2,
    "shadowRadius": 2,
    "shadowOffset": {width: 0, height: 3},
    "height": width - 80,
    "borderRadius": 2,
    "elevation": 5
  },
  "cardView": {
    "borderRadius": 2,
    "overflow": "hidden",
    "backgroundColor": "#ccc"
  },
  "largeImage": {
    "width": width - 16,
    "height": width - 120,
    "resizeMode": "cover"
  },
  "linearGradient": {
    "height": 120,
    "marginTop": -120,
    "justifyContent": "flex-end"
  },
  "newsTitle": {
    "fontSize": 18,
    "marginTop": 20,
    "marginRight": 20,
    "marginBottom": 20,
    "marginLeft": 20,
    "color": "white",
    "fontWeight": "400",
    "textAlign": "left",
    "backgroundColor": "transparent"
  },
  "author": {
    "color": "#999",
    "fontSize": 13,
    "fontWeight": "600",
    "marginTop": 12,
    "marginRight": 12,
    "marginBottom": 12,
    "marginLeft": 20
  },
  "smCardNews": {
    "marginTop": 4,
    "marginRight": 0,
    "marginBottom": 4,
    "marginLeft": 8,
    "width": width / 2 + 15,
    "shadowColor": "#000",
    "borderRadius": 3,
    "elevation": 5,
    "flexDirection": "column",
    "position": "relative",
    "height": (vh * 30) + 132
  },
  "smImage": {
    "width": width / 2,
    "height": width / 2 - 100,
    "resizeMode": "cover"
  },
  "smTitle": {
    "marginTop": 12,
    "marginRight": 12,
    "marginBottom": 12,
    "marginLeft": 12,
    "fontSize": 15
  },
  "smAuthor": {
    "color": "#999",
    "fontSize": 12,
    "fontWeight": "300",
    "marginTop": 0,
    "marginLeft": 12,
    "marginBottom": 8,
    "position": "absolute",
    "bottom": 12
  },
  "smDescription": {
    "backgroundColor": "white",
    "height": 100
  },
  "smShareIcons": {
    "flexDirection": "row",
    "backgroundColor": "#F7F7F7",
    "paddingLeft": 4,
    "bottom": 0,
    "paddingTop": 5
  },
  "simpleDesc": {
    "fontSize": 12,
    "marginLeft": 4,
    "marginTop": 10,
    "marginRight": 8,
    "color": "#333",
    "fontWeight": "300"
  },
  "simpleTitle": {
    "fontSize": 16,
    "marginLeft": 0,
    "marginTop": 12,
    "marginRight": 8,
    "color": "#333",
    "fontWeight": "400",
    "textAlign": Constants.RTL ? 'right' : 'left'
  },
  "simpleContent": {
    "width": vw * 63,
    "marginLeft": vw * 2
  },
  "simpleImage": {
    "marginLeft": vw * 2,
    "marginRight": vw * 2,
    "marginTop": 12,
    "marginBottom": 8,
    "alignItems": "center",
    "justifyContent": "center",
    "position": "relative",
    "width": vw * 31,
    "height": vw * 25,
    "resizeMode": "cover",
    "borderRadius": 2
  },
  "fixHeart": {
    "position": "absolute",
    "top": 10,
    "right": 5,
    "zIndex": 9999
  },
  "nameSub": {
    "color": "rgb(146, 146, 175)",
    "fontSize": 12,
    "alignSelf": "flex-start",
    "width": (width / 2),
    "fontFamily": Constants.fontFamily
  },
  "priceSub": {
    "fontFamily": Constants.fontFamilyLight
  },
  "wrapRating": {
    "flexDirection": "row",
    "flex": 1,
    "marginTop": 10,
    "alignSelf": "flex-start"
  },
  "ratingView": {
    "flexDirection": "row",
    "alignSelf": "flex-start",
    "marginRight": 10
  },
  "iconStar": {
    "marginRight": 2
  },
  "countReview": {
    "alignSelf": "flex-start"
  },
  "countText": {
    "fontSize": 12,
    "fontFamily": Constants.fontFamily
  },

  "bannerGradient": {
    "width": width,
    "alignItems": Constants.RTL ? 'flex-end' : 'flex-start',
    "height": Constants.Window.headerHeight / 2,
    "justifyContent": "flex-end",
    position: 'absolute',
    bottom: 0
  },

  "bannerTitle": {
    "marginTop": 12,
    "marginRight": 12,
    "marginBottom": 4,
    "marginLeft": 12,
    "color": "#fff",
    backgroundColor: 'transparent',
    "fontSize": 20,
    "fontFamily": Constants.fontFamilyBold
  },
  priceView: {
    flexDirection: 'row',
    marginLeft: 10,
    backgroundColor: 'transparent'
  },
  price: {
    marginTop: 5,
    marginBottom: 15,
    fontSize: 18,
    "fontFamily": Constants.fontFamily,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: "center"
  },
  sale_price: {
    textDecorationLine: 'line-through',
    fontSize: 14,
    marginTop: 10,
  },
});