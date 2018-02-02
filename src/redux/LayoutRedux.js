/**
 * Created on 06/03/2018.
 */
import WooWorker from '../services/WooWorker';
import {flatten} from 'lodash'
import {HorizonLayouts} from "@common";
import {REHYDRATE} from 'redux-persist/constants'
import {warn} from "@app/Omni"

const types = {
  LAYOUT_FETCH_SUCCESS: 'LAYOUT_FETCH_SUCCESS',
  LAYOUT_FETCH_MORE: 'LAYOUT_FETCH_MORE',
  LAYOUT_FETCHING: 'LAYOUT_FETCHING',
};

export const actions = {
  fetchProductsLayout: async (dispatch, categoryId = '', tagId = '', page, index) => {
    dispatch({type: types.LAYOUT_FETCHING, extra: {index}});

    const json = await WooWorker.productsByCategoryTag(categoryId, tagId, 10, page);

    if (json === undefined) {
      dispatch(actions.fetchProductsFailure('Can\'t get data from server'));
    } else if (json.code) {
      dispatch(actions.fetchProductsFailure(json.message));
    } else {
      if (page > 1) {
        dispatch({type: types.LAYOUT_FETCH_MORE, payload: json, extra: {index}, finish: json.length == 0});
      }
      else {
        dispatch({type: types.LAYOUT_FETCH_SUCCESS, payload: json, extra: {index}, finish: json.length == 0});
      }
    }
  },
  fetchProductsFailure: (error) => ({type: types.FETCH_PRODUCTS_FAILURE, error}),
};

const initialState = HorizonLayouts;

export const reducer = (state = initialState, action) => {
  const {extra, type, payload, finish} = action;

  switch (type) {
    case types.LAYOUT_FETCH_SUCCESS:
      return state.map((item, index) => {
        if (typeof extra != 'undefined' && index !== extra.index) {
          return item;
        }
        return {
          ...item,
          list: flatten(payload),
          isFetching: false
        };
      });

    case types.LAYOUT_FETCH_MORE:
      return state.map((item, index) => {
        if (typeof extra != 'undefined' && index !== extra.index) {
          return item;
        }

        return {
          ...item,
          list: item.list.concat(payload),
          finish: finish,
          isFetching: false
        };
      });

    case types.LAYOUT_FETCHING:
      return state.map((item, index) => {
        if (typeof extra != 'undefined' && index !== extra.index) {
          return item;
        }
        return {
          ...item,
          isFetching: true
        };
      });

    default:
      return state;
  }
};

