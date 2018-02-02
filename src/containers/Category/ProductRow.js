/**
 * Created on 06/03/2018.
 */
import React from 'react';
import PropTypes from 'prop-types'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {Styles, Color, Constants} from "@common";
import {currencyFormatter, getProductImage} from '@app/Omni';
import {Rating} from '@components';
import {Ionicons, FontAwesome} from '@expo/vector-icons';
import {DisplayMode} from '@redux/CategoryRedux';


class ProductRow extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    const props = this.props;
    return props.displayMode !== nextProps.displayMode ||
      props.product.id !== nextProps.product.id || props.isInWishList !== nextProps.isInWishList;
  }

  render() {
    const {product, onPress, displayMode, isInWishList} = this.props;

    const isListMode = displayMode === DisplayMode.ListMode || displayMode === DisplayMode.CardMode;
    const isCardMode = displayMode === DisplayMode.CardMode;

    const textStyle = isListMode ? styles.text_list : styles.text_grid;
    const imageStyle = isListMode ? styles.image_list : styles.image_grid;
    const image_width = isListMode ? (Styles.width * 0.9) - 2 : (Styles.width * 0.45) - 2;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={[styles.container, isListMode ? styles.container_list : styles.container_grid]}>
        <Image
          source={{uri: getProductImage(product.images[0].src, image_width)}}
          style={[styles.image, imageStyle]}
          resizeMode="cover"
        />
        <View style={{paddingHorizontal: 10}}>
          <Text
            ellipsizeMode={'tail'}
            numberOfLines={1}
            style={[textStyle, isCardMode && styles.cardText]}>
            {product.name}
          </Text>

          <View style={{
            flexDirection: isCardMode ? "column" : "row",
            justifyContent: displayMode === DisplayMode.ListMode ? "space-between" : "center",
            alignItems: isCardMode ? "center" : "flex-start",
            marginTop: 4
          }}>
            <View style={[styles.price_wrapper, !isListMode && {marginTop: 0}]}>
              <Text style={[textStyle, styles.price,
                isCardMode && styles.cardPrice,
                !isListMode && {color: Color.blackTextSecondary}]}>
                {currencyFormatter(product.price) + ' '}
              </Text>

              <Text style={[textStyle, styles.sale_price, isCardMode && styles.cardPriceSale]}>
                {product.on_sale ? currencyFormatter(product.regular_price) : ''}
              </Text>

              {product.on_sale &&
              <View style={styles.saleWrap}>
                <Text style={[textStyle, styles.sale_off]}>
                  {'-' + ((1 - Number(product.price) / Number(product.regular_price)) * 100).toFixed(0) + '%' }
                </Text>
              </View>}
            </View>

            {isListMode && (
              <View style={styles.price_wrapper}>
                <Rating
                  rating={Number(product.average_rating)}
                  size={(isListMode ? Styles.FontSize.medium : Styles.FontSize.small) + 5} />
                <Text
                  style={[textStyle, styles.textRating, {color: Color.blackTextDisable}]}>
                  {'(' + product.rating_count + ')'}
                </Text>
              </View>
            )}
          </View>
        </View>
        {/**** add wish list ****/}
        <TouchableOpacity style={styles.btnWishList} onPress={() => {
          !isInWishList ? this.props.addToWishList(product) : this.props.removeWishListItem(product)
        }}>
          {isInWishList && <FontAwesome name="heart" size={20} color="red" />}
          {!isInWishList && <FontAwesome name="heart-o" size={20} color="#b5b8c1" />}
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingBottom: 10,
    marginHorizontal: Styles.width / 20, marginTop: 10,
  },
  container_list: {
    width: Styles.width * 0.9,
    marginLeft: Styles.width * 0.05,
    marginRight: Styles.width * 0.05,
    marginTop: Styles.width * 0.05
  },
  container_grid: {
    width: Styles.width * 0.9 / 2,
    marginLeft: Styles.width * 0.1 / 3,
    marginRight: 0,
    marginTop: Styles.width * 0.1 / 3,
  },
  image: {
    marginBottom: 8,
  },
  image_list: {
    width: (Styles.width * 0.9) - 2,
    height: Styles.width * 0.9 * Styles.thumbnailRatio,
  },
  image_grid: {
    width: (Styles.width * 0.45) - 2,
    height: (Styles.width * 0.45) * Styles.thumbnailRatio,
  },
  text_list: {
    color: Color.black,
    fontSize: Styles.FontSize.medium,
    fontFamily: Constants.fontFamily,
  },
  text_grid: {
    color: Color.black,
    fontSize: Styles.FontSize.small,
    fontFamily: Constants.fontFamily,
  },
  textRating: {
    fontSize: Styles.FontSize.small,
  },
  price_wrapper: {
    ...Styles.Common.Row,
  },
  cardWraper: {
    flexDirection: 'column'
  },
  sale_price: {
    textDecorationLine: 'line-through',
    color: Color.blackTextDisable,
    marginLeft: 0,
    marginRight: 0,
    fontSize: Styles.FontSize.small,
  },
  cardPriceSale: {
    fontSize: 15,
    marginTop: 2,
    fontFamily: Constants.fontFamily
  },
  price: {
    color: Color.black,
    fontSize: Styles.FontSize.medium,
  },
  saleWrap: {
    borderRadius: 5,
    backgroundColor: Color.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
    marginLeft: 5,
  },
  sale_off: {
    color: Color.lightTextPrimary,
    fontSize: Styles.FontSize.small,

  },
  cardText: {
    fontSize: 20,
    textAlign: "center"
  },
  cardPrice: {
    fontSize: 18,
    marginBottom: 8,
    fontFamily: Constants.fontFamily,
  },
  btnWishList: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30
  }
});

ProductRow.propTypes = {
  product: PropTypes.object.isRequired,
  onPress: PropTypes.func,
  displayMode: PropTypes.string,
};

export default ProductRow;
