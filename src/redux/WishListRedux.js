
import WooWorker from '../services/WooWorker';
import {Languages} from "../Omni.js"

const types = {
  ADD_WISHLIST_ITEM : 'ADD_WISHLIST_ITEM',
  REMOVE_WISHLIST_ITEM : 'REMOVE_WISHLIST_ITEM',
  EMPTY_WISHLIST : 'EMPTY_WISHLIST',
};

export const actions = {
  addWishListItem:(dispatch,product)=>{
      dispatch({
        type: types.ADD_WISHLIST_ITEM,
        product: product
      })
  },

  removeWishListItem:(dispatch,product) =>{
      dispatch({
        type: types.REMOVE_WISHLIST_ITEM,
        product: product
      })
  },
  emptyWishList:(dispatch) =>{
      dispatch({
          type: types.EMPTY_WISHLIST
      })
  }
};

const initialState = {
  wishListItems: [],
  total: 0,
  totalPrice: 0
};

export const reducer = (state = initialState, action) => {
    const {type} = action;

    switch (type) {
      case types.ADD_WISHLIST_ITEM: {
          const isExisted = state.wishListItems.some((wishListItem) => compareWishListItem(wishListItem, action))
          return isExisted ? state : Object.assign({}, state,
              {
                  wishListItems: [...state.wishListItems, wishListItem(undefined, action)],
                  total: state.total + 1,
              },
          )
      }
      case types.REMOVE_WISHLIST_ITEM: {
          const index1 = state.wishListItems.findIndex((wishListItem) => compareWishListItem(wishListItem, action)) // check if existed
          return index1 == -1 ? state : //This should not happen, but catch anyway
              Object.assign({}, state, {
                  wishListItems: state.wishListItems.filter((wishListItem) => !compareWishListItem(wishListItem, action)),
                  total: state.total - 1,
              })
      }
      case types.EMPTY_WISHLIST:
          return Object.assign({}, state, {
              wishListItems: [],
              total: 0,
          })
        default: {
            return state;
        }
    }
};

const compareWishListItem = (wishListItem, action) => {
      return wishListItem.product.id === action.product.id
}


const wishListItem = (state = {product: undefined, variation: undefined}, action) => {
    switch (action.type) {
        case types.ADD_WISHLIST_ITEM:
            return Object.assign({}, state, {product: action.product})
        default:
            return state
    }
}
