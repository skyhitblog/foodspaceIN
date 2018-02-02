import {Constants} from '@common';

import _Icon from '@expo/vector-icons/MaterialCommunityIcons';
export const Icon = _Icon;

import _IconIO from '@expo/vector-icons/Ionicons';
export const IconIO = _IconIO;


import _EventEmitter from 'EventEmitter';
export const EventEmitter = new _EventEmitter();

import _Timer from 'react-timer-mixin';
export const Timer = _Timer;

import _Validate from './ultils/Validate';
export const Validate = _Validate;

import _BlockTimer from './ultils/BlockTimer';
export const BlockTimer = _BlockTimer;

import _FacebookAPI from './services/FacebookAPI';
export const FacebookAPI = _FacebookAPI;

import _WooWorker from './services/WooWorker';
export const WooWorker = _WooWorker;

import reactotron from 'reactotron-react-native'
export const Reactotron = reactotron;

//TODO: replace those function after app go live
export const log = (values) => __DEV__ && reactotron.log(values);
export const warn = (values) => __DEV__ && reactotron.warn(values);
export const error = (values) => __DEV__ && reactotron.error(values);

/**
 * An async fetch with error catch
 * @param url
 * @param data
 * @returns {Promise.<*>}
 */
export const request = async (url, data = {}) => {
    try {
        const response = await fetch(url, data);
        warn(response)
        return await response.json();
    } catch (err) {
        error(err);
        return {error: err};
    }
};

//Drawer
export const openDrawer = () => EventEmitter.emit(Constants.EmitCode.SideMenuOpen);
export const closeDrawer = () => EventEmitter.emit(Constants.EmitCode.SideMenuClose);

/**
 * Display the message toast-like (work both with Android and iOS)
 * @param msg Message to display
 * @param duration Display duration
 */
export const toast = (msg, duration = 4000) => EventEmitter.emit(Constants.EmitCode.Toast, msg, duration);

import _ from 'lodash';
import {Config} from '@common'
import _currencyFormatter from 'currency-formatter';
export const currencyFormatter = _.bind(_currencyFormatter.format, undefined, _, {
    symbol: '₹',
    decimal: '.',
    thousand: ',',
    precision: 2,
    format: '%s%v' // %s is the symbol and %v is the value
});

import {Images} from "@common"
import {PixelRatio} from 'react-native';
export const getProductImage = (uri, containerWidth) => {
    //Enhance number if you want to fetch a better quality image (may affect performance
    const DPI_NUMBER = 0.5; // change this to 1 for high quality image

    if (!Config.ProductSize.enable) {
        return uri;
    }

    if (typeof uri != "string")  {
        return Images.PlaceHolderURL
    }

    //parse uri into parts
    const index = uri.lastIndexOf('.');
    let editedURI = uri.slice(0, index);
    let defaultType = uri.slice(index,);

    const SMALL = Config.ProductSize.ProductThumbnails;
    const MEDIUM = Config.ProductSize.CatalogImages;
    const LARGE = Config.ProductSize.SingleProductImage;

    const pixelWidth = PixelRatio.getPixelSizeForLayoutSize(containerWidth);

    switch (true) {
        case pixelWidth * DPI_NUMBER < SMALL.width:
            editedURI = editedURI + '-' + SMALL.width + 'x' + SMALL.height + defaultType;
            break;
        case pixelWidth * DPI_NUMBER < MEDIUM.width:
            editedURI = editedURI + '-' + MEDIUM.width + 'x' + MEDIUM.height + defaultType;
            break;
        case pixelWidth * DPI_NUMBER < LARGE.width:
            editedURI = editedURI + '-' + LARGE.width + 'x' + LARGE.height + defaultType;
            break;
        default:
            editedURI = editedURI + defaultType;
    }
    // console.log(pixelWidth);

    return editedURI;
};
