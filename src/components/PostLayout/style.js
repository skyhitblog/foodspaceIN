import React, {StyleSheet, Platform, Dimensions, PixelRatio} from "react-native";
import {Color, Constants} from '@common';

const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "panelOne": {
        "marginBottom": 12
    },
    "imagePanelOne": {
        "marginTop": 12,
        "marginLeft": 12,
        "alignItems": "center",
        "justifyContent": "center",
        "resizeMode": "cover",
        "position": "relative",
        "borderRadius": 8,
        "width": (width) - 24,
        "height": (width/2 + 50)
    },
    "nameOne": {
        "fontSize": 16,
        "width": (width)-24,
        "marginLeft": 12,
        "marginRight": 12,
        "marginTop": 12,
        "textAlign": "center",
        "fontFamily": Platform.OS != 'android' ? Constants.fontHeader :  Constants.fontHeaderAndroid
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
    "panelTwo": {
        "position": "relative",
        "width": (width/2),
        "alignItems": "center",
        "justifyContent": "space-around",
        "marginBottom": 12
    },
    "imagePanelTwo": {
        "position": "relative",
        "width": (width/2 - 30),
        "height": (width/3),
        "borderRadius": 3
    },
    "nameTwo": {
        "fontSize": 13,
        "fontWeight": "400",
        "width": (width/2 - 30),
        "marginLeft": 8,
        "marginRight": 8,
        "marginTop": 8,
        "fontFamily": Platform.OS != 'android' ? Constants.fontHeader :  Constants.fontHeaderAndroid,
        "textAlign": "center",
        "color": Color.Text
    },
    "timeTwo": {
        "alignSelf": Constants.RTL ? 'flex-end' : 'flex-start',
        "marginLeft": 16,
        "marginRight": Constants.RTL ?  16 :  8 ,
        "color": "#999",
        "fontSize": 10,
        "marginTop": 4,
        "fontFamily": Platform.OS != 'android' ? Constants.fontFamily : Constants.fontHeaderAndroid
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
        "marginLeft": 4,
        "marginTop": 4,
        "marginRight": 8,
        "color": "#333",
        "fontWeight": "300"
    },
    "description": {
        "backgroundColor": "#eee",
        "flexDirection": "row"
    },
    "timeList": {
        "marginRight": Constants.RTL ? 4 : width/2 - vw,
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
        "width": (width/3),
        "height": (width/3) + 20,
        "borderRadius": 2,
        "marginRight": 0,
        "alignItems": "center",
        "justifyContent": "center",
        "position": "relative"
    },
    "name": {
        "fontSize": 13,
        "width": (width/3)-10,
        "marginLeft": 4,
        "marginTop": 6,
        "textAlign": Constants.RTL ? 'right' : 'left'
    },
    "time": {
        "marginLeft": 4,
        "color": "#999",
        "fontSize": 10,
        "marginBottom": 8,
        "marginTop": 4,
        "marginRight": 4,
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
        "width": width/2 - 12,
        "shadowColor": "#000",
        "shadowOpacity": 0.25,
        "shadowRadius": 4,
        "shadowOffset": {width: 0, height: 2},
        "borderRadius": 3,
        "elevation": 5,
        "flexDirection": "column",
        "position": "relative",
        "height": (vh * 30) + 132
    },
    "smImage": {
        "width": width/2,
        "height": vh * 30,
        "resizeMode": "cover"
    },
    "smTitle": {
        "marginTop": 12,
        "marginRight": 12,
        "marginBottom": 12,
        "marginLeft": 12,
        "fontSize": 13
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
        "fontSize": 13,
        "marginLeft": 4,
        "marginTop": 12,
        "marginRight": 8,
        "color": "#333",
        "fontWeight": "400",
        "fontFamily": Constants.fontHeader,
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
    "panelThree": {
        "position": "relative",
        "width": (width/3),
        "alignItems": "center",
        "justifyContent": "space-around",
        "marginBottom": 12
    },
    "imagePanelThree": {
        "position": "relative",
        "width": (width/3 - 10),
        "height": (width/3 + 20),
        "borderRadius": 3
    },
    "nameThree": {
        "fontSize": 13,
        "width": (width/3 - 10),
        "marginLeft": 8,
        "marginRight": 8,
        "marginTop": 8,
        "fontFamily": Platform.OS != 'android' ? Constants.fontFamily : Constants.fontHeaderAndroid,
        "textAlign": "center",
        "color": Color.Text
    },
    "timeThree": {
        "alignItems": "center",
        "marginLeft": 4,
        "marginRight": 8,
        "color": "#999",
        "fontSize": 10,
        "marginTop": 4,
        "fontFamily": Platform.OS != 'android' ? Constants.fontFamily : Constants.fontHeaderAndroid,
        "textAlign": Constants.RTL ? 'right' : 'left'
    },
    "fixHeart": {
        "position": "absolute",
        "top": 10,
        "right": 5,
        "zIndex": 9999
    }
});