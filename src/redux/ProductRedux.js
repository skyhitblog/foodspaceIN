/**
 * Created on 06/03/2018.
 */
import WooWorker from '../services/WooWorker';
import {warn} from "../Omni.js"
import {Constants,Languages} from "@common"
import {REHYDRATE} from 'redux-persist/constants'
import {pickBy, identity} from 'lodash'
import moment from 'moment'

const types = {
  FETCH_PRODUCTS_PENDING: 'FETCH_PRODUCTS_PENDING',
  FETCH_PRODUCTS_SUCCESS: 'FETCH_PRODUCTS_SUCCESS',
  FETCH_ALL_PRODUCTS_SUCCESS: 'FETCH_ALL_PRODUCTS_SUCCESS',
  FETCH_ALL_PRODUCTS_MORE: 'FETCH_ALL_PRODUCTS_MORE',
  FETCH_PRODUCTS_FAILURE: 'FETCH_PRODUCTS_FAILURE',
  CLEAR_PRODUCTS: 'CLEAR_PRODUCTS',
  INIT_PRODUCTS: 'INIT_PRODUCTS',
  FETCH_REVIEWS_PENDING: 'FETCH_REVIEWS_PENDING',
  FETCH_REVIEWS_SUCCESS: 'FETCH_REVIEWS_SUCCESS',
  FETCH_REVIEWS_FAILURE: 'FETCH_REVIEWS_FAILURE',
  FETCH_PRODUCTS_BY_TAGS_PENDING: 'FETCH_PRODUCTS_BY_TAGS_PENDING',
  FETCH_PRODUCTS_BY_TAGS_SUCCESS: 'FETCH_PRODUCTS_BY_TAGS_SUCCESS',
  FETCH_PRODUCTS_BY_TAGS_FAILURE: 'FETCH_PRODUCTS_BY_TAGS_FAILURE',
  FETCH_PRODUCTS_BY_NAME_PENDING: 'FETCH_PRODUCTS_BY_NAME_PENDING',
  FETCH_PRODUCTS_BY_NAME_SUCCESS: 'FETCH_PRODUCTS_BY_NAME_SUCCESS',
  FETCH_PRODUCTS_BY_NAME_FAILURE: 'FETCH_PRODUCTS_BY_NAME_FAILURE',
  FETCH_PRODUCTS_STICKY_PENDING: 'FETCH_PRODUCTS_STICKY_PENDING',
  FETCH_PRODUCTS_STICKY_SUCCESS: 'FETCH_PRODUCTS_STICKY_SUCCESS',
  FETCH_PRODUCTS_STICKY_FAILURE: 'FETCH_PRODUCTS_STICKY_FAILURE',
  FETCH_PRODUCTS_MORE: 'FETCH_PRODUCTS_MORE',
  FETCH_PRODUCTS_VARIANT_PENDING: 'FETCH_PRODUCTS_VARIANT_PENDING',
  FETCH_PRODUCTS_VARIANT_SUCCESS: 'FETCH_PRODUCTS_VARIANT_SUCCESS',
  FETCH_PRODUCTS_VARIANT_FAIL: 'FETCH_PRODUCTS_VARIANT_FAIL',
  FETCH_PRODUCTS_RELATED_PENDING: 'FETCH_PRODUCTS_RELATED_PENDING',
  FETCH_PRODUCTS_RELATED_SUCCESS: 'FETCH_PRODUCTS_RELATED_SUCCESS',
  FETCH_PRODUCTS_RELATED_FAIL: 'FETCH_PRODUCTS_RELATED_FAIL',
  GET_COUPON_CODE_PENDING: 'GET_COUPON_CODE_PENDING',
  GET_COUPON_CODE_SUCCESS: 'GET_COUPON_CODE_SUCCESS',
  GET_COUPON_CODE_FAIL: 'GET_COUPON_CODE_FAIL',
  CLEAN_OLD_COUPON: 'CLEAN_OLD_COUPON',
  SWITCH_LAYOUT_HOME: 'SWITCH_LAYOUT_HOME',
};

export const actions = {
  fetchProductsByCategoryId: async (dispatch, categoryId, per_page, page) => {
    const json = await WooWorker.productsByCategoryId(categoryId, per_page, page);
    if (json === undefined) {
      dispatch(actions.fetchProductsFailure('Can\'t get data from server'));
    } else if (json.code) {
      dispatch(actions.fetchProductsFailure(json.message));
    } else {
      dispatch(actions.fetchProductsSuccess(json));
    }
  },
  fetchProductsSuccess: (items) => ({type: types.FETCH_PRODUCTS_SUCCESS, items, finish: true}),
  fetchProductsFailure: (error) => ({type: types.FETCH_PRODUCTS_FAILURE, error}),
  clearProducts: () => ({type: types.CLEAR_PRODUCTS}),
  initProduct: () => ({type: types.INIT_PRODUCTS}),
  fetchReviewsByProductId: async (dispatch, productId) => {
    dispatch({type: types.FETCH_REVIEWS_PENDING});
    const json = await WooWorker.reviewsByProductId(productId);
    if (json === undefined) {
      dispatch({type: types.FETCH_REVIEWS_FAILURE, message: Languages.ErrorMessageRequest});
    } else if (json.code) {
      dispatch({type: types.FETCH_REVIEWS_FAILURE, message: json.message});
    } else {
      dispatch({type: types.FETCH_REVIEWS_SUCCESS, reviews: json});
    }
  },
  fetchProductsByTag: async (dispatch, tag) => {
    dispatch({type: types.FETCH_PRODUCTS_BY_TAGS_PENDING});
    const json = await WooWorker.productsByTagId(tag, 10, 1);
    if (json === undefined) {
      dispatch({type: types.FETCH_PRODUCTS_BY_TAGS_FAILURE, message: Languages.ErrorMessageRequest});
    } else if (json.code) {
      dispatch({type: types.FETCH_PRODUCTS_BY_TAGS_FAILURE, message: json.message});
    } else {
      dispatch({type: types.FETCH_PRODUCTS_BY_TAGS_SUCCESS, products: json});
    }
  },

  fetchProductsByName: async (dispatch, name, per_page = 20, page = 1) => {
    dispatch({type: types.FETCH_PRODUCTS_BY_NAME_PENDING});
    const json = await WooWorker.productsByName(name, per_page, page);

    if (json === undefined) {
      dispatch({type: types.FETCH_PRODUCTS_BY_NAME_FAILURE, message: Languages.ErrorMessageRequest});
    } else if (json.code) {
      dispatch({type: types.FETCH_PRODUCTS_BY_NAME_FAILURE, message: json.message});
    } else {
      dispatch({type: types.FETCH_PRODUCTS_BY_NAME_SUCCESS, productsByName: json});
    }
  },
  fetchStickyProducts: async (dispatch, per_page = 8, page = 1) => {
    dispatch({type: types.FETCH_PRODUCTS_STICKY_PENDING});
    const json = await WooWorker.productSticky(per_page, page);
    if (json === undefined) {
      dispatch({type: types.FETCH_PRODUCTS_STICKY_FAILURE, message: Languages.ErrorMessageRequest});
    } else if (json.code) {
      dispatch({type: types.FETCH_PRODUCTS_STICKY_FAILURE, message: json.message});
    } else {
      dispatch({type: types.FETCH_PRODUCTS_STICKY_SUCCESS, productSticky: json});
    }
  },
  fetchAllProducts: async (dispatch, per_page = 20, page = 1) => {
    dispatch({type: types.FETCH_PRODUCTS_PENDING});
    const json = await WooWorker.getAllProducts(per_page, page);
    if (json === undefined) {
      dispatch({type: types.FETCH_PRODUCTS_FAILURE, message: Languages.ErrorMessageRequest});
    } else {
      if (page > 1) {
        dispatch({type: types.FETCH_ALL_PRODUCTS_MORE, items: json, page: page, finish: true});
      }
      else {
        dispatch({type: types.FETCH_ALL_PRODUCTS_SUCCESS, items: json, page: page, finish: true});
      }

    }
  },
  getProductVariations: async (dispatch, product, per_page = 100, page = 1) => {
    dispatch({type: types.FETCH_PRODUCTS_VARIANT_PENDING});
    const json = await WooWorker.productVariant(product, per_page, page);

    if (json === undefined) {
      dispatch({type: types.FETCH_PRODUCTS_VARIANT_FAIL, message: Languages.ErrorMessageRequest});
    } else if (json.code) {
      dispatch({type: types.FETCH_PRODUCTS_VARIANT_FAIL, message: json.message});
    } else {
      dispatch({type: types.FETCH_PRODUCTS_VARIANT_SUCCESS, items: json});
    }
  },
  fetchProductRelated: async (dispatch, product) => {
    dispatch({type: types.FETCH_PRODUCTS_RELATED_PENDING});
    const json = await WooWorker.getProductRelated(product);

    if (json === undefined) {
      dispatch({type: types.FETCH_PRODUCTS_RELATED_FAIL, message: Languages.ErrorMessageRequest});
    } else if (json.code) {
      dispatch({type: types.FETCH_PRODUCTS_RELATED_FAIL, message: json.message});
    } else {
      dispatch({type: types.FETCH_PRODUCTS_RELATED_SUCCESS, productRelated: json});
    }
  },
  cleanOldCoupon:async(dispatch)=>{
    dispatch({type: types.CLEAN_OLD_COUPON});
  },
  getCouponAmount: async (dispatch, code) => {
    dispatch({type: types.GET_COUPON_CODE_PENDING});
    const json = await WooWorker.getAllCouponCode();

    if (json === undefined) {
      dispatch({type: types.GET_COUPON_CODE_FAIL, message: Languages.ErrorMessageRequest});
    } else if (json.code) {
      dispatch({type: types.GET_COUPON_CODE_FAIL, message: json.message});
    } else {
      var amount = 0
      var message = '';
      let discountType = 'percent'

      json.forEach((item)=>{
        if (item.code == code) {
          if (item.date_expires) {
            var date_expires = moment(item.date_expires);
            var today = moment()
            if (date_expires.diff(today) > 0) {
              amount = item.amount
            }else{
              message = Languages.couponCodeIsExpired
            }
            return
          }else{
            amount = item.amount
            discountType = item.discount_type
            return
          }
        }
      })

      if (amount == 0) {
        if (message.length > 0) {
          dispatch({type: types.GET_COUPON_CODE_FAIL, message});
        }else{
          dispatch({type: types.GET_COUPON_CODE_FAIL, message:Languages.invalidCouponCode});
        }
      }else{
        dispatch({type: types.GET_COUPON_CODE_SUCCESS, amount,code, discountType});
      }
    }
  },
  switchLayoutHomePage: (layout) => {
    return {type: types.SWITCH_LAYOUT_HOME, layout};
  },
};

const initialState = {
  isFetching: false,
  error: null,
  list: [],
  listAll: [],
  stillFetch: true,
  page: 1,
  layoutHome: Constants.Layout.horizon,

  productFinish: false,
  productsByName: [],
  productSticky: [],
  productVariations: null,
  productRelated: [],
};

export const reducer = (state = initialState, action) => {
  const {type, error, items, page, finish} = action;
  switch (type) {
    case REHYDRATE:
      var incoming = action.payload.posts
      // remove null or undefine value
      if (incoming) {
        incoming.list = pickBy(incoming.list, identity);
      }
      return {
        ...state,
        ...incoming
      }
      return state;

    case types.FETCH_PRODUCTS_PENDING:
    case types.FETCH_PRODUCTS_BY_TAGS_PENDING:
    case types.FETCH_PRODUCTS_BY_NAME_PENDING:
    case types.FETCH_PRODUCTS_STICKY_PENDING:
    case types.FETCH_PRODUCTS_VARIANT_PENDING:
    case types.FETCH_REVIEWS_PENDING:
    case types.FETCH_PRODUCTS_RELATED_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: null,
        message:''
      };
    }

    case types.FETCH_PRODUCTS_STICKY_FAILURE:
    case types.FETCH_PRODUCTS_BY_TAGS_FAILURE:
    case types.FETCH_PRODUCTS_BY_NAME_FAILURE:
    case types.FETCH_PRODUCTS_VARIANT_FAIL:
    case types.FETCH_REVIEWS_FAILURE:
    case types.FETCH_PRODUCTS_FAILURE:
    case types.FETCH_PRODUCTS_RELATED_FAIL: {
      return {
        ...state,
        isFetching: false,
        error: error
      };
    }

    case types.FETCH_ALL_PRODUCTS_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        listAll: items,
        stillFetch: items.length !== 0,
        error: null,
        page: page,
        productFinish: finish,
      });
    }

    case types.FETCH_ALL_PRODUCTS_MORE: {
      return Object.assign({}, state, {
        isFetching: false,
        listAll: state.listAll.concat(items),
        stillFetch: items.length !== 0,
        error: null,
        page: page,
        productFinish: finish,
      });
    }

    case types.FETCH_PRODUCTS_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        list: state.list.concat(items),
        stillFetch: items.length !== 0,
        error: null,
        productFinish: finish,
      });
    }

    case types.CLEAR_PRODUCTS: {
      initialState.listAll = state.listAll;
      initialState.layoutHome = state.layoutHome;
      initialState.productSticky = state.productSticky;
      return Object.assign({}, initialState);
    }

    case types.INIT_PRODUCTS: {
      initialState.layoutHome = state.layoutHome;
      return Object.assign({}, initialState);
    }

    case types.FETCH_REVIEWS_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        reviews: action.reviews,
      });
    }

    case types.FETCH_PRODUCTS_BY_TAGS_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        products: action.products,
      });
    }

    case types.FETCH_PRODUCTS_BY_NAME_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        productsByName: action.productsByName,
      };
    }

    case types.FETCH_PRODUCTS_STICKY_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        productSticky: state.productSticky.concat(action.productSticky),
      };
    }

    case types.FETCH_PRODUCTS_VARIANT_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        productVariations: items,
        error: null,
      });
    }

    case types.FETCH_PRODUCTS_RELATED_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        productRelated: action.productRelated,
        error: null,
      });
    }
    case types.GET_COUPON_CODE_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        coupon: {
          amount: action.amount,
          type: action.discountType,
          code: action.code,
        },
        error: null,
      });
    }
    case types.CLEAN_OLD_COUPON: {
      return Object.assign({}, state, {
        coupon: {
          amount: 0,
          code: ""
        }
      });
    }
    case types.SWITCH_LAYOUT_HOME: {
      return {
        ...state,
        layoutHome: action.layout,
      };
    }
    case types.GET_COUPON_CODE_PENDING: {
      return {
        ...state,
        isFetching: true,
        type,
        error: null
      };
    }
    case types.GET_COUPON_CODE_FAIL: {
      return {
        ...state,
        isFetching: false,
        type,
        message: action.message
      };
    }
    default: {
      return state;
    }
  }
};
