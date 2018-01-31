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
        "backgroundColor": "#fff",
        "paddingTop": 8,
        "paddingBottom": 20
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
    }
});