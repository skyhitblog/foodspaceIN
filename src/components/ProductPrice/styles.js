import React, {Platform, StyleSheet, Dimensions, PixelRatio} from "react-native";
import {Color, Constants, Styles} from '@common';

const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "text_list": {
        "color": Color.black,
        "fontSize": Styles.FontSize.medium
    },
    "text_grid": {
        "color": Color.black,
        "fontSize": Styles.FontSize.small
    },
    "": {
        "alignItems": "center",
        "color": Color.black,
        "fontSize": Styles.FontSize.tiny
    },
    "price_wrapper": {
        "alignItems": "center"
    },
    "sale_price": {
        "textDecorationLine": "line-through",
        "color": Color.blackTextDisable,
        "marginLeft": 0,
        "marginRight": 0,
        "fontSize": Styles.FontSize.tiny
    },
    "price": {
        "color": Color.black,
        "fontSize": Styles.FontSize.tiny
    },
    "saleWrap": {
        "borderRadius": 5,
        "backgroundColor": Color.primary,
        "justifyContent": "center",
        "alignItems": "center",
        "paddingHorizontal": 3,
        "marginLeft": 5
    },
    "sale_off": {
        "color": Color.lightTextPrimary,
        "fontSize": Styles.FontSize.small
    }
});