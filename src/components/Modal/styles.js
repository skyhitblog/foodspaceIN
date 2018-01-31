import React, {StyleSheet, Platform, Dimensions, PixelRatio} from "react-native";
import {Color, Constants, Styles} from '@common';

const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "modalBoxWrap": {
        "position": "absolute",
        "borderRadius": 6,
        "top": height * 35 / 100,
        "width": width * 96 / 100,
        "height": height * 70/ 100,
        "flex": 1,
        "backgroundColor": "transparent",
        "zIndex": 10
    },
    "modalReadlater": {
        "position": "absolute",
        "borderRadius": 6,
        "width": width - 20,
        "top": height *  2 / 100,
        "flex": 1,
        "backgroundColor": "transparent",
        "zIndex": 9999
    },
    "wrap": {
        "flex": 1,
        "zIndex": 9999,
        "position": "relative",
        "alignItems": "center",
        "justifyContent": "center",
        "backgroundColor": "rgba(255,255,255, 1)",
        "borderRadius": 6,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "iconZoom": {
        "position": "absolute",
        "right": 7,
        "top": 10,
        "backgroundColor": "transparent",
        "paddingTop": 4,
        "paddingRight": 4,
        "paddingBottom": 4,
        "paddingLeft": 4,
        "marginRight": 10,
        "zIndex": 9999
    },
    "flatlistTag": {
        "flex": 1,
        "paddingTop": 50,
        "paddingRight": 50,
        "paddingBottom": 50,
        "paddingLeft": 50,
        "flexWrap": "wrap"
    },
    "boxTag": {
        "alignItems": "center",
        "justifyContent": "center",
        "marginRight": 10,
        "marginBottom": 20
    },
    "textTag": {
        "color": "rgba(0,0,0, 0.7)",
        "fontSize": 24,
        "fontWeight": "200"
    },
    "newsIcons": {
        "marginLeft": 2,
        "paddingTop": 8,
        "paddingRight": 8,
        "paddingBottom": 8,
        "paddingLeft": 3
    },
    "imageIcon": {
        "marginLeft": 2,
        "marginRight": 0,
        "marginTop": 0,
        "paddingTop": 2,
        "paddingRight": 2,
        "paddingBottom": 2,
        "paddingLeft": 2,
        "marginBottom": 10,
        "shadowColor": "#000",
        "width": 30,
        "resizeMode": "contain",
        "zIndex": 10,
        "height": 30,
        "alignItems": "center",
        "justifyContent": "center"
    },
    "imageIconActive": {
        "color": '#fff'
    },
    "textActive": {
        "color": Color.headerTintColor
    },
    "icon": {
        "marginRight": 4,
        "marginTop": 8,
        "width": 30,
        "height": 30
    },
    "rowView": {
        "width": width / 2 - 40 ,
        "marginTop": 16,
        "alignItems": "center",
        "justifyContent": "center"
    },
    "row": {
        "width": 100,
        "height": 80,
        "alignItems": "center",
        "justifyContent": "center"
    },
    "rowActive": {
        "backgroundColor": "rgba(42, 181, 179, 0.8)",
        "borderRadius": 9
    },
    "text": {
        "fontSize": 12,
        "fontWeight": "200",
        "lineHeight": 12
    },
    "layoutBox": {
        "flex": 1,
        "flexDirection": "row",
        "flexWrap": "wrap",
        "justifyContent": "center",
        "alignItems": "center",
        "paddingTop": 20,
        "paddingRight": 20,
        "paddingBottom": 20,
        "paddingLeft": 20,
        "marginTop": 10
    },
    "scrollModal": {
        "width": width * 90 / 100
    }
});