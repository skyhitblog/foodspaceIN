import React, {Platform, StyleSheet, Dimensions, PixelRatio} from "react-native";
import {Color, Constants, Styles} from '@common';

const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "wrap": {
        "flex": 1,
        "backgroundColor": "'rgba(255, 255, 255, 1)'"
    },
    "head": {
        "width": width / 2,
        "paddingLeft": 15,
        "marginLeft": 10,
        "paddingRight": 10,
        "marginTop": 10,
        "borderBottomWidth": 2,
        "borderStyle": "solid",
        "borderColor": Color.headerTintColor,
        "backgroundColor": "'rgba(255,255,255,1)'"
    },
    "headTitle": {
        "fontSize": 16,
        "fontWeight": "600",
        "color": "rgba(51, 51, 51, 1)",
        "lineHeight": 40,
        marginBottom: 10,
        "fontFamily": Constants.fontHeader
    },
    "flatlist": {
        "flexWrap": "wrap",
        "flexDirection": "row",
        "backgroundColor": "#fff",
        "marginTop": 10,
        "paddingTop": 8,
        "paddingBottom": 20
    }
});